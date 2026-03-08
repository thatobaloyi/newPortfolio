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
    <main className="mx-auto mt-20 mb-16 max-w-4xl px-4 md:mt-24">
      <article className="panel p-6 md:p-8">
        <Link
          href='/blog'
          className='inline-flex items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline'
        >
          <span aria-hidden>←</span>
          All Posts
        </Link>

        <header className="mt-6 border-b border-border/50 pb-6">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">{post.title}</h1>
          <p className="mt-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            {post.author} • {formatDate(post.publishedAt)}
          </p>
          <div className="mt-1">
            <RelativeTimeDisplay date={post.publishedAt} />
          </div>
        </header>

        {post.postImage && (
          <Image
            src={post.postImage}
            alt={post.title}
            className="my-6 h-auto w-full rounded-xl object-cover"
            width={1200}
            quality={100}
            height={675}
          />
        )}

        <section className="max-w-none text-[1.02rem] leading-8 text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">
        {post.summary && (
          <p className="mb-6 rounded-r-lg border-l-2 border-border bg-muted/60 px-4 py-3 text-lg italic text-muted-foreground">
            {post.summary}
          </p>
        )}

        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </section>

        <footer className="mt-10 border-t border-border/50 pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="rounded-full bg-muted px-2.5 py-1 text-xs text-foreground">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Slug: {post.slug}</p>
          <Link
            href='/blog'
            className='mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline'
          >
            <span aria-hidden>←</span>
            All Posts
          </Link>
        </footer>
      </article>
    </main>
  );
}