'use client';

import React from 'react';
import { Post as PrismaPostType } from "@prisma/client";
import { PostForm } from './PostForm'; 
import { AdminPostList } from './AdminPostList';
import { AdminLogin } from './AdminLogin';

// Import NextAuth hooks
import { useSession, signOut } from 'next-auth/react'; 


interface AdminProtectedProps {
    posts: PrismaPostType[]; // The posts array passed from the Server Component
}

export function AdminProtected({ posts }: AdminProtectedProps) {
    // Use the next-auth hook to get session status
    const { data: session, status } = useSession();
    
    // Status can be 'loading', 'authenticated', or 'unauthenticated'
    const isAuthenticated = status === 'authenticated';
    const isLoading = status === 'loading';

    const handleLogout = () => {
        // NextAuth function to securely log out
        signOut({ redirect: false }); 
    };

    const renderDashboard = () => (
        <>
            <div className="flex justify-between items-center mb-8 mt-30 border-b pb-4">
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
            <AdminPostList posts={posts} /> 
        </>
    );

    if (isLoading) {
        // Loading state while checking session
        return (
            <div className="flex items-center justify-center h-48">
                <p className="text-gray-500 animate-spin">Checking authentication status...</p>
            </div>
        );
    }
    
    return (
        <div className='mt-10 max-w-6xl mx-auto px-4'>
            {isAuthenticated ? (
                renderDashboard()
            ) : (
                // We no longer need to pass onLoginSuccess, as signIn handles the session update
                <AdminLogin /> 
            )}
        </div>
    );
}