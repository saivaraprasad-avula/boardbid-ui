// src/pages/UploadCreative.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { TrashIcon as TrashOutline } from '@heroicons/react/24/outline';
import {
  TrashIcon,
  EyeIcon,
  LinkIcon,
  PlayCircleIcon,
  PhotoIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';
import InternalLayout from '../layout/InternalLayout';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Drawer from '../components/Drawer';
import { validateCreative } from '../utils/validateCreative';

// Lottie
import Lottie from 'lottie-react';
import loadingAnim from '../assets/loading.json';

const API_URL = import.meta.env.VITE_API_URL;

export default function UploadCreative() {
  const { user } = useUser();
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [savedFileName, setSavedFileName] = useState('');
  const [showRuleResults, setShowRuleResults] = useState(false);
  const [ruleStatus, setRuleStatus] = useState({});
  const [creatives, setCreatives] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Loading + error states
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Per-card "Copied!" badge
  const [copiedKey, setCopiedKey] = useState(null);
  const copiedTimer = useRef(null);

  useEffect(() => {
    if (user) fetchCreatives();
    return () => {
      clearTimeout(copiedTimer.current);
    };
  }, [user]);

  const fetchCreatives = async () => {
    if (!user) return;
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await fetch(`${API_URL}/users/${user.id}/creatives`);
      if (!res.ok) {
        setCreatives([]);
        setLoadError(`HTTP ${res.status}`);
        return;
      }
      const data = await res.json();
      const list = Array.isArray(data?.creatives) ? data.creatives : [];
      setCreatives(list);
    } catch (err) {
      console.error('Failed to fetch creatives', err);
      setLoadError('NETWORK');
      setCreatives([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile));
    setValidationResult(null);
    setSavedFileName('');
    setShowRuleResults(false);
  };

  const handleValidate = async () => {
    if (!file || !user) return;

    const fileType = file.type;
    const isValidType = ['image/jpeg', 'image/png', 'video/mp4'].includes(fileType);
    const isValidSize = file.size <= 5 * 1024 * 1024;
    const hasFlaggedWord = ['nude', 'gamble', 'cigarette', 'adult'].some(word =>
      file.name.toLowerCase().includes(word)
    );

    setRuleStatus({
      type: isValidType,
      size: isValidSize,
      flaggedWords: !hasFlaggedWord,
    });

    setShowRuleResults(true);

    const result = validateCreative(file);
    setValidationResult(result);

    if (result.status === 'approved') {
      try {
        const formData = new FormData();
        formData.append('creative', file);
        const res = await fetch(`${API_URL}/users/${user.id}/creatives`, {
          method: 'POST',
          body: formData,
        });
        if (res.ok) {
          setSavedFileName(file.name);
          fetchCreatives();
        }
      } catch (err) {
        console.error('Upload failed', err);
      }
    }
  };

  const handleDelete = async (name) => {
    if (!user) return;
    try {
      const encoded = encodeURIComponent(name);
      const res = await fetch(`${API_URL}/users/${user.id}/creatives/${encoded}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchCreatives();
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const renderRuleFeedback = () => {
    if (!file || !showRuleResults) {
      return (
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            📁 Allowed types: <code>JPG, PNG, MP4</code>
          </li>
          <li>
            📦 Max size: <code>5MB</code>
          </li>
          <li>
            🚫 Filename must not contain: <code>nude, gamble, cigarette, adult</code>
          </li>
        </ul>
      );
    }

    return (
      <ul className="space-y-2 text-sm">
        <li>
          {ruleStatus.type ? '✅' : '❌'} File type: <code>{file.type}</code>
        </li>
        <li>
          {ruleStatus.size ? '✅' : '❌'} File size:{' '}
          {(file.size / (1024 * 1024)).toFixed(2)} MB
        </li>
        <li>{ruleStatus.flaggedWords ? '✅' : '❌'} No banned words in filename</li>
      </ul>
    );
  };

  // Decide video vs image using filename/kind (not URL)
  const isVideoFile = (c) => {
    if (c?.kind) return c.kind === 'video';
    const name = (c?.filename || '').toLowerCase();
    return name.endsWith('.mp4');
  };

  const copyLink = async (url, key) => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedKey(key);
      clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopiedKey(null), 1200);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  const openPreview = (url) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <InternalLayout>
      <PageHeader
        title="Manage Creatives"
        actions={[
          { label: 'Upload Creative', variant: 'primary', onClick: () => setDrawerOpen(true) },
        ]}
      />

      <Card title="Your Creatives" className="mt-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-32 w-32">
              <Lottie animationData={loadingAnim} loop autoplay />
            </div>
          </div>
        ) : creatives.length === 0 ? (
          <div className="text-sm text-gray-500">
            {loadError ? (
              <div className="flex items-center gap-2">
                <span>Couldn’t load creatives.</span>
                <button onClick={fetchCreatives} className="underline">
                  Retry
                </button>
              </div>
            ) : (
              <p>No creatives uploaded yet.</p>
            )}
          </div>
        ) : (
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {creatives.map((c, idx) => {
              const name = c.filename;
              const url = c.url;
              const video = isVideoFile(c);
              const key = `${name}-${idx}`;

              return (
                <li
                  key={key}
                  className="group col-span-1 rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Media frame: consistent 16:9, fits entire asset */}
                  <div className="relative w-full overflow-hidden rounded-t-xl border-b border-gray-100 bg-neutral-50">
                    <div className="aspect-[16/9] w-full flex items-center justify-center">
                      {url ? (
                        video ? (
                          <video
                            src={url}
                            muted
                            playsInline
                            className="h-full w-full object-contain p-2"
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                        ) : (
                          <img src={url} alt={name} className="h-full w-full object-contain p-2" />
                        )
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                          <PhotoIcon className="h-10 w-10" />
                        </div>
                      )}
                    </div>

                    {/* Hover actions */}
                    <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => openPreview(url)}
                        className="rounded-full bg-white/90 p-2 shadow ring-1 ring-black/5 hover:bg-white"
                        title="Open"
                      >
                        <EyeIcon className="h-5 w-5 text-gray-700" />
                      </button>
                      <button
                        type="button"
                        onClick={() => copyLink(url, key)}
                        className="rounded-full bg-white/90 p-2 shadow ring-1 ring-black/5 hover:bg-white"
                        title="Copy link"
                      >
                        <LinkIcon className="h-5 w-5 text-gray-700" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(name)}
                        className="rounded-full bg-red-600 p-2 shadow hover:bg-red-700"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5 text-white" />
                      </button>
                    </div>

                    {/* Inline "Copied" badge (only near the icon) */}
                    {copiedKey === key && (
                      <div className="absolute right-3 top-14 rounded-md bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700 shadow ring-1 ring-emerald-200">
                        <span className="inline-flex items-center gap-1">
                          <CheckCircleIcon className="h-4 w-4" />
                          Copied
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-gray-900">{name}</h3>
                        <div className="mt-1">
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
                            {video ? 'Video' : 'Image'}
                          </span>
                        </div>
                      </div>

                      {/* (Kept hidden stub in case you later want a secondary delete) */}
                      <div className="hidden">
                        <button
                          onClick={() => handleDelete(name)}
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 ring-1 ring-red-200"
                        >
                          <TrashOutline className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <Drawer open={drawerOpen} onClose={setDrawerOpen} title="Upload & Validate Creative">
        <label className="mb-4 block text-sm font-medium text-gray-700">
          Select a creative (jpg, png, or mp4)
        </label>
        <input
          type="file"
          accept="image/jpeg, image/png, video/mp4"
          onChange={handleFileChange}
          className="mb-6 w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
        />

        {previewURL && (
          <div className="mb-6 overflow-hidden rounded-lg border shadow">
            {file.type.startsWith('image') ? (
              <img src={previewURL} alt="preview" className="w-full object-contain" />
            ) : (
              <video src={previewURL} controls className="w-full" />
            )}
          </div>
        )}

        <div className="mb-6">
          <h4 className="mb-2 text-md font-semibold text-gray-700">🛡️ Validation Rules:</h4>
          {renderRuleFeedback()}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleValidate}
            disabled={!file}
            className={`rounded-lg px-6 py-2 font-semibold text-white transition
              ${file ? 'bg-emerald-600 hover:bg-emerald-700' : 'cursor-not-allowed bg-gray-400'}`}
          >
            Validate Creative
          </button>
        </div>

        {validationResult && (
          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">
              ✅ Validation Result:
              <span
                className={`ml-2 rounded-full px-2 py-1 text-sm font-medium ${
                  validationResult.status === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {validationResult.status.toUpperCase()}
              </span>
            </h3>

            {validationResult.reasons.length > 0 && (
              <div className="mb-4">
                <h4 className="mb-1 font-medium text-red-600">Issues Found:</h4>
                <ul className="ml-6 list-disc space-y-1 text-sm text-red-500">
                  {validationResult.reasons.map((reason, i) => (
                    <li key={i}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {validationResult.suggestions.length > 0 && (
              <div className="mb-4">
                <h4 className="mb-1 font-medium text-gray-700">Suggestions:</h4>
                <ul className="ml-6 list-disc space-y-1 text-sm text-gray-600">
                  {validationResult.suggestions.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {validationResult.status === 'approved' && savedFileName && (
              <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                <p>
                  <strong>🎉 Upload Successful and Pending Approval:</strong>{' '}
                  <code>{savedFileName}</code>
                </p>
                <p>We'll notify you once it's reviewed.</p>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </InternalLayout>
  );
}