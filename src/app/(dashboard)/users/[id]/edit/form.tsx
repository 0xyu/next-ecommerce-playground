'use client';

import { updateUser } from '@/app/lib/actions';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
interface UserProp {
    id: string;
    name?: string | null;
    email: string;
    sellerCode?: string | null;
}

export default function EditUserForm({ user }: { user: UserProp }) {
    const updateUserWithId = updateUser.bind(null, user.id);
    const [state, formAction] = useActionState(updateUserWithId, null);

    useEffect(() => {
        if (state?.success === false && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={formAction} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    defaultValue={user.name || ''}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password (leave blank to keep current)</label>
                <input
                    type="password"
                    name="password"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seller Code (Optional)</label>
                <input
                    type="text"
                    name="sellerCode"
                    defaultValue={user.sellerCode || ''}
                    placeholder="e.g. SELLER001"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <Link href="/users" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">Cancel</Link>
                <SubmitButton />
            </div>
        </form>
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
            {pending ? 'Saving...' : 'Save Changes'}
        </Button>
    );
}
