// src/components/CreativeUploadDrawer.jsx
import React, { useState, useRef, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import Drawer from './Drawer';
import Card from './Card';
import {
  CloudArrowUpIcon,
  CheckCircleIcon,
  XCircleIcon,
  PhotoIcon,
  FilmIcon,
  TrashIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';

const API_URL = import.meta.env.VITE_API_URL;
const MAX_SIZE_MB = 20;

export default function CreativeUploadDrawer({ open, onClose, onUploaded }) {
  const { user } = useUser();
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);

  const resetState = () => {
    setFile(null);
    setPreviewURL('');
    setStatus(null);
    setMessage('');
    setIsUploading(false);
  };

  const onPickFile = () => inputRef.current?.click();

  const handleFileSelect = (selected) => {
    if (!selected) return;
    setFile(selected);
    setPreviewURL(URL.createObjectURL(selected));
    setStatus(null);
    setMessage('');
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    handleFileSelect(selected);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const dropped = e.dataTransfer.files?.[0];
    handleFileSelect(dropped);
  }, []);

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const formatBytes = (bytes) => {
    if (!bytes && bytes !== 0) return '';
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(2)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
  };

  const handleUpload = async () => {
    if (!file || !user || isUploading) return;

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
      setIsUploading(true);
      setStatus(null);
      setMessage('');

      const formData = new FormData();
      formData.append('creative', file);

      const res = await fetch(`${API_URL}/users/${user.id}/creatives`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStatus('success');
        setMessage('Upload successful.');
        onUploaded && onUploaded();
      } else {
        setStatus('error');
        setMessage('Upload failed.');
      }
    } catch (err) {
      console.error('Upload failed', err);
      setStatus('error');
      setMessage('Upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const isImage = file?.type?.startsWith('image');
  const isVideo = file?.type?.startsWith('video');

  // Titles: drawer + card (dynamic)
  const drawerTitle = 'Add Creative';
  const cardTitle = file ? 'Review & Upload' : 'Select a File';

  return (
    <Drawer
      open={open}
      onClose={() => {
        resetState();
        onClose?.();
      }}
      title={drawerTitle}
    >
      <Card title={cardTitle} className="space-y-5">
        {/* Dropzone: only when no file selected */}
        {!file && (
          <button
            type="button"
            onClick={onPickFile}
            onDrop={onDrop}
            onDragOver={onDragOver}
            className="w-full cursor-pointer rounded-2xl border border-dashed border-gray-300 bg-gray-50/60 p-6 transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-3 flex items-center justify-center rounded-full bg-blue-50 p-3 ring-1 ring-blue-100">
                <CloudArrowUpIcon className="h-7 w-7 text-blue-600" />
              </div>
              <h4 className="text-base font-semibold text-gray-900">Drag & drop your file</h4>
              <p className="mt-1 text-sm text-gray-600">
                or{' '}
                <span className="font-semibold text-blue-700 underline underline-offset-2">
                  browse from device
                </span>
              </p>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-gray-500">
                <InformationCircleIcon className="h-4 w-4 text-gray-400" />
                Allowed: images or videos • Max {MAX_SIZE_MB}MB
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </button>
        )}

        {/* Selected file meta + preview */}
        {file && (
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 ring-1 ring-gray-200">
                {isImage ? (
                  <PhotoIcon className="h-6 w-6 text-gray-600" />
                ) : isVideo ? (
                  <FilmIcon className="h-6 w-6 text-gray-600" />
                ) : (
                  <CloudArrowUpIcon className="h-6 w-6 text-gray-600" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{file.name}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  <span className="rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
                    {file.type || 'unknown'}
                  </span>
                  <span className="rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
                    {formatBytes(file.size)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetState}
                className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-semibold text-gray-700 ring-1 ring-gray-200 hover:bg-gray-200"
                title="Clear"
              >
                <TrashIcon className="h-4 w-4" />
                Clear
              </button>
            </div>

            {previewURL && (
              <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
                {isImage ? (
                  <img src={previewURL} alt="preview" className="w-full object-contain" />
                ) : (
                  <video src={previewURL} controls className="w-full" />
                )}
              </div>
            )}
          </div>
        )}

        {/* Status alert */}
        {status && (
          <div
            className={`flex items-center gap-2 rounded-md p-3 text-sm ${
              status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
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

        {/* Actions: add extra space above, remove Cancel */}
        <div className="mt-6 flex items-center justify-end">
          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-white transition ${
              file && !isUploading ? 'bg-blue-600 hover:bg-blue-700' : 'cursor-not-allowed bg-gray-400'
            }`}
          >
            {isUploading ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Uploading…
              </>
            ) : (
              <>
                <CloudArrowUpIcon className="mr-2 h-5 w-5" />
                Upload
              </>
            )}
          </button>
        </div>

        {/* Hidden input kept outside to preserve state across conditional blocks */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </Card>
    </Drawer>
  );
}