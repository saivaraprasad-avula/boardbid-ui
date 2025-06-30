import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InternalLayout from '../layout/InternalLayout';
import { db } from '../utils/db';

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      db.posts.get(Number(id)).then((post) => {
        if (post) {
          setTitle(post.title);
          setContent(post.content);
        }
      });
    }
  }, [id]);

  const handleSave = async () => {
    if (!title.trim()) return;
    if (id) {
      await db.posts.update(Number(id), { title, content });
    } else {
      await db.posts.add({ title, content, createdAt: new Date() });
    }
    navigate('/admin/blogs');
  };

  return (
    <InternalLayout>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        {id ? '✏️ Edit Post' : '📝 New Blog Post'}
      </h2>
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200 space-y-4">
        <input
          className="w-full p-2 border rounded-lg"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded-lg h-64"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleSave}
          className="py-2 px-4 bg-emerald-600 text-white rounded-lg"
        >
          Save Post
        </button>
      </div>
    </InternalLayout>
  );
}
