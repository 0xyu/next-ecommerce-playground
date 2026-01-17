'use server'

import { signIn, signOut } from '@/auth'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const ProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    price: z.string().transform((val) => Number(val)),
    imageUrl: z.string().url("Invalid image URL").optional().or(z.literal('')),
    published: z.string().nullable().optional().transform((val) => val === 'on'),
});

const UserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal('')),
    sellerCode: z.string().optional().or(z.literal('')),
});

export type ActionState = {
    success?: boolean;
    message?: string;
} | null;

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        console.error('Auth error:', error);
        return 'Something went wrong.';
    }
}

export async function logout() {
    await signOut({ redirectTo: '/login' });
}

export async function createProduct(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: 'Unauthorized' };
    }

    const rawData = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        imageUrl: formData.get('imageUrl'),
        published: formData.get('published'),
    }

    try {
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
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: error.issues[0].message };
        }
        return { success: false, message: 'Failed to create product' };
    }

    redirect('/products');
}

export async function createUser(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== 'SUPER_ADMIN') {
        return { success: false, message: 'Unauthorized' };
    }

    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        sellerCode: formData.get('sellerCode'),
    };

    try {
        const validatedData = UserSchema.parse(rawData);

        if (!validatedData.password) {
            return { success: false, message: 'Password is required for new users' };
        }

        const hashedPassword = await bcrypt.hash(validatedData.password, 10);

        await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword,
                sellerCode: validatedData.sellerCode || null,
            }
        });

        revalidatePath('/users');
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: error.issues[0].message };
        }
        return { success: false, message: 'Failed to create user' };
    }

    redirect('/users');
}

export async function updateUser(id: string, prevState: ActionState, formData: FormData): Promise<ActionState> {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== 'SUPER_ADMIN') {
        return { success: false, message: 'Unauthorized' };
    }

    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        sellerCode: formData.get('sellerCode'),
    };

    try {
        const validatedData = UserSchema.parse(rawData);

        const dataToUpdate: {
            name: string;
            email: string;
            password?: string;
            sellerCode?: string | null;
        } = {
            name: validatedData.name,
            email: validatedData.email,
            sellerCode: validatedData.sellerCode || null,
        };

        if (validatedData.password) {
            dataToUpdate.password = await bcrypt.hash(validatedData.password, 10);
        }

        await prisma.user.update({
            where: { id },
            data: dataToUpdate,
        });

        revalidatePath('/users');
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: error.issues[0].message };
        }
        return { success: false, message: 'Failed to update user' };
    }

    redirect('/users');
}

export async function deleteUser(id: string): Promise<ActionState> {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== 'SUPER_ADMIN') {
        return { success: false, message: 'Unauthorized' };
    }

    try {
        await prisma.user.delete({
            where: { id },
        });

        revalidatePath('/users');
        return { success: true, message: 'User deleted successfully' };
    } catch (error) {
        console.error('Delete user error:', error);
        return { success: false, message: 'Failed to delete user' };
    }
}
