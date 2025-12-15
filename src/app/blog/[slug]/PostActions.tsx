'use client';

import React from 'react';
import { Post as PrismaPostType } from "@prisma/client";
import { RelativeTimeDisplay } from '@/components/RelativeTimeDisplay';
import Link from 'next/link';
import Image from 'next/image';

interface PostActionsProps {
  post: PrismaPostType;
}

// Helper function moved to the client side
const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function PostActions({ post }: PostActionsProps) {
  // Removed: const [isEditing, setIsEditing] = useState(false); and related logic.

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 bg-white rounded-xl shadow-2xl mt-30 mb-20">
      
      <Link href='/blog' className='bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-3 font-semibold text-white rounded-lg transition duration-300 ease-in-out shadow-md min-w-[120px]'>All Posts</Link>
      <br />
      <br />

      {/* Removed: Edit Button, making this a pure public viewing component. */}

      {/* Post Image (if available) */}
  
      {post.postImage && (
        <Image
          src={post.postImage}
          alt={post.title}
          className="object-cover m-auto rounded-lg mb-6 shadow-md"
          width={800}
          quality={100}
          height={100}
        />
      )}

      {/* Header */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{post.title}</h1>
      <div className="text-lg text-gray-500 mb-8 border-b pb-4">
        By <span className="font-semibold text-blue-600">{post.author}</span> on {formatDate(post.publishedAt)}
        <br />
        <RelativeTimeDisplay date={post.publishedAt} />
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
      <br />
      <Link href='/blog' className='bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-3 font-semibold text-white rounded-lg transition duration-300 ease-in-out shadow-md min-w-[120px]'>All Posts</Link>
    </main>
  );
}