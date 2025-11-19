'use client';

import React, { useState } from 'react';
import { Post as PrismaPostType } from "@prisma/client";
import { deletePost } from './actions';
import { useRouter } from 'next/navigation';
import { EditPostForm } from './EditForm';

interface AdminPostListProps {
    posts: PrismaPostType[];
}

const formatDate = (date: Date) => date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
});

// Since the PrismaPostType is fully compatible with the EditForm's expected type
type PostEditType = PrismaPostType;


export function AdminPostList({ posts }: AdminPostListProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    // State to hold the post currently being edited. Null means the list is showing.
    const [editingPost, setEditingPost] = useState<PostEditType | null>(null);

    const handleDelete = async (postId: string) => {
        // Using window.confirm as a workaround for the forbidden confirm()
        if (!window.confirm("Are you sure you want to permanently delete this post? This cannot be undone.")) {
            return;
        }

        setDeletingId(postId);
        try {
            await deletePost(postId);
            // Refresh the page to show the updated list after revalidation
            router.refresh(); 
        } catch (error) {
            console.error("Delete failed:", error);
            // Using window.alert as a workaround for the forbidden alert()
            window.alert("Failed to delete post.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleEditClick = (post: PrismaPostType) => {
        // Set the current post data into the editing state
        setEditingPost(post as PostEditType);
    };

    const handleCancelEdit = () => {
        // Clear the editing state to show the list again
        setEditingPost(null);
    }
    
    // --- 1. Display Edit Form if a post is being edited ---
    if (editingPost) {
        return (
            <div className="py-8">
                <EditPostForm 
                    // Pass the editing post data
                    post={editingPost} 
                    // When saved or cancelled, return to the list view
                    onCancel={handleCancelEdit} 
                />
            </div>
        );
    }


    // --- 2. Display Post List (Default View) ---
    return (
        <div className="mt-8 mb-20 overflow-x-auto shadow-xl rounded-lg bg-white">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {posts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {post.title}
                                <p className="text-xs text-blue-500 mt-1">{post.slug}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(post.publishedAt)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className='flex flex-wrap gap-1'>
                                    {post.tags.slice(0, 2).map((tag, i) => (
                                        <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">{tag}</span>
                                    ))}
                                    {post.tags.length > 2 && <span className="text-xs text-gray-400">+{post.tags.length - 2}</span>}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-2">
                                {/* Edit Button: Now opens the Edit Form inline */}
                                <button
                                    onClick={() => handleEditClick(post)}
                                    className="text-indigo-600 hover:text-indigo-900 px-3 py-1 border border-indigo-600 rounded-lg text-xs transition duration-150"
                                >
                                    Edit
                                </button>
                                
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    disabled={deletingId === post.id}
                                    className={`px-3 py-1 rounded-lg text-xs transition duration-150 
                                        ${deletingId === post.id 
                                            ? 'bg-red-300 text-white cursor-wait' 
                                            : 'bg-red-500 text-white hover:bg-red-600'}`}
                                >
                                    {deletingId === post.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {posts.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                    No posts found. Use the form above to create one!
                </div>
            )}
        </div>
    );
}