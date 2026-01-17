'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex w-full items-center space-x-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
        </button>
    );
}
