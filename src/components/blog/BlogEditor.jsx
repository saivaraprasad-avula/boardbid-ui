import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSaveDraft = () => {
    console.log('Save Draft', { title, content });
  };

  const handlePublish = () => {
    console.log('Publish', { title, content });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-xl font-semibold"
      />
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleSaveDraft}>
          Save Draft
        </Button>
        <Button onClick={handlePublish}>Publish</Button>
      </div>
      <div className="border p-4 rounded-md bg-muted">
        <p className="font-semibold mb-2">Preview</p>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
