'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

const ACRONYMS = ['ATL', 'DFW', 'SF', 'NYC'];

function toTitleCase(s = '') {
  return s
    .split(' ')
    .map((word) => {
      const lettersOnly = word.replace(/[^a-zA-Z]/g, '');
      if (ACRONYMS.includes(lettersOnly.toUpperCase())) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export default function ConversationStarter({ className = '' }) {
  const [value, setValue] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef(null);

  const prompts = useMemo(
    () =>
      [
        'Digital billboards on I-405, Los Angeles',
        'Airport screens across Atlanta (ATL)',
        'Transit shelters across New York City',
        'Premium Times Square placements',
        'Malls across San Francisco Bay Area',
        'Freeway billboards around Dallas–Fort Worth (DFW)',
        'Gym & fitness networks in Chicago',
        'Conference venues during Dreamforce (SF)',
        'College-town screens around Boston',
      ].map(toTitleCase),
    []
  );

  const [phIndex, setPhIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhIndex((i) => (i + 1) % prompts.length), 2000);
    return () => clearInterval(t);
  }, [prompts.length]);

  const placeholder = `I want to buy ${prompts[phIndex]}`;

  function expandAndShow() {
    setExpanded(true);
    setShowPanel(true);
  }

  function onSubmit(e) {
    e?.preventDefault();
    expandAndShow();

    // The core fix: wrap the Intercom calls in a timeout.
    setTimeout(() => {
      if (typeof window !== 'undefined' && typeof window.Intercom === 'function') {
        // Boot Intercom if not already done.
        window.Intercom('boot', { app_id: 'p1go89tx' });
        
        // Show the messenger.
        window.Intercom('show');
        
        // Use a second, shorter timeout to send the message after the messenger is visible.
        setTimeout(() => {
          const msg = (value || placeholder).trim();
          if (msg) {
            window.Intercom('showNewMessage', msg);
            window.Intercom('trackEvent', 'hero_conversation_start', { query: msg });
          }
        }, 500); // 500ms delay to ensure the window is ready.
      }
    }, 50); // Small initial delay to ensure the event loop processes correctly.
  }

  return (
    <div className={`w-full ${className}`}>
      <div
        className={[
          'mx-auto transition-all duration-500 ease-out',
          expanded
            ? 'max-w-3xl md:max-w-4xl lg:max-w-5xl'
            : 'max-w-lg md:max-w-xl lg:max-w-2xl',
        ].join(' ')}
      >
        <div className="mb-4 text-center text-xl font-bold text-gray-900">
          Where do you want to advertise?
        </div>

        <form
          onSubmit={onSubmit}
          className="w-full rounded-2xl border bg-white/85 backdrop-blur border-zinc-200 shadow-sm transition focus-within:shadow-md"
          onClick={expandAndShow}
        >
          <div className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={expandAndShow}
              placeholder={placeholder}
              aria-label="Describe your DOOH campaign idea"
              className="flex-1 bg-transparent outline-none text-zinc-900 placeholder:text-zinc-500 text-base sm:text-lg"
            />

            <button
              type="submit"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-black transition active:scale-95"
              aria-label="Start"
              title="Start"
            >
              <ArrowUpIcon className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}