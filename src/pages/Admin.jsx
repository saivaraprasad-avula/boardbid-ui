import { useState } from 'react';
import InternalLayout from '../layout/InternalLayout';
import { db } from '../utils/db';

export default function Admin() {
  const [clearedCreatives, setClearedCreatives] = useState(false);
  const [clearedCampaigns, setClearedCampaigns] = useState(false);

  const handleClearCreatives = async () => {
    await db.creatives.clear();
    setClearedCreatives(true);
  };

  const handleClearCampaigns = async () => {
    await db.campaigns.clear();
    setClearedCampaigns(true);
  };

  return (
    <InternalLayout>
      <h2 className="text-3xl font-bold text-gray-800 mb-10 flex items-center">
        🛠️ <span className="ml-3">Admin Tools</span>
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Clear Creatives */}
        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">🖼️ Saved Creatives</h3>
          <p className="text-sm text-gray-600 mb-4">Clear all uploaded & validated creatives from memory.</p>
          <button
            onClick={handleClearCreatives}
            className="w-full py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
          >
            🧹 Clear All Saved Creatives
          </button>
          {clearedCreatives && (
            <p className="mt-3 text-green-600 text-sm font-medium">✅ All creatives cleared from IndexedDB.</p>
          )}
        </div>

        {/* Clear Campaigns */}
        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">📊 Campaigns</h3>
          <p className="text-sm text-gray-600 mb-4">Delete all campaign data from system memory.</p>
          <button
            onClick={handleClearCampaigns}
            className="w-full py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition"
          >
            🧹 Clear All Campaigns
          </button>
          {clearedCampaigns && (
            <p className="mt-3 text-green-600 text-sm font-medium">✅ All campaigns cleared from IndexedDB.</p>
          )}
        </div>

        {/* Blog Editor */}
        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">✍️ Blog Posts</h3>
          <p className="text-sm text-gray-600 mb-4">Create and manage blog posts for your site.</p>
          <div className="space-y-2">
            <a
              href="/boardbid-ui/admin/blogs/new"
              className="w-full block text-center py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition"
            >
              Create New Blog
            </a>
            <a
              href="/boardbid-ui/admin/blogs"
              className="w-full block text-center py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition"
            >
              Manage Blog Posts
            </a>
          </div>
        </div>
      </div>
    </InternalLayout>
  );
}
