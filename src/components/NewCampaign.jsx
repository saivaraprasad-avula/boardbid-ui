// src/components/NewCampaign.jsx
import { useState, useEffect } from 'react';
import LocationAndBillboardSelector from './LocationAndBillboardSelector';
import CampaignSummary from './CampaignSummary';
import { db } from '../utils/db';

export default function NewCampaign() {
  const [campaignName, setCampaignName] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedTab, setSelectedTab] = useState('map');
  const [selectedBillboards, setSelectedBillboards] = useState([]);
  const [allBillboards, setAllBillboards] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [selectedCreative, setSelectedCreative] = useState(null);
  const [allCreatives, setAllCreatives] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchCreatives = async () => {
      const all = await db.creatives.toArray();
      setAllCreatives(all.reverse());
    };
    fetchCreatives();
  }, []);

  useEffect(() => {
    const filtered = getFilteredBillboards();
    const allIds = filtered.map((b) => b.id);
    if (selectAll) {
      setSelectedBillboards(allIds);
    } else {
      setSelectedBillboards((prev) => prev.filter((id) => !allIds.includes(id)));
    }
  }, [selectAll, selectedTab, city, state, zipcode, allBillboards]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCreative) {
      alert('Please select a creative before launching the campaign.');
      return;
    }

    const location =
      selectedTab === 'city' ? { city }
      : selectedTab === 'state' ? { state }
      : selectedTab === 'zipcode' ? { zipcode }
      : {};

    const newCampaign = {
      campaignName,
      budget,
      selectedTab,
      location,
      selectedBillboards,
      selectedCreative,
      createdAt: new Date().toISOString(),
      status: 'Running'
    };

    await db.campaigns.add(newCampaign);

    setShowSuccess(true);
    setTimeout(() => {
      window.location.href = '/reports';
    }, 1800);
  };

  const getFilteredBillboards = () => {
    if (selectedTab === 'city') {
      return allBillboards.filter((b) => b.city?.toLowerCase().startsWith(city.toLowerCase()));
    } else if (selectedTab === 'state') {
      return allBillboards.filter((b) => b.state?.toLowerCase().startsWith(state.toLowerCase()));
    } else if (selectedTab === 'zipcode') {
      return allBillboards.filter((b) => b.zipcode?.toLowerCase().startsWith(zipcode.toLowerCase()));
    }
    return allBillboards;
  };

  const hasPreviewData = campaignName || budget || selectedBillboards.length > 0;

  return (
    <div className="bg-white px-8 py-10 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">🎯 New Campaign Details</h2>

      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          ✅ Campaign Created! You’ll be redirected to Reports shortly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Campaign Name</label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value.trimStart())}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm text-sm"
            placeholder="e.g. Summer Billboard Blast"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Budget (USD)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value.trim())}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm text-sm"
            placeholder="e.g. 5000"
            required
          />
        </div>

        <div>
          <LocationAndBillboardSelector
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            selectedBillboards={selectedBillboards}
            setSelectedBillboards={setSelectedBillboards}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            zipcode={zipcode}
            setZipcode={setZipcode}
            allBillboards={allBillboards}
            setAllBillboards={setAllBillboards}
          />

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="selectAll"
              checked={selectAll}
              onChange={(e) => setSelectAll(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="selectAll" className="text-sm text-gray-700">Select all visible billboards</label>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Select Approved Creative</label>
          {allCreatives.length === 0 ? (
            <p className="text-sm text-gray-500">No creatives available. Please upload and validate one first.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {allCreatives.map((c) => (
                <div
                  key={c.name}
                  onClick={() =>
                    setSelectedCreative(selectedCreative?.name === c.name ? null : c)
                  }
                  className={`border rounded-lg p-2 cursor-pointer hover:shadow transition ${
                    selectedCreative?.name === c.name ? 'ring-2 ring-emerald-500' : 'border-gray-200'
                  }`}
                >
                  {c.type.startsWith('image') ? (
                    <img src={c.url} alt={c.name} className="h-28 w-full object-cover rounded-md" />
                  ) : (
                    <video src={c.url} controls className="h-28 w-full rounded-md" />
                  )}
                  <p className="text-xs mt-1 text-center text-gray-600 truncate">{c.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={!selectedCreative}
            className={`w-full py-3 text-white text-sm font-semibold rounded-lg shadow transition ${
              selectedCreative ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            🚀 Launch Campaign
          </button>
        </div>
      </form>

      {hasPreviewData && (
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl px-6 py-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Campaign Summary</h3>
          <CampaignSummary
            campaignName={campaignName}
            budget={budget}
            selectedTab={selectedTab}
            city={city}
            state={state}
            zipcode={zipcode}
            selectedBillboards={selectedBillboards}
            allBillboards={allBillboards}
            selectedCreative={selectedCreative}
          />
        </div>
      )}
    </div>
  );
}
