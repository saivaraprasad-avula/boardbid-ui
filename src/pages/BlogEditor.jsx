import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InternalLayout from '../layout/InternalLayout';
import { db } from '../utils/db';

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [font, setFont] = useState('sans');
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [coverImage, setCoverImage] = useState('');

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  useEffect(() => {
    if (id) {
      db.posts.get(Number(id)).then((post) => {
        if (post) {
          setTitle(post.title);
          setContent(post.content);
          if (post.font) setFont(post.font);
          if (post.textColor) setTextColor(post.textColor);
          if (post.bgColor) setBgColor(post.bgColor);
          if (post.coverImage) setCoverImage(post.coverImage);
        }
      });
    }
  }, [id]);

  const handleSave = async () => {
    if (!title.trim()) return;
    if (id) {
      await db.posts.update(Number(id), {
        title,
        content,
        font,
        textColor,
        bgColor,
        coverImage
      });
    } else {
      await db.posts.add({
        title,
        content,
        createdAt: new Date(),
        font,
        textColor,
        bgColor,
        coverImage
      });
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
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 text-sm">
            <span>Font</span>
            <select
              className="border rounded p-1"
              value={font}
              onChange={(e) => setFont(e.target.value)}
            >
              <option value="sans">Sans</option>
              <option value="serif">Serif</option>
              <option value="mono">Mono</option>
            </select>
          </label>
          <label className="flex items-center space-x-2 text-sm">
            <span>Text</span>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </label>
          <label className="flex items-center space-x-2 text-sm">
            <span>Background</span>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="block text-sm mb-1">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const data = await toBase64(file);
                setCoverImage(data);
              }
            }}
            className="block w-full text-sm text-gray-600"
          />
          {coverImage && (
            <img src={coverImage} alt="cover" className="mt-2 h-40 object-cover rounded" />
          )}
        </div>
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
