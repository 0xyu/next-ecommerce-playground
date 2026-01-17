import Link from 'next/link';
import { auth } from '@/auth';
import { Package, LayoutDashboard, User } from 'lucide-react';
import SignOutButton from '../components/sign-out-button';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    console.log("session", session)
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md z-10 flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold tracking-tight">E-Commerce</h1>
                    <p className="text-xs text-gray-400">Management System</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <Link
                        href="/member"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link
                        href="/products"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <Package size={20} />
                        <span className="font-medium">Products</span>
                    </Link>
                    {session?.user?.role === 'SUPER_ADMIN' && (
                        <Link
                            href="/users"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <User size={20} />
                            <span className="font-medium">Users</span>
                        </Link>
                    )}
                </nav>

                <div className="p-4 border-t">
                    <SignOutButton />
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 z-0">
                    <h2 className="text-lg font-medium text-gray-800">
                        {/* Dynamic breadcrumb or page title could go here */}
                    </h2>

                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden md:block">
                            <div className="text-sm font-semibold text-gray-800">{session?.user?.name || "Admin"}</div>
                            <div className="text-xs text-gray-500">{session?.user?.email}</div>
                        </div>
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {/* Initials or User Icon */}
                            <User size={20} className="text-gray-500" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
