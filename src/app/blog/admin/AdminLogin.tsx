'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react'; // Import the NextAuth sign-in function
import { useRouter } from 'next/navigation';


export function AdminLogin() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        // Call the NextAuth signIn function, targeting the 'credentials' provider
        const result = await signIn('credentials', {
            email:email,
            password: password,
            redirect: false, // Prevent automatic redirect; we handle it manually
        });

        if (result?.error) {
            // Handle failed login
            setError("Invalid Credentials. Please try again.");
            setEmail('');
            setPassword('');
        } else if (result?.ok) {
            // Login successful
            // You can optionally call onLoginSuccess() or simply refresh/redirect
            router.refresh(); 
        }
        
        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-[83vh]">
            <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl border border-red-100">
                <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Admin Access Required</h2>
                <p className="text-sm text-gray-500 mb-6 text-center">
                    Enter credentials to access the Blog Administration Dashboard.
                </p>
                {error && (
                    <p className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 border-2 border-red-200 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                        disabled={isLoading}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 border-2 border-red-200 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                        disabled={isLoading}
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full px-4 py-3 font-semibold text-white rounded-lg transition duration-300 shadow-md
                            ${isLoading 
                                ? 'bg-red-400 cursor-not-allowed' 
                                : 'bg-red-600 hover:bg-red-700'
                            }`}
                    >
                        {isLoading ? 'Verifying...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}