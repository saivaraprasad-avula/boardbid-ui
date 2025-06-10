// src/components/CampaignSummary.jsx
import React, { useMemo } from 'react';

export default function CampaignSummary({
  name,
  budget,
  selectedTab,
  city,
  state,
  zipcode,
  selectedBillboards,
  allBillboards,
  selectedCreative,
}) {
  const isAllSelected = useMemo(() => {
    return (
      selectedBillboards.length === allBillboards.length &&
      allBillboards.every((b) => selectedBillboards.includes(b.id))
    );
  }, [selectedBillboards, allBillboards]);

  const locationTypeLabel = useMemo(() => {
    if (selectedTab === 'map') return 'Map';
    if (selectedTab === 'city') return `City: ${city}`;
    if (selectedTab === 'state') return `State: ${state}`;
    if (selectedTab === 'zipcode') return `ZIP: ${zipcode}`;
    return '—';
  }, [selectedTab, city, state, zipcode]);

  const selectedBillboardDetails = useMemo(() => {
    return selectedBillboards
      .map((id) => allBillboards.find((b) => b.id === id))
      .filter(Boolean);
  }, [selectedBillboards, allBillboards]);

  return (
    <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📝 Campaign Summary</h3>
      <ul className="text-sm text-gray-700 space-y-1">
        <li>📛 <strong>Name:</strong> {name || '—'}</li>
        <li>💰 <strong>Budget:</strong> {budget ? `$${budget}` : '—'}</li>
        <li>📍 <strong>Location Type:</strong> {locationTypeLabel}</li>
        <li>
          📡 <strong>Selected Billboards:</strong>{' '}
          {isAllSelected ? (
            <span>All Available Billboards</span>
          ) : selectedBillboardDetails.length > 6 ? (
            <>
              <span>{selectedBillboardDetails.length} selected</span>
              <div className="mt-1 max-h-24 overflow-y-auto border rounded p-2 bg-gray-50 text-xs">
                {selectedBillboardDetails.map((b) => (
                  <div key={b.id} className="mb-1">
                    {b.name} ({b.city}, {b.state}, {b.zipcode})
                  </div>
                ))}
              </div>
            </>
          ) : (
            <span>
              {selectedBillboardDetails.map((b, i) => (
                <span key={b.id}>
                  {b.name} ({b.city}, {b.state}, {b.zipcode})
                  {i < selectedBillboardDetails.length - 1 ? ', ' : ''}
                </span>
              ))}
            </span>
          )}
        </li>
        <li>
          🎨 <strong>Selected Creative:</strong>{' '}
          {selectedCreative ? selectedCreative.name : 'None selected'}
        </li>
      </ul>
    </div>
  );
}
