import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import EditProductForm from './form';
import type { Product } from '../../../../../../prisma/generated/client';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                <p className="text-sm text-gray-500">Update the details of your product.</p>
            </header>
            <EditProductForm product={{
                ...product,
                price: Number(product.price)
            }} />
        </div>
    );
}
