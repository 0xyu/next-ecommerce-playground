'use client';

import { useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import { useState } from 'react';
import Link from 'next/link';

// Note: I will create actions in the next step
// But for now I'll stub the component structure

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                <div className="flex flex-col justify-center p-8 md:p-14">
                    <span className="mb-3 text-4xl font-bold">Welcome back</span>
                    <span className="font-light text-gray-400 mb-8">
                        Please enter your details
                    </span>
                    <form action={async (formData) => {
                        const result = await authenticate(undefined, formData);
                        if (result) setErrorMessage(result);
                    }}>
                        <div className="py-4">
                            <span className="mb-2 text-md">Email</span>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                name="email"
                                id="email"
                                required
                            />
                        </div>
                        <div className="py-4">
                            <span className="mb-2 text-md">Password</span>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                required
                            />
                        </div>
                        <LoginButton />
                        <div className="text-center text-red-500 mt-2">{errorMessage}</div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-gray-800 hover:text-white hover:border hover:border-gray-300 transition duration-200"
            aria-disabled={pending}
        >
            {pending ? 'Logging in...' : 'Sign in'}
        </button>
    );
}
