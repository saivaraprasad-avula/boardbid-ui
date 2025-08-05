import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const campaignTypeOptions = [
  "Brand Awareness",
  "Product Launch",
  "Retail/Foot Traffic",
  "Event Promotion",
  "Direct Response / Lead Generation",
  "Programmatic Test",
  "Other",
];

const industryOptions = [
  "Technology",
  "Consumer Goods",
  "Retail / eCommerce",
  "Travel & Hospitality",
  "Entertainment / Media",
  "Food & Beverage",
  "Automotive",
  "Healthcare / Pharma",
  "Finance / Crypto",
  "Political / Advocacy",
  "Energy / Sustainability",
  "Fashion / Apparel",
  "Education / EdTech",
  "Real Estate / PropTech",
  "Government / Defense",
  "Other",
];

const campaignGoalOptions = [
  "Drive website traffic",
  "Boost social media engagement",
  "Increase brand recognition",
  "Promote a retail/physical location",
  "Support a product launch",
  "Drive foot traffic or store visits",
  "Retarget or reinforce digital campaigns",
  "Test OOH in new markets",
  "Other",
];

const budgetOptions = [
  "Under $5,000",
  "$5,000–$10,000",
  "$10,000–$25,000",
  "$25,000–$50,000",
  "$50,000–$100,000",
  "$100,000–$250,000",
  "$250,000–$500,000",
  "$500,000–$1M",
  "$1M+",
];

const targetLocationOptions = [
  "Nationwide",
  "City",
  "Zip Code",
  "DMA",
  "Events / Conferences",
  "Airports",
  "Specific Venues",
  "Upload a Custom List",
];

const screenTypeOptions = [
  "Digital Billboards",
  "Urban Panels / Street Furniture",
  "Airport Screens",
  "Mall Displays",
  "Gas Station TVs",
  "Transit (bus, subway, rideshare, taxi)",
  "Cinema Screens",
  "Venue-based screens (gyms, bars, doctor’s offices, etc.)",
  "Retail / Point-of-Sale Screens",
  "Other",
];

const timingOptions = [
  "ASAP (within 2 weeks)",
  "This month",
  "Next 30–60 days",
  "Specific dates",
  "Flexible / Just planning",
];

