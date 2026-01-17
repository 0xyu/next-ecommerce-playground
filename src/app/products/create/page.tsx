'use client';

import { useState } from 'react';
import { createProduct } from '@/app/lib/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateProductPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        try {
            await createProduct(formData);
            // Action handles redirect, but just in case
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold mb-6">Create New Product</h1>

                <form action={handleSubmit} className="space-y-6">
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

                    {/* 
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Image Upload (Simulated)</label>
            <input type="file" name="imageFile" className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-black file:text-white
              hover:file:bg-gray-800
            "/>
          </div>
          */}

                    <div className="flex justify-end space-x-3 pt-4">
                        <Link href="/products" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">Cancel</Link>
                        <button type="submit" disabled={isLoading} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50">
                            {isLoading ? 'Creating...' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
