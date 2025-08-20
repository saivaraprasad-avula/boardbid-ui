import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { ArrowUpTrayIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import Drawer from './Drawer';
import Card from './Card';

const API_URL = import.meta.env.VITE_API_URL;
const MAX_SIZE_MB = 20;

export default function CreativeUploadDrawer({ open, onClose, onUploaded }) {
  const { user } = useUser();
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreviewURL(URL.createObjectURL(selected));
    setStatus(null);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/');
    const isValidSize = file.size <= MAX_SIZE_MB * 1024 * 1024;

    if (!isValidType) {
      setStatus('error');
      setMessage('Only image or video files are allowed.');
      return;
    }
    if (!isValidSize) {
      setStatus('error');
      setMessage(`File must be under ${MAX_SIZE_MB}MB.`);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('creative', file);
      const res = await fetch(`${API_URL}/users/${user.id}/creatives`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setStatus('success');
        setMessage('Upload successful.');
        setFile(null);
        setPreviewURL('');
        onUploaded && onUploaded();
      } else {
        setStatus('error');
        setMessage('Upload failed.');
      }
    } catch (err) {
      console.error('Upload failed', err);
      setStatus('error');
      setMessage('Upload failed.');
    }
  };

  return (
    <Drawer open={open} onClose={onClose} title="Upload Creative">
      <Card title="Upload Creative">
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="mb-4 w-full text-sm text-gray-600"
        />

        {previewURL && file && (
          <div className="mb-4 overflow-hidden rounded-lg border shadow">
            {file.type.startsWith('image') ? (
              <img src={previewURL} alt="preview" className="w-full object-contain" />
            ) : (
              <video src={previewURL} controls className="w-full" />
            )}
          </div>
        )}

        <div className="mb-4 text-sm text-gray-600">
          <p className="flex items-center gap-1">
            <ArrowUpTrayIcon className="h-4 w-4 text-[#288dcf]" />
            Allowed: images or videos up to {MAX_SIZE_MB}MB
          </p>
        </div>

        {status && (
          <div
            className={`mb-4 flex items-center gap-2 rounded-md p-2 text-sm ${
              status === 'success'
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {status === 'success' ? (
              <CheckCircleIcon className="h-5 w-5" />
            ) : (
              <XCircleIcon className="h-5 w-5" />
            )}
            <span>{message}</span>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleUpload}
            disabled={!file}
            className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-white transition ${
              file ? 'bg-[#288dcf] hover:bg-[#1f7cb5]' : 'cursor-not-allowed bg-gray-400'
            }`}
          >
            Upload
          </button>
        </div>
      </Card>
    </Drawer>
  );
}
