import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'list',
    'bullet',
    'align',
    'link',
    'image'
  ];

  const handleSaveDraft = () => {
    console.log('Save Draft', { title, content, coverImage, bgColor });
  };

  const handlePublish = () => {
    console.log('Publish', { title, content, coverImage, bgColor });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4" style={{ backgroundColor: bgColor }}>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-xl font-semibold"
      />
      <Input
        placeholder="Cover Image URL"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
      />
      <div>
        <label className="mr-2">Background Color:</label>
        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
      </div>
      {coverImage && (
        <img src={coverImage} alt="Cover" className="w-full h-64 object-cover rounded" />
      )}
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
      />
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleSaveDraft}>
          Save Draft
        </Button>
        <Button onClick={handlePublish}>Publish</Button>
      </div>
    </div>
  );
}
