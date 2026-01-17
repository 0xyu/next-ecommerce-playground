import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ email: string }> }
) {
    const { email } = await params;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, name: true, role: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
        }

        // Optional: Check if the user is actually a SELLER
        if (user.role !== 'SELLER' && user.role !== 'SUPER_ADMIN') {
            return NextResponse.json({ error: 'User is not a seller' }, { status: 403 });
        }

        const products = await prisma.product.findMany({
            where: {
                ownerId: user.id,
                published: true
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            seller: {
                name: user.name,
                email: email
            },
            products
        });
    } catch (error) {
        console.error('API Error fetching seller products:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
