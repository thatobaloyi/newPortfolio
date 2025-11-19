import React from 'react';
import Link from 'next/link'; // Import Link for navigation
import PageWrapper from '../../components/PageWrapper';
import { PostForm } from './admin/PostForm';
import prisma from '../../../lib/prisma';
import { Post as PrismaPostType }  from "@prisma/client";

async function page() {

    // Fetch posts from the database, ordered by creation date
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    });

    // Helper function to format the date for display
    const formatDate = (date: Date) => date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <PageWrapper>
            <main className='mt-30 max-w-5xl mx-auto px-4'>
                <h1 className='text-4xl font-extrabold text-gray-900 mb-8'>Blog Posts</h1>
                <Link href='/blog/admin'>
                    <img className='mx-auto' src="https://cdn-icons-png.flaticon.com/128/12724/12724606.png" alt="admin" width={30}/>
                </Link>
                <br />
                <h2 className="text-2xl font-semibold mt-10 mb-6 border-b pb-2 text-center text-gray-700">Current Posts ({posts.length})</h2>

                {/* Post Grid (Displays as Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
                    {posts?.map((post: PrismaPostType) => (
                        // The entire card is wrapped in a Link for navigation
                        <Link 
                            key={post.id} 
                            // This uses the post's slug to create the dynamic path
                            href={`/blog/${post.slug}`} 
                            passHref
                        >
                            <div className="block h-full cursor-pointer p-6 border border-gray-200 bg-white rounded-xl shadow-lg 
                                            hover:shadow-2xl hover:border-blue-400 transition duration-300 transform hover:-translate-y-1">
                                
                                {/* Image Placeholder/Preview (Optional) */}
                                {post.postImage ? (
                                    <img 
                                        src={post.postImage} 
                                        alt={post.title} 
                                        className="h-32 w-full object-cover rounded-md mb-4"
                                    />
                                ) : (
                                    <div className="h-32 w-full bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400 text-sm">
                                        No Image
                                    </div>
                                )}

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{post.title}</h3>

                                {/* Metadata */}
                                <p className="text-xs text-gray-500 mb-3">
                                    By <span className='font-medium'>{post.author}</span> on {formatDate(post.publishedAt)}
                                </p>
                                
                                {/* Summary/Content Preview */}
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {post.summary || post.content}
                                </p>

                                {/* Tags */}
                                <div className='mt-3'>
                                    {post.tags.slice(0, 3).map((tag, index) => (
                                        <span key={index} className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full mr-2">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </PageWrapper>
    )
}

export default page;