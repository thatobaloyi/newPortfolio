import React from 'react';
import PageWrapper from '../../../components/PageWrapper';
import { AdminProtected } from './AdminProtected'; // Import the new wrapper component
import prisma from '../../../../lib/prisma';
import { Post as PrismaPostType } from "@prisma/client";


async function AdminPostsPage() {
    
    // Fetch all posts regardless of authentication status, as this is a Server Component.
    // The data is passed to the client wrapper.
    const posts: PrismaPostType[] = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <PageWrapper>
            {/* The wrapper handles the client-side authentication check and conditional rendering */}
            <AdminProtected posts={posts} />
        </PageWrapper>
    )
}

export default AdminPostsPage;