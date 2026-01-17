import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import EditUserForm from './form';

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold mb-6">Edit User</h1>
            <EditUserForm user={user} />
        </div>
    );
}
