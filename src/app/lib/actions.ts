'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const ProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.string().transform((val) => Number(val)),
    imageUrl: z.string().url().optional().or(z.literal('')),
    published: z.string().optional().transform((val) => val === 'on'),
});

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}

export async function createProduct(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }

    const rawData = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        imageUrl: formData.get('imageUrl'),
        published: formData.get('published'),
    }

    const validatedData = ProductSchema.parse(rawData);

    await prisma.product.create({
        data: {
            name: validatedData.name,
            description: validatedData.description || '',
            price: validatedData.price,
            imageUrl: validatedData.imageUrl || null,
            published: validatedData.published || false,
            ownerId: session.user.id,
        }
    });

    revalidatePath('/products');
    redirect('/products');
}
