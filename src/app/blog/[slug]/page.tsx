import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import prisma from '../../../../lib/prisma';
import { notFound } from 'next/navigation';
import { PostActions } from './PostActions'; // Import the new Client Component

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Helper function to format the date (kept on server side for efficiency)
const formatDate = (date: Date) => date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

export default async function SinglePostPage({ params }: PostPageProps) {
  
  // Fetch the post based on the slug from the URL (Server Side)
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
  });

  // If no post is found, display a 404 page
  if (!post) {
    notFound();
  }

  // Pass the fetched post data to the Client Component for interactivity
  return (
    <PageWrapper>
      <PostActions 
        post={post} 
        
      />
    </PageWrapper>
  );
}