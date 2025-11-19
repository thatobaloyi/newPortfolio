'use client'; 
import { useState } from 'react';
import { createPost } from './actions'; // Import the Server Action
import { useSession } from 'next-auth/react';

// Define the complete set of data fields the form will collect
interface PostFormData {
  title: string;
  slug: string;
  content: string;
  summary: string;
  postImage: string;
  tags: string; // Collecting as a comma-separated string
  author: string ;
  publishedAt: string; // Collecting as a date string
}

export function PostForm() {
  const {data: session, status} = useSession();

  const authorName = session?.user?.name || "";
  // State for all required and optional fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [postImage, setPostImage] = useState('');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState(session?.user?.name);
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().substring(0, 10)); // Default to today

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true); // 1. START loading state immediately upon submission

    try {
      // 2. Prepare the data object, converting types as necessary
      const dataToCreate = { 
        title, 
        slug, 
        content,
        summary: summary || null, // Pass null if empty for optional fields
        postImage: postImage || null,
        author: authorName,
        // Convert comma-separated string to array
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0), 
        // Convert ISO date string to Date object
        publishedAt: new Date(publishedAt), 
      };
      
      // Assuming createPost now accepts the fully structured object
      await createPost(dataToCreate);

      // 3. Reset form fields on success
      setTitle('');
      setSlug('');
      setContent('');
      setSummary('');
      setPostImage('');
      setTags('');
      setPublishedAt(new Date().toISOString().substring(0, 10)); // Reset date to today

    } catch (e) {
      console.error("Submission error:", e);
      // In a real app, you would parse the error from the server
      setError("Failed to create post. Please try again. Check console for details.");
    } finally {
      // 4. STOP loading state regardless of success or failure
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-50 border rounded-lg shadow-xl mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Create New Post</h3>
      
      {/* --- Core Content --- */}
      <div className="space-y-4 mb-6">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Post Title (Required)"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            // Optional: Auto-generate slug while typing title
            setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, ''));
          }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          disabled={isLoading}
          required
        />
        
        {/* Slug Input */}
        <input
          type="text"
          placeholder="Slug (e.g., my-great-post) (Required)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          disabled={isLoading}
          required
        />
        
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
          placeholder="Tags (Comma-separated: Next.js, JS, Prisma)"
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
          value={authorName}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          disabled={true}
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

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isLoading} 
        className={`w-full px-4 py-3 font-semibold text-white rounded-lg transition duration-300 ease-in-out shadow-md
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
            Submitting....
          </>
        ) : "Create Post" }
      </button>
    </form>
  );
}