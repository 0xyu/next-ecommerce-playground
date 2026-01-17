import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(_req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const json = await _req.json();
        const product = await prisma.product.create({
            data: {
                ...json,
                ownerId: session.user.id,
            },
        });
        return NextResponse.json(product);
    } catch (error) {
        console.error('[PRODUCTS_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function GET(_req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const products = await prisma.product.findMany({
            where: {
                ownerId: session.user?.id,
            }
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error('[PRODUCTS_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
