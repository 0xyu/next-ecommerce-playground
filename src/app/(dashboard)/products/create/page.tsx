'use client';

import { createProduct } from '@/app/lib/actions';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function CreateProductPage() {
    const [state, formAction] = useActionState(createProduct, null);

    useEffect(() => {
        if (state?.success === false && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold mb-6">Create New Product</h1>

                <form action={formAction} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input type="text" name="name" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea name="description" rows={4} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                            <input type="number" name="price" step="0.01" min="0" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
                        </div>
                        <div className="flex items-center space-x-2 pt-6">
                            <input type="checkbox" name="published" id="published" className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" />
                            <label htmlFor="published" className="text-sm font-medium text-gray-700">Publish immediately</label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
                        <div className="text-xs text-gray-500 mb-2">Upload handled securely via Vercel Blob in production. For now, paste a URL.</div>
                        <input type="url" name="imageUrl" placeholder="https://example.com/image.jpg" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Link href="/products" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">Cancel</Link>
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className="bg-black text-white hover:bg-gray-800"
        >
            {pending ? 'Creating...' : 'Create Product'}
        </Button>
    );
}
