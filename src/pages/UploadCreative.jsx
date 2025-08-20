// src/pages/UploadCreative.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  TrashIcon,
  EyeIcon,
  LinkIcon,
  PhotoIcon,
  CheckCircleIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/solid';
import InternalLayout from '../layout/InternalLayout';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import CreativeUploadDrawer from '../components/CreativeUploadDrawer';

// Lottie
import Lottie from 'lottie-react';
import loadingAnim from '../assets/loading.json';

const API_URL = import.meta.env.VITE_API_URL;

export default function UploadCreative() {
  const { user } = useUser();
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
          {
            label: 'Upload Creative',
            variant: 'primary',
            onClick: () => setDrawerOpen(true),
            icon: ArrowUpTrayIcon,
          },
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
                      {/* Placeholder for secondary actions */}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <CreativeUploadDrawer
        open={drawerOpen}
        onClose={setDrawerOpen}
        onUploaded={fetchCreatives}
      />
    </InternalLayout>
  );
}