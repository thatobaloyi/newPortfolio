'use client';

import React, { useState } from 'react';
import { Post as PrismaPostType } from "@prisma/client";
import { EditPostForm } from '../EditForm'; 

interface PostActionsProps {
    post: PrismaPostType;
    // Removed: formatDate: (date: Date) => string;
}

// Helper function moved to the client side
const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

export function PostActions({ post }: PostActionsProps) {
    const [isEditing, setIsEditing] = useState(false);

    // Prepare data structure needed by EditPostForm
    const postDataForEdit = {
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        summary: post.summary,
        postImage: post.postImage,
        tags: post.tags,
        author: post.author,
        publishedAt: post.publishedAt, 
    };

    if (isEditing) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-4">
                <EditPostForm 
                    post={postDataForEdit} 
                    onCancel={() => setIsEditing(false)} 
                />
            </div>
        );
    }

    return (
        <main className="max-w-4xl mx-auto py-12 px-4 bg-white rounded-xl shadow-2xl mt-30 mb-30">
        
            {/* Edit Button */}
            <div className='flex justify-end mb-4'>
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                >
                    Edit Post
                </button>
            </div>

            {/* Post Image (if available) */}
            {post.postImage && (
              <img 
                src={post.postImage} 
                alt={post.title} 
                className="w-full h-80 object-cover rounded-lg mb-6 shadow-md"
              />
            )}

            {/* Header */}
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{post.title}</h1>
            <div className="text-lg text-gray-500 mb-8 border-b pb-4">
              By <span className="font-semibold text-blue-600">{post.author}</span> on {formatDate(post.publishedAt)}
            </div>

            {/* Content */}
            <article className="prose prose-lg max-w-none text-gray-800">
              {post.summary && (
                 <p className="lead text-2xl italic font-serif text-gray-700 mb-6 border-l-4 border-blue-200 pl-4">
                   {post.summary}
                 </p>
              )}
              
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Tags and Metadata */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <p className="text-md text-gray-600">
                <span className="font-bold">Tags:</span> 
                {post.tags.map((tag, index) => (
                  <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ml-1">
                    {tag}
                  </span>
                ))}
              </p>
              <p className="text-xs text-gray-400 mt-3">Slug: {post.slug}</p>
            </div>
        </main>
    );
}