import React from 'react';
import PageWrapper from '../../../components/PageWrapper';
import { AdminProtected } from './AdminProtected'; // Import the new wrapper component
import prisma from '../../../../lib/prisma';
import { Post as PrismaPostType } from "@prisma/client";
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';


async function AdminPostsPage() {

    const session = await getServerSession(authOptions);

    const loggedInUser = session?.user?.name;
    
    let posts: PrismaPostType[] = [];

    if (loggedInUser) {
        // 3. Filter the posts by the logged-in author's name
        try {
            posts = await prisma.post.findMany({
                where: {
                    // CRITICAL: Filter where the 'author' field matches the session user's name
                    author: loggedInUser, 
                },
                orderBy: { createdAt: 'desc' },
            });
        } catch (error) {
            console.error("Error fetching posts for admin:", error);
            // In case of a database error, we return an empty array
            posts = [];
        }
    } else {
        // If not logged in, return an empty array. 
        // AdminProtected will handle the unauthenticated state.
        posts = [];
    }

    return (
        <PageWrapper>
            {/* The wrapper handles the client-side authentication check and conditional rendering */}
            <AdminProtected posts={posts} />
        </PageWrapper>
    )
}

export default AdminPostsPage;