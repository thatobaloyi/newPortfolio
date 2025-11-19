'use server'; 

import prisma from '../../../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';




// Update the interface to include ALL fields passed from the form
interface PostCreateData {
  title: string;
  slug: string;
  content: string;
  summary: string | null; // Must match the state in the form, which could be an empty string (handled below)
  postImage: string | null;
  tags: string[];         // Already converted to string[] in the form
  author: string;
  publishedAt: Date;      // Already converted to Date object in the form
}

interface PostUpdateData extends PostCreateData {
    id: string; // The ID of the post to update
}

export async function createPost(formData: PostCreateData) {
  try {
    await prisma.post.create({
      data: {
        title: formData.title,
        content: formData.content,
        
        
        summary: formData.summary, 
        postImage: formData.postImage,
        
        slug: formData.slug,
        author: formData.author,
        publishedAt: formData.publishedAt, 
        tags: formData.tags,         
      },
    });

    
    revalidatePath('/blog'); 
    
  } catch (error) {
    console.error("Error creating post:", error);
    
    throw new Error("Failed to create post due to database or validation error.");
  }
}


export async function updatePost(formData: PostUpdateData) {

  const session = await getServerSession(authOptions);

    try {
        await prisma.post.update({
            where: {
                id: formData.id,
                author: session?.user.name
            },
            data: {
                title: formData.title,
                content: formData.content,
                summary: formData.summary,
                postImage: formData.postImage,
                slug: formData.slug,
                author: formData.author,
                publishedAt: formData.publishedAt,
                tags: formData.tags,
                // Note: createdAt and updatedAt are handled automatically by Prisma
            },
        });

        // Revalidate the main post list page and the single post page
        revalidatePath('/blog');
        revalidatePath(`/blog/${formData.slug}`);

    } catch (error) {
        console.error("Error updating post:", error);
        throw new Error("Failed to update post due to database or validation error.");
    }
}



export async function deletePost(postId: string) {
    try {
        // Find the post first to get its slug for targeted revalidation
        const session = await getServerSession(authOptions);

        const post = await prisma.post.findUnique({ where: { id: postId, author: session?.user.name } });

        if (post) {
            await prisma.post.delete({
                where: { id: postId },
            });
            
            // Revalidate all affected pages
            revalidatePath('/blog');
            revalidatePath('/admin');
            revalidatePath(`/blog/${post.slug}`);
        }

    } catch (error) {
        console.error("Error deleting post:", error);
        throw new Error("Failed to delete post.");
    }
}