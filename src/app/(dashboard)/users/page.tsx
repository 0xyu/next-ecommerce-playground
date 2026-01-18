import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import DeleteUserButton from '@/app/components/delete-user-button';
import type { User } from '../../../../prisma/generated/client';

import { redirect } from 'next/navigation';

export default async function UsersPage() {
    const session = await auth();
    if (!session?.user?.id) return null;

    if (session.user.role !== 'SUPER_ADMIN') {
        redirect('/member');
    }

    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="max-w-6xl mx-auto">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                    <p className="text-sm text-gray-500">Manage system users.</p>
                </div>
                <Link href="/users/create" className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                    <Plus size={18} />
                    <span>Add User</span>
                </Link>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-4 font-medium">Name</th>
                            <th className="px-6 py-4 font-medium">Email</th>
                            <th className="px-6 py-4 font-medium">Created At</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user: User) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {user.name || 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end space-x-3">
                                    <Link href={`/users/${user.id}/edit`} className="text-gray-400 hover:text-blue-600">
                                        <Edit size={18} />
                                    </Link>
                                    <DeleteUserButton id={user.id} userName={user.name || user.email} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
