'use client';

import { updateProduct } from '@/app/lib/actions';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { Product } from '../../../../../../prisma/generated/client';

interface ProductProp {
    id: string;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
    published: boolean;
}

export default function EditProductForm({ product }: { product: ProductProp }) {
    const updateProductWithId = updateProduct.bind(null, product.id);
    const [state, formAction] = useActionState(updateProductWithId, null);

    useEffect(() => {
        if (state?.success === false && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={formAction} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                    type="text"
                    name="name"
                    defaultValue={product.name}
                    required
                    placeholder="Enter product name"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    defaultValue={product.description || ''}
                    rows={4}
                    placeholder="Enter product description"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input
                        type="number"
                        name="price"
                        defaultValue={Number(product.price)}
                        step="0.01"
                        required
                        placeholder="0.00"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        defaultValue={product.imageUrl || ''}
                        placeholder="https://example.com/image.jpg"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    name="published"
                    id="published"
                    defaultChecked={product.published}
                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700">
                    Publish Product
                </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <Link href="/products" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200">
                    Cancel
                </Link>
                <SubmitButton />
            </div>
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className="bg-black text-white hover:bg-gray-800 px-6"
        >
            {pending ? 'Saving Changes...' : 'Save Product'}
        </Button>
    );
}