export default function DoohCampaignRequestForm() {
  const [companyName, setCompanyName] = useState("");
  const [campaignType, setCampaignType] = useState("");
  const [campaignTypeOther, setCampaignTypeOther] = useState("");
  const [industry, setIndustry] = useState("");
  const [industryOther, setIndustryOther] = useState("");
  const [campaignGoals, setCampaignGoals] = useState([]);
  const [campaignGoalsOther, setCampaignGoalsOther] = useState("");
  const [budget, setBudget] = useState("");
  const [targetLocations, setTargetLocations] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [cities, setCities] = useState([]);
  const [zipCodes, setZipCodes] = useState("");
  const [dmaInput, setDmaInput] = useState("");
  const [dmas, setDmas] = useState([]);
  const [eventInput, setEventInput] = useState("");
  const [events, setEvents] = useState([]);
  const [specificVenues, setSpecificVenues] = useState("");
  const [customFile, setCustomFile] = useState(null);
  const [screenTypes, setScreenTypes] = useState([]);
  const [screenTypeOther, setScreenTypeOther] = useState("");
  const [timing, setTiming] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [creativeSupport, setCreativeSupport] = useState(false);
  const [demoSupport, setDemoSupport] = useState(false);

  const toggleArrayValue = (array, setArray, value) => {
    if (array.includes(value)) {
      setArray(array.filter((v) => v !== value));
    } else {
      setArray([...array, value]);
    }
  };

  const addCity = () => {
    if (cityInput.trim()) {
      setCities([...cities, cityInput.trim()]);
      setCityInput("");
    }
  };

  const removeCity = (index) => {
    setCities(cities.filter((_, i) => i !== index));
  };

  const addDma = () => {
    if (dmaInput.trim()) {
      setDmas([...dmas, dmaInput.trim()]);
      setDmaInput("");
    }
  };

  const removeDma = (index) => {
    setDmas(dmas.filter((_, i) => i !== index));
  };

  const addEvent = () => {
    if (eventInput.trim()) {
      setEvents([...events, eventInput.trim()]);
      setEventInput("");
    }
  };

  const removeEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setCustomFile(file || null);
  };

  const clearForm = () => {
    setCompanyName("");
    setCampaignType("");
    setCampaignTypeOther("");
    setIndustry("");
    setIndustryOther("");
    setCampaignGoals([]);
    setCampaignGoalsOther("");
    setBudget("");
    setTargetLocations([]);
    setCityInput("");
    setCities([]);
    setZipCodes("");
    setDmaInput("");
    setDmas([]);
    setEventInput("");
    setEvents([]);
    setSpecificVenues("");
    setCustomFile(null);
    setScreenTypes([]);
    setScreenTypeOther("");
    setTiming("");
    setStartDate("");
    setEndDate("");
    setCreativeSupport(false);
    setDemoSupport(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submission logic would go here
    console.log("Submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <h1 className="text-xl font-bold">DOOH Campaign Request Form</h1>

      {/* 1. Company Name */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Company Name</label>
        <div className="mt-2">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      {/* 2. Campaign Type */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Campaign Type</label>
        <div className="mt-2 grid grid-cols-1">
          <select
            value={campaignType}
            onChange={(e) => setCampaignType(e.target.value)}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option value="">Select option</option>
            {campaignTypeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
        </div>
        {campaignType === "Other" && (
          <div className="mt-2">
            <input
              type="text"
              value={campaignTypeOther}
              onChange={(e) => setCampaignTypeOther(e.target.value)}
              placeholder="Specify campaign type"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        )}
      </div>

      {/* 3. Industry */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Industry</label>
        <div className="mt-2 grid grid-cols-1">
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option value="">Select option</option>
            {industryOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
        </div>
        {industry === "Other" && (
          <div className="mt-2">
            <input
              type="text"
              value={industryOther}
              onChange={(e) => setIndustryOther(e.target.value)}
              placeholder="Specify industry type"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        )}
      </div>

      {/* 4. Campaign Goals */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Campaign Goals</label>
        <div className="mt-2 space-y-2">
          {campaignGoalOptions.map((goal) => (
            <div key={goal} className="flex gap-3">
              <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input
                    type="checkbox"
                    checked={campaignGoals.includes(goal)}
                    onChange={() => toggleArrayValue(campaignGoals, setCampaignGoals, goal)}
                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  />
                  <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white">
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-checked:opacity-100"
                    />
                  </svg>
                </div>
              </div>
              <label className="text-sm text-gray-900">{goal}</label>
            </div>
          ))}
        </div>
        {campaignGoals.includes("Other") && (
          <div className="mt-2">
            <input
              type="text"
              value={campaignGoalsOther}
              onChange={(e) => setCampaignGoalsOther(e.target.value)}
              placeholder="Specify campaign goals"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        )}
      </div>

      {/* 5. OOH Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-900">OOH Budget</label>
        <div className="mt-2 grid grid-cols-1">
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option value="">Select option</option>
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
        </div>
      </div>

      {/* 6. Target Location */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Target Location</label>
        <div className="mt-2 space-y-2">
          {targetLocationOptions.map((loc) => (
            <div key={loc} className="flex gap-3">
              <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input
                    type="checkbox"
                    checked={targetLocations.includes(loc)}
                    onChange={() => toggleArrayValue(targetLocations, setTargetLocations, loc)}
                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  />
                  <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white">
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-checked:opacity-100"
                    />
                  </svg>
                </div>
              </div>
              <label className="text-sm text-gray-900">{loc}</label>
            </div>
          ))}
        </div>

        {targetLocations.includes("City") && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-900">Enter Specific City</label>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="City, State"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              <button
                type="button"
                onClick={addCity}
                className="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
              >
                + Add city
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {cities.map((c, idx) => (
                <span key={idx} className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-1 text-sm text-indigo-700">
                  {c}
                  <button type="button" onClick={() => removeCity(idx)} className="ml-1 text-indigo-500">&times;</button>
                </span>
              ))}
            </div>
          </div>
        )}

        {targetLocations.includes("Zip Code") && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-900">Zip Codes</label>
            <div className="mt-2">
              <textarea
                value={zipCodes}
                onChange={(e) => setZipCodes(e.target.value)}
                placeholder="Enter multiple zip codes separated by commas"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        )}

        {targetLocations.includes("DMA") && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-900">DMA</label>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={dmaInput}
                onChange={(e) => setDmaInput(e.target.value)}
                placeholder="DMA code or name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              <button
                type="button"
                onClick={addDma}
                className="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
              >
                + Add record
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {dmas.map((d, idx) => (
                <span key={idx} className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-1 text-sm text-indigo-700">
                  {d}
                  <button type="button" onClick={() => removeDma(idx)} className="ml-1 text-indigo-500">&times;</button>
                </span>
              ))}
            </div>
          </div>
        )}

        {targetLocations.includes("Events / Conferences") && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-900">Events / Conferences</label>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={eventInput}
                onChange={(e) => setEventInput(e.target.value)}
                placeholder="Event name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              <button
                type="button"
                onClick={addEvent}
                className="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
              >
                + Add event
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {events.map((ev, idx) => (
                <span key={idx} className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-1 text-sm text-indigo-700">
                  {ev}
                  <button type="button" onClick={() => removeEvent(idx)} className="ml-1 text-indigo-500">&times;</button>
                </span>
              ))}
            </div>
          </div>
        )}

        {targetLocations.includes("Specific Venues") && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-900">Specific Venues</label>
            <div className="mt-2">
              <textarea
                value={specificVenues}
                onChange={(e) => setSpecificVenues(e.target.value)}
                placeholder="Enter venue details"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        )}

        {targetLocations.includes("Upload a Custom List") && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-900">Target Location Attachment</label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <div className="mt-4 flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" accept=".csv,.xlsx,.txt" className="sr-only" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                {customFile && <p className="text-xs text-gray-600 mt-2">{customFile.name}</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 7. Preferred Screen Types */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Preferred Screen Types</label>
        <div className="mt-2 space-y-2">
          {screenTypeOptions.map((st) => (
            <div key={st} className="flex gap-3">
              <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input
                    type="checkbox"
                    checked={screenTypes.includes(st)}
                    onChange={() => toggleArrayValue(screenTypes, setScreenTypes, st)}
                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  />
                  <svg fill="none" viewBox="0 0 14 14" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white">
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-checked:opacity-100"
                    />
                  </svg>
                </div>
              </div>
              <label className="text-sm text-gray-900">{st}</label>
            </div>
          ))}
        </div>
        {screenTypes.includes("Other") && (
          <div className="mt-2">
            <input
              type="text"
              value={screenTypeOther}
              onChange={(e) => setScreenTypeOther(e.target.value)}
              placeholder="Specify screen type"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        )}
      </div>

      {/* 8. Campaign Timing Preference */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Campaign Timing Preference</label>
        <div className="mt-2 grid grid-cols-1">
          <select
            value={timing}
            onChange={(e) => setTiming(e.target.value)}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option value="">Select option</option>
            {timingOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
        </div>
        {timing === "Specific dates" && (
          <div className="mt-2 flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900">Campaign Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900">Campaign End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        )}
      </div>

      {/* 9. Creative/Design Support */}
      <div className="flex items-center gap-3">
        <input
          id="creative-support"
          type="checkbox"
          checked={creativeSupport}
          onChange={(e) => setCreativeSupport(e.target.checked)}
          className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <label htmlFor="creative-support" className="text-sm font-medium text-gray-900">
          Do you need creative or design support for your ads?
        </label>
      </div>

      {/* 10. Demo / Planning Support */}
      <div className="flex items-center gap-3">
        <input
          id="demo-support"
          type="checkbox"
          checked={demoSupport}
          onChange={(e) => setDemoSupport(e.target.checked)}
          className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <label htmlFor="demo-support" className="text-sm font-medium text-gray-900">
          Would you like a demo or 1:1 campaign planning support?
        </label>
      </div>

      {/* Submit and Clear */}
      <div className="flex items-center justify-end gap-6">
        <button
          type="button"
          onClick={clearForm}
          className="text-sm font-semibold text-gray-900"
        >
          Clear form
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

