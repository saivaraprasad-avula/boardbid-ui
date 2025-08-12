// ✅ src/pages/UploadCreative.jsx (with InternalLayout)
import React, { useState } from 'react';
import InternalLayout from '../layout/InternalLayout';
import Card from '../components/Card';
import { validateCreative } from '../utils/validateCreative';
import { db } from '../utils/db';

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function UploadCreative() {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [savedFileName, setSavedFileName] = useState('');
  const [showRuleResults, setShowRuleResults] = useState(false);
  const [ruleStatus, setRuleStatus] = useState({});

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
    if (!file) return;

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
      const maxBase64Size = 7 * 1024 * 1024;
      const base64Data = await toBase64(file);

      if (base64Data.length > maxBase64Size * 1.37) {
        alert('File is too large to store in memory. Try compressing it under 5MB.');
        return;
      }

      const stored = await db.creatives.toArray();
      const nameParts = file.name.split('.');
      const base = nameParts.slice(0, -1).join('.');
      const ext = nameParts.slice(-1)[0];

      let counter = 1;
      let finalName = `${base}.${ext}`;
      while (stored.find((c) => c.name === finalName)) {
        finalName = `${base}_${counter}.${ext}`;
        counter++;
      }

      await db.creatives.add({
        name: finalName,
        url: base64Data,
        type: file.type
      });

      setSavedFileName(finalName);
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
      <Card title="🎨 Upload & Validate Creative">
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
                <p><strong>🎉 Creative approved and saved as:</strong> <code>{savedFileName}</code></p>
                <p>This file is now ready to be used in your campaign builder.</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </InternalLayout>
  );
}
