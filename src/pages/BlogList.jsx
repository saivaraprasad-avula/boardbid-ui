import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InternalLayout from '../layout/InternalLayout';
import { db } from '../utils/db';

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const all = await db.posts.orderBy('createdAt').reverse().toArray();
      setPosts(all);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    await db.posts.delete(id);
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <InternalLayout>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">📰 Blog Posts</h2>
      <div className="mb-6">
        <Link
          to="/admin/blogs/new"
          className="py-2 px-4 bg-emerald-600 text-white rounded-lg"
        >
          New Post
        </Link>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 rounded-xl border"
            style={{ backgroundColor: post.bgColor || '#ffffff' }}
          >
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt="cover"
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h3
              className="text-lg font-semibold"
              style={{ color: post.textColor || '#000000', fontFamily: post.font }}
            >
              {post.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <div className="space-x-4 text-sm">
              <Link to={`/blog/${post.id}`} className="text-emerald-600">
                View
              </Link>
              <Link to={`/admin/blogs/${post.id}`} className="text-blue-600">
                Edit
              </Link>
              <button onClick={() => handleDelete(post.id)} className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p>No posts yet.</p>}
      </div>
    </InternalLayout>
  );
}
