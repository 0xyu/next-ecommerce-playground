import { updateUser } from '@/app/lib/actions';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SubmitButton } from './submit-button';

// Note: I'll create a shared submit button or define it inline. 
// For simplicity, defining inline component in separate client file often cleaner 
// but here I will use a Client Component wrapper for the form or just inline button if possible.
// Actually, to use useFormStatus, we need a client component.
// I will create a Client Component for the form itself.

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
