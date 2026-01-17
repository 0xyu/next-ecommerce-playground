'use client';

import { createUser } from '@/app/lib/actions';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function CreateUserPage() {
    const [state, formAction] = useActionState(createUser, null);

    useEffect(() => {
        if (state?.success === false && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold mb-6">Create New User</h1>

            <form action={formAction} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" name="name" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" name="password" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seller Code (Optional)</label>
                    <input type="text" name="sellerCode" placeholder="e.g. SELLER001" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none" />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <Link href="/users" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">Cancel</Link>
                    <SubmitButton />
                </div>
            </form>
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
            {pending ? 'Creating...' : 'Create User'}
        </Button>
    );
}
