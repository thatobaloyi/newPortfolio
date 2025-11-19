'use client';

import React, { useState, useEffect } from 'react';
import { Post as PrismaPostType } from "@prisma/client";
import { PostForm } from './PostForm'; 
import { AdminPostList } from './AdminPostList';
import { AdminLogin } from './AdminLogin';

// Must match the key in AdminLogin.tsx
const SESSION_STORAGE_KEY = 'admin_session_token';

interface AdminProtectedProps {
    posts: PrismaPostType[]; // The posts array passed from the Server Component
}

export function AdminProtected({ posts }: AdminProtectedProps) {
    // Check localStorage once on the client side
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        try {
            // Check for the session token in local storage
            const sessionToken = localStorage.getItem(SESSION_STORAGE_KEY);
            setIsAuthenticated(sessionToken === 'authenticated');
        } catch (e) {
            // Handle cases where localStorage might be unavailable
            console.error("Could not access localStorage:", e);
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        try {
            localStorage.removeItem(SESSION_STORAGE_KEY);
        } catch (e) {
            console.error("Logout failed:", e);
        }
        setIsAuthenticated(false);
    };

    const renderDashboard = () => (
        <div className='mb-20 mt-30'>
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className='text-4xl font-extrabold text-gray-900'>
                    Blog Administration Dashboard
                </h1>
                <button 
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
                >
                    Logout
                </button>
            </div>
            
            {/* --- 1. Post Creation Form --- */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create New Post</h2>
            <PostForm /> 

            {/* --- 2. Post Management List --- */}
            <h2 className="text-2xl font-semibold text-gray-700 mt-12 mb-4 border-b pb-2">
                Manage Existing Posts ({posts.length})
            </h2>
            {/* The posts prop is correctly passed to AdminPostList */}
            <AdminPostList posts={posts} /> 
        </div>
    );

    if (isAuthenticated === null) {
        // Loading state while checking localStorage (prevents flicker)
        return (
            <div className="flex items-center justify-center h-48">
                <p className="text-gray-500 animate-pulse">Checking authentication status...</p>
            </div>
        );
    }
    
    return (
        <div className='mt-10 max-w-6xl mx-auto px-4'>
            {isAuthenticated ? (
                renderDashboard()
            ) : (
                <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
            )}
        </div>
    );
}