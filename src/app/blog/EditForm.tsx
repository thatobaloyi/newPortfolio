'use client'; 
import { useState } from 'react';
import { updatePost } from "./actions" // Corrected import path
import { useRouter } from 'next/navigation';


// Define the data structure needed for state initialization and update
interface PostEditData {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string | null;
  postImage: string | null;
  tags: string[];
  author: string;
  publishedAt: Date; 
}

interface EditPostFormProps {
    post: PostEditData;
    onCancel: () => void;
}

export function EditPostForm({ post, onCancel }: EditPostFormProps) {
  const router = useRouter();

  // State initialized with existing post data
  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [content, setContent] = useState(post.content);
  const [summary, setSummary] = useState(post.summary || '');
  const [postImage, setPostImage] = useState(post.postImage || '');
  // Convert tags array back to comma-separated string for input display
  const [tags, setTags] = useState(post.tags.join(', '));
  const [author, setAuthor] = useState(post.author);
  // Format Date object back to ISO string for date input field
  const [publishedAt, setPublishedAt] = useState(post.publishedAt.toISOString().substring(0, 10)); 

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Prepare the data object for update
      const dataToUpdate = { 
        id: post.id,
        title, 
        slug, 
        content,
        summary: summary || null,
        postImage: postImage || null,
        author,
        // Convert comma-separated string to array
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0), 
        // Convert ISO date string to Date object
        publishedAt: new Date(publishedAt), 
      };
      
      await updatePost(dataToUpdate);

      // If the slug changed, we need to redirect the user
      if (post.slug !== dataToUpdate.slug) {
          router.push(`/posts/${dataToUpdate.slug}`);
      } else {
          router.refresh(); // Refresh the current page to show new data
      }
      onCancel(); // Close the form
      
    } catch (e) {
      console.error("Update error:", e);
      setError("Failed to update post. Please check the slug for uniqueness.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white-50 border border-blue-200 rounded-lg shadow-xl mt-30 mb-30">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 text-blue-700">Edit Post: {post.title}</h3>
      
      {/* --- Core Content --- */}
      <div className="space-y-4 mb-6">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Post Title (Required)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          disabled={isLoading}
          required
        />
        
        {/* Slug Input - Warning if changed */}
        <input
          type="text"
          placeholder="Slug (Required)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className={`w-full p-3 border rounded-lg transition duration-150 ${post.slug !== slug ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
          disabled={isLoading}
          required
        />
        {post.slug !== slug && <p className="text-red-500 text-sm">Warning: Changing the slug will change the post's URL.</p>}
        
        {/* Summary Input */}
        <textarea
          placeholder="Summary (Optional short description)"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-y"
          rows={2}
          disabled={isLoading}
        />
        
        {/* Content Textarea */}
        <textarea
          placeholder="Main Content (Required)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-y"
          rows={6}
          disabled={isLoading}
          required
        />
      </div>

      {/* --- Metadata --- */}
      <div className="space-y-4 mb-6 p-4 bg-white rounded-lg border">
        <h4 className="text-lg font-semibold text-gray-700">Metadata</h4>

        {/* Tags Input */}
        <input
          type="text"
          placeholder="Tags (Comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          disabled={isLoading}
          required
        />

        {/* Post Image URL */}
        <input
          type="url"
          placeholder="Post Image URL (Optional)"
          value={postImage}
          onChange={(e) => setPostImage(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          disabled={isLoading}
        />

        {/* Author Input */}
        <input
          type="text"
          placeholder="Author Name (Required)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          disabled={isLoading}
          required
        />

        {/* Published At Date */}
        <div className="flex items-center space-x-2">
            <label htmlFor="publishedAt" className="text-gray-600 min-w-[120px]">Published Date:</label>
            <input
              id="publishedAt"
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              disabled={isLoading}
              required
            />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-600 text-sm mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          {error}
        </p>
      )}

      {/* Submit/Cancel Buttons */}
      <div className="flex justify-end space-x-4">
        <button 
            type="button" 
            onClick={onCancel}
            disabled={isLoading} 
            className="px-4 py-3 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
        >
            Cancel
        </button>

        <button 
          type="submit" 
          disabled={isLoading} 
          className={`px-4 py-3 font-semibold text-white rounded-lg transition duration-300 ease-in-out shadow-md min-w-[120px]
            ${isLoading 
              ? 'bg-blue-400 cursor-not-allowed flex items-center justify-center' 
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating....
            </>
          ) : "Save Changes" }
        </button>
      </div>
    </form>
  );
}