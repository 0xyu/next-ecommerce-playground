import { auth, signOut } from '@/auth';
import Link from 'next/link';

export default async function MemberPage() {
    const session = await auth();
    if (!session?.user) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-500">Welcome, {session.user.email}</p>
                    </div>
                    <form
                        action={async () => {
                            'use server';
                            await signOut();
                        }}
                    >
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition">
                            Sign Out
                        </button>
                    </form>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/products" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 group">
                        <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">Manage Products</h2>
                        <p className="text-gray-500">Create, edit, and view your products.</p>
                    </Link>
                    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 opacity-50">
                        <h2 className="text-xl font-semibold mb-2">Orders (Coming Soon)</h2>
                        <p className="text-gray-500">View customer orders.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
