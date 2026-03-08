import React from 'react';
import Link from 'next/link'; // Import Link for navigation
import PageWrapper from '../../components/PageWrapper';
import prisma from '../../../lib/prisma';
import { Post as PrismaPostType } from "@prisma/client";
import { RelativeTimeDisplay } from '@/components/RelativeTimeDisplay';
import Image from 'next/image';

async function page() {

    const now = new Date(); 
    // Fetch posts from the database, ordered by creation date
    // also fetches the posts that have peen published now or in the past.
    const posts = await prisma.post.findMany({
        where: {
            publishedAt: {
                lte: now, // lte = Less Than or Equal to
            },
        },
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
            <main className='mx-auto mt-20 max-w-6xl px-4 pb-10 md:mt-24'>
                <section className="panel mb-8 p-6 md:p-8">
                    <p className="eyebrow">Writing</p>
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h1 className='text-3xl font-semibold tracking-tight text-foreground md:text-4xl'>
                                Blog Posts
                            </h1>
        
                        </div>
                        <Link
                            href='/blog/admin'
                            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        >
                            <Image src="https://cdn-icons-png.flaticon.com/128/12724/12724606.png" alt="admin" width={18} height={18} />
                            Admin
                        </Link>
                    </div>
                </section>

                <section>
                    <p className="mb-4 text-sm text-muted-foreground">{posts.length} published post{posts.length === 1 ? '' : 's'}</p>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {posts?.map((post: PrismaPostType) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="feature-card h-full p-4 md:p-5"
                        >
                            <article className="h-full">
                                {post.postImage ? (
                                    <Image
                                        src={post.postImage}
                                        alt={post.title}
                                        className="mb-4 h-40 w-full rounded-xl object-cover"
                                        width={640}
                                        height={280}
                                    />
                                ) : (
                                    <div className="mb-4 flex h-40 w-full items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
                                        No Image
                                    </div>
                                )}

                                <h3 className="mb-2 line-clamp-2 text-xl font-semibold tracking-tight text-foreground">{post.title}</h3>

                                <p className="mb-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                                    {post.author} • {formatDate(post.publishedAt)}
                                </p>
                                <RelativeTimeDisplay date={post.publishedAt} />

                                <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                                    {post.summary || post.content}
                                </p>

                                <div className='mt-4 flex flex-wrap gap-2'>
                                    {post.tags.slice(0, 3).map((tag, index) => (
                                        <span key={index} className="rounded-full bg-muted px-2.5 py-1 text-xs text-foreground">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        </Link>
                    ))}
                    </div>
                </section>
            </main>
        </PageWrapper>
    )
}

export default page;