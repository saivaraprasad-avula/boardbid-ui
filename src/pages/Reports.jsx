// ✅ src/pages/Reports.jsx (updated with InternalLayout)
import React, { useEffect, useState } from 'react';
import { db } from '../utils/db';
import { format } from 'date-fns';
import InternalLayout from '../layout/InternalLayout';

export default function Reports() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const loadCampaigns = async () => {
      const all = await db.campaigns.toArray();
      setCampaigns(all.reverse());
    };
    loadCampaigns();
  }, []);

  return (
    <InternalLayout>
      <h2 className="text-3xl font-bold text-gray-800 mb-10">📊 Campaign Reports</h2>

      {campaigns.length === 0 ? (
        <p className="text-gray-500 text-center">No campaigns launched yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 relative hover:shadow-lg transition"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">🎯 {c.campaignName}</h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    c.status === 'Running'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                📅 Launched on: <strong>{format(new Date(c.createdAt), 'PPP')}</strong>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                💰 Budget: <strong>${c.budget}</strong>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                📍 Type: <strong>{c.selectedTab.charAt(0).toUpperCase() + c.selectedTab.slice(1)}</strong>
              </p>
              {c.location && (
                <p className="text-sm text-gray-600 mb-1">
                  {c.selectedTab === 'city' && `🏙️ City: ${c.location.city}`}
                  {c.selectedTab === 'state' && `🗺️ State: ${c.location.state}`}
                  {c.selectedTab === 'zipcode' && `🏷️ ZIP: ${c.location.zipcode}`}
                </p>
              )}
              <p className="text-sm text-gray-600 mb-3">
                📡 Billboards Selected: <strong>{c.selectedBillboards.length}</strong>
              </p>

              <div className="mt-4 border-t pt-4">
                <p className="text-sm text-gray-600 mb-2">🎨 Creative Used:</p>
                {c.selectedCreative?.url && (
                  <div className="rounded-lg overflow-hidden">
                    {c.selectedCreative.type?.startsWith('image') ? (
                      <img
                        src={c.selectedCreative.url}
                        alt="Creative Preview"
                        className="w-full h-36 object-cover rounded-md border"
                      />
                    ) : (
                      <video
                        src={c.selectedCreative.url}
                        controls
                        className="w-full h-36 rounded-md border"
                      />
                    )}
                    <p className="text-xs text-center mt-1 text-gray-500 truncate">
                      {c.selectedCreative.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </InternalLayout>
  );
}
