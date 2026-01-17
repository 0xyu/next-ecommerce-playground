import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function ProductsPage() {
    const session = await auth();
    if (!session?.user?.id) return null;

    const products = await prisma.product.findMany({
        where: {
            ownerId: session.user.id,
        },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
                        <Link href="/member" className="text-gray-500 hover:text-gray-900">Back to Dashboard</Link>
                    </div>
                    <Link href="/products/create" className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                        <Plus size={20} />
                        <span>Add Product</span>
                    </Link>
                </header>

                {products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-medium text-gray-900">No products yet</h3>
                        <p className="text-gray-500 mb-6">Get started by creating your first product.</p>
                        <Link href="/products/create" className="text-blue-600 hover:underline">
                            Create a product
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                                <div className="h-48 bg-gray-200 relative">
                                    {/* Placeholder for image or actual image */}
                                    {product.imageUrl ? (
                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                                    )}
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                                    <div className="mt-auto flex justify-between items-center">
                                        <span className="font-medium">${Number(product.price).toFixed(2)}</span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${product.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {product.published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
