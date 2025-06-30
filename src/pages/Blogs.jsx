import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { db } from '../utils/db';

export default function Blogs() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const all = await db.posts.orderBy('createdAt').reverse().toArray();
      setPosts(all);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Header staticHeader={true} />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">📰 Blog</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="block p-4 bg-white rounded-xl border hover:bg-gray-50"
            >
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
          {posts.length === 0 && <p>No posts yet.</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}
