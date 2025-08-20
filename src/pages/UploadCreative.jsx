// ✅ src/pages/UploadCreative.jsx (with InternalLayout)
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { TrashIcon } from '@heroicons/react/24/outline';
import InternalLayout from '../layout/InternalLayout';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Drawer from '../components/Drawer';
import { validateCreative } from '../utils/validateCreative';

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

  useEffect(() => {
    if (user) {
      fetchCreatives();
    }
  }, [user]);

  const fetchCreatives = async () => {
    if (!user) return;
    try {
      const res = await fetch(`${API_URL}/users/${user.id}/creatives`);
      if (res.ok) {
        const data = await res.json();
        const arr = Array.isArray(data) ? data : data.creatives || [];
        setCreatives(arr);
      }
    } catch (err) {
      console.error('Failed to fetch creatives', err);
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
      flaggedWords: !hasFlaggedWord
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
          body: formData
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
      const res = await fetch(`${API_URL}/users/${user.id}/creatives/${name}`, {
        method: 'DELETE'
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
          <li>📁 Allowed types: <code>JPG, PNG, MP4</code></li>
          <li>📦 Max size: <code>5MB</code></li>
          <li>🚫 Filename must not contain: <code>nude, gamble, cigarette, adult</code></li>
        </ul>
      );
    }

    return (
      <ul className="space-y-2 text-sm">
        <li>{ruleStatus.type ? '✅' : '❌'} File type: <code>{file.type}</code></li>
        <li>{ruleStatus.size ? '✅' : '❌'} File size: {(file.size / (1024 * 1024)).toFixed(2)} MB</li>
        <li>{ruleStatus.flaggedWords ? '✅' : '❌'} No banned words in filename</li>
      </ul>
    );
  };

  return (
    <InternalLayout>
      <PageHeader
        title="Manage Creatives"
        actions={[{ label: 'Upload Creative', variant: 'primary', onClick: () => setDrawerOpen(true) }]}
      />

      <Card title="Your Creatives" className="mt-8">
        {creatives.length === 0 ? (
          <p className="text-sm text-gray-500">No creatives uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {creatives.map((c, idx) => {
              const name = c.filename || c.name || c;
              const url = c.url || c.public_url || '';
              const isVideo = url
                ? url.toLowerCase().endsWith('.mp4')
                : typeof name === 'string' && name.toLowerCase().endsWith('.mp4');
              return (
                <div key={name + idx} className="flex flex-col items-center border rounded-lg p-2">
                  {url && (
                    isVideo ? (
                      <video src={url} controls className="w-full h-32 object-contain" />
                    ) : (
                      <img src={url} alt={name} className="w-full h-32 object-contain" />
                    )
                  )}
                  <button
                    onClick={() => handleDelete(name)}
                    className="mt-2 flex items-center text-red-600 hover:text-red-800 text-xs"
                  >
                    <TrashIcon className="h-4 w-4 mr-1" /> Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Drawer open={drawerOpen} onClose={setDrawerOpen} title="Upload & Validate Creative">
        <label className="block mb-4 text-sm font-medium text-gray-700">
          Select a creative (jpg, png, or mp4)
        </label>
        <input
          type="file"
          accept="image/jpeg, image/png, video/mp4"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0 file:text-sm file:font-semibold
                     file:bg-emerald-50 file:text-emerald-700
                     hover:file:bg-emerald-100 mb-6"
        />

        {previewURL && (
          <div className="mb-6 border rounded-lg overflow-hidden shadow">
            {file.type.startsWith('image') ? (
              <img src={previewURL} alt="preview" className="w-full object-contain" />
            ) : (
              <video src={previewURL} controls className="w-full" />
            )}
          </div>
        )}

        <div className="mb-6">
          <h4 className="text-md font-semibold text-gray-700 mb-2">🛡️ Validation Rules:</h4>
          {renderRuleFeedback()}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleValidate}
            disabled={!file}
            className={`px-6 py-2 text-white font-semibold rounded-lg transition
              ${file ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Validate Creative
          </button>
        </div>

        {validationResult && (
          <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ✅ Validation Result:
              <span
                className={`ml-2 px-2 py-1 rounded-full text-sm font-medium
                  ${validationResult.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              >
                {validationResult.status.toUpperCase()}
              </span>
            </h3>

            {validationResult.reasons.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-red-600 mb-1">Issues Found:</h4>
                <ul className="list-disc pl-6 text-sm text-red-500 space-y-1">
                  {validationResult.reasons.map((reason, i) => (
                    <li key={i}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {validationResult.suggestions.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-1">Suggestions:</h4>
                <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1">
                  {validationResult.suggestions.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {validationResult.status === 'approved' && savedFileName && (
              <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">
                <p><strong>🎉 Creative uploaded and pending approval:</strong> <code>{savedFileName}</code></p>
                <p>We'll notify you once it's reviewed.</p>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </InternalLayout>
  );
}
