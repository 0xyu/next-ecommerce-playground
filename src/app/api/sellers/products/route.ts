import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { sellerCode, page = 1, limit = 50 } = body;

        if (!sellerCode) {
            return NextResponse.json({ error: 'sellerCode is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { sellerCode },
            select: { id: true, name: true, role: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
        }

        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where: {
                    ownerId: user.id,
                    published: true
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take
            }),
            prisma.product.count({
                where: {
                    ownerId: user.id,
                    published: true
                }
            })
        ]);

        return NextResponse.json({
            seller: {
                name: user.name,
                sellerCode
            },
            pagination: {
                total,
                totalPages: Math.ceil(total / take),
                currentPage: Number(page),
                limit: take
            },
            products
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
