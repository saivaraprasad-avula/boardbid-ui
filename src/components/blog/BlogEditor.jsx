import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { format } from 'date-fns';
import { db } from '../../utils/db';

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const quillRef = useRef();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('Draft');
  const [publishDate, setPublishDate] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  // styling fields kept for backward compatibility
  const [font, setFont] = useState('sans');
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  const uploadImageToImageKit = async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://ik.imagekit.io/mock/${encodeURIComponent(file.name)}`);
      }, 500);
    });
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const url = await uploadImageToImageKit(file);
        const range = quillRef.current.getEditor().getSelection();
        quillRef.current.getEditor().insertEmbed(range.index, 'image', url);
      }
    };
    input.click();
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: { image: imageHandler },
    },
  };

  useEffect(() => {
    const saved = localStorage.getItem('blog-editor-draft');
    if (!id && saved) {
      const data = JSON.parse(saved);
      setTitle(data.title || '');
      setSlug(data.slug || '');
      setContent(data.content || '');
      setTags(data.tags || '');
      setStatus(data.status || 'Draft');
      setPublishDate(data.publishDate || '');
      setMetaTitle(data.metaTitle || '');
      setMetaDesc(data.metaDesc || '');
      setCoverImage(data.coverImage || '');
      setFont(data.font || 'sans');
      setTextColor(data.textColor || '#000000');
      setBgColor(data.bgColor || '#ffffff');
    }
    if (id) {
      db.posts.get(Number(id)).then((post) => {
        if (post) {
          setTitle(post.title);
          setSlug(post.slug || '');
          setContent(post.content);
          setTags(post.tags || '');
          setStatus(post.status || 'Draft');
          setPublishDate(post.publishDate || '');
          setMetaTitle(post.metaTitle || '');
          setMetaDesc(post.metaDesc || '');
          setCoverImage(post.coverImage || '');
          if (post.font) setFont(post.font);
          if (post.textColor) setTextColor(post.textColor);
          if (post.bgColor) setBgColor(post.bgColor);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    const slugified = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    if (!id) {
      setSlug(slugified);
    }
  }, [title, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      const data = {
        title,
        slug,
        content,
        tags,
        status,
        publishDate,
        metaTitle,
        metaDesc,
        coverImage,
        font,
        textColor,
        bgColor,
      };
      localStorage.setItem('blog-editor-draft', JSON.stringify(data));
      setLastSaved(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, [title, slug, content, tags, status, publishDate, metaTitle, metaDesc, coverImage, font, textColor, bgColor]);

  const handleSave = async () => {
    if (!title.trim()) return;
    const post = {
      title,
      slug,
      content,
      tags,
      status,
      publishDate,
      metaTitle,
      metaDesc,
      font,
      textColor,
      bgColor,
      coverImage,
      updatedAt: new Date(),
    };
    if (id) {
      await db.posts.update(Number(id), post);
    } else {
      await db.posts.add({ ...post, createdAt: new Date() });
      localStorage.removeItem('blog-editor-draft');
    }
    navigate('/admin/blogs');
  };

  return (
    <div className="space-y-4" style={{ backgroundColor: bgColor }}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{id ? 'Edit Post' : 'New Post'}</h2>
        <div className="flex items-center space-x-4">
          <label className="text-sm flex items-center space-x-1">
            <input
              type="checkbox"
              checked={previewMode}
              onChange={() => setPreviewMode(!previewMode)}
            />
            <span>Preview Mode</span>
          </label>
          <button
            onClick={handleSave}
            className="py-2 px-4 bg-emerald-600 text-white rounded-lg"
          >
            Save Post
          </button>
        </div>
      </div>
      {lastSaved && (
        <p className="text-sm text-gray-500">
          Last saved {format(lastSaved, 'HH:mm:ss')}
        </p>
      )}
      <input
        className="w-full p-2 border rounded-lg"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded-lg"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded-lg"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <div className="flex space-x-4">
        <label className="flex flex-col text-sm">
          Status
          <select
            className="border rounded p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Draft">Draft</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Published">Published</option>
          </select>
        </label>
        <label className="flex flex-col text-sm">
          Publish Date
          <input
            type="date"
            className="border rounded p-2"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
          />
        </label>
      </div>
      <input
        className="w-full p-2 border rounded-lg"
        placeholder="SEO Meta Title"
        value={metaTitle}
        onChange={(e) => setMetaTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded-lg"
        placeholder="SEO Meta Description"
        value={metaDesc}
        onChange={(e) => setMetaDesc(e.target.value)}
      />
      <div>
        <label className="block text-sm mb-1">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              const url = URL.createObjectURL(file);
              setCoverImage(url);
            }
          }}
          className="block w-full text-sm text-gray-600"
        />
        {coverImage && (
          <img
            src={coverImage}
            alt="cover"
            className="mt-2 h-40 object-cover rounded"
          />
        )}
      </div>
      {!previewMode && (
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          style={{ height: '300px' }}
        />
      )}
      {previewMode && (
        <div
          className="prose max-w-none"
          style={{ color: textColor, fontFamily: font }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}
