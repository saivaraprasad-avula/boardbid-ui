import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { db } from '../utils/db';

export default function BlogView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    db.posts.get(Number(id)).then(setPost);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <>
      <Header staticHeader={true} />
      <main
        className="max-w-3xl mx-auto px-6 pt-32 pb-16"
        style={{ backgroundColor: post.bgColor || '#ffffff' }}
      >
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt="cover"
            className="w-full h-60 object-cover rounded mb-6"
          />
        )}
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: post.textColor || '#000000', fontFamily: post.font }}
        >
          {post.title}
        </h1>
        <p className="text-gray-500 mb-8">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <div
          className="space-y-4"
          style={{ color: post.textColor || '#000000', fontFamily: post.font }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mt-8">
          <Link to="/" className="text-emerald-600">← Back Home</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
