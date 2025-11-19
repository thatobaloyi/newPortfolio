'use client';

import React, { useState } from 'react';

// NOTE ON SECURITY: In a production environment, never use hardcoded secrets
// or store sensitive session data in localStorage. A proper authentication 
// system (like NextAuth.js, Clerk, or Firebase Auth) using secure, 
// HTTP-only cookies and Server Actions is mandatory. This implementation 
// is for demonstration purposes only.

const ADMIN_SECRET_KEY = "SUPER_SECRET_ADMIN_KEY"; // Hardcoded simple secret
const SESSION_STORAGE_KEY = 'admin_session_token';

interface AdminLoginProps {
    onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        // Simple, client-side check against a hardcoded secret
        if (password === ADMIN_SECRET_KEY) {
            try {
                // Mimic a session token: Store a simple flag in localStorage
                // that the AdminProtected component can read.
                localStorage.setItem(SESSION_STORAGE_KEY, 'authenticated');
                onLoginSuccess(); // Tell the parent component login was successful
            } catch (e) {
                console.error("Local storage error:", e);
                setError("Login failed due to storage error. Try refreshing.");
            }
        } else {
            setError("Invalid Secret Key.");
            setPassword('');
        }
        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-[100vh]">
            <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl border border-red-100">
                <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Admin Access Required</h2>
                <p className="text-sm text-gray-500 mb-6 text-center">
                    Enter the secret key to access the Blog Administration Dashboard.
                </p>
                {error && (
                    <p className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Secret Key"
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