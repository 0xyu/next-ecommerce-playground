import { prisma } from '@/lib/db';

export default async function MemberPage() {
    // Basic stats for the member dashboard
    const productsCount = await prisma.product.count();

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back to your store management system.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Products</p>
                    <p className="text-3xl font-bold text-gray-900">{productsCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 italic text-gray-400">
                    More stats coming soon...
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h2>
                <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-sm text-gray-600 border-b border-gray-50 pb-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>Welcome to the new dashboard interface!</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
