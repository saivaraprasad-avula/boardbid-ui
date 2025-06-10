// src/components/LocationAndBillboardSelector.jsx

import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function FlyTo({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo([coords.lat, coords.lng], 12);
    }
  }, [coords]);
  return null;
}

export default function LocationAndBillboardSelector({
  selectedTab,
  setSelectedTab,
  selectedBillboards,
  setSelectedBillboards,
  city,
  setCity,
  state,
  setState,
  zipcode,
  setZipcode,
  allBillboards,         // ✅ Add this line
  setAllBillboards,
})
{
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
  const [filteredBillboards, setFilteredBillboards] = useState([]);

  // Load billboards from JSON
      useEffect(() => {
        fetch('/mock/mock_billboards.json')
          .then((res) => res.json())
          .then((data) => {
            setFilteredBillboards(data);     // if you have filtering logic
            setAllBillboards(data);          // ✅ Needed to populate summary
          });
      }, []);
  

  // Filter logic
  useEffect(() => {
    let filtered = allBillboards;
    if (selectedTab === 'city') {
      filtered = allBillboards.filter((b) =>
        b.city.toLowerCase().includes(city.toLowerCase())
      );
    } else if (selectedTab === 'state') {
      filtered = allBillboards.filter((b) =>
        b.state.toLowerCase().includes(state.toLowerCase())
      );
    } else if (selectedTab === 'zipcode') {
      filtered = allBillboards.filter((b) =>
        b.zipcode.startsWith(zipcode)
      );
    }
    setFilteredBillboards(filtered);
  }, [selectedTab, city, state, zipcode, allBillboards]);

  const toggleBillboard = (id) => {
    setSelectedBillboards((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };


  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">Select Target Location</h3>

      <div className="flex space-x-2 mb-4">
        {['map', 'city', 'state', 'zipcode'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded ${
              selectedTab === tab
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {selectedTab === 'map' && (
        <MapContainer
          center={mapCenter}
          zoom={4}
          scrollWheelZoom={true}
          className="h-64 w-full rounded-md mb-4"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyTo coords={mapCenter} />
          {filteredBillboards.map((b) => (
            <Marker key={b.id} position={[b.lat, b.lng]}>
              <Popup>
                <div>
                  <p className="font-bold">{b.name}</p>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      checked={selectedBillboards.includes(b.id)}
                      onChange={() => toggleBillboard(b.id)}
                    />
                    <span>Select</span>
                  </label>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {selectedTab === 'city' && (
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      )}

      {selectedTab === 'state' && (
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Enter state"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      )}

      {selectedTab === 'zipcode' && (
        <input
          type="text"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          placeholder="Enter ZIP code"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      )}

      <div className="mt-4">
        <h4 className="font-medium mb-2 text-sm">Billboards Available:</h4>
        <ul className="max-h-40 overflow-y-auto space-y-2 text-sm">
          {filteredBillboards.map((b) => (
            <li key={b.id} className="flex justify-between items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedBillboards.includes(b.id)}
                  onChange={() => toggleBillboard(b.id)}
                />
                <span>{b.name} ({b.city}, {b.state})</span>
              </label>
            </li>
          ))}
          {filteredBillboards.length === 0 && (
            <li className="text-gray-500">No billboards found for selection.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
