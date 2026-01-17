import { auth } from '@/auth';
import Link from 'next/link';

export default async function MemberPage() {
    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/products" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 group">
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-black transition">Manage Products</h2>
                    <p className="text-gray-500">Create, edit, and view your products.</p>
                </Link>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 opacity-60">
                    <h2 className="text-xl font-semibold mb-2">Orders</h2>
                    <p className="text-gray-500">Coming soon.</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 opacity-60">
                    <h2 className="text-xl font-semibold mb-2">Analytics</h2>
                    <p className="text-gray-500">Coming soon.</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 opacity-60">
                    <h2 className="text-xl font-semibold mb-2">Settings</h2>
                    <p className="text-gray-500">Coming soon.</p>
                </div>
            </div>
        </div>
    );
}
