'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

const ACRONYMS = ['ATL', 'DFW', 'SF', 'NYC'];

// Title Case without breaking acronyms inside parentheses
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
  const [expanded, setExpanded] = useState(false); // controls width animation
  const inputRef = useRef(null);

  // 9 US prompts (normalized)
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

  // Rotate placeholder every 2s
  const [phIndex, setPhIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhIndex((i) => (i + 1) % prompts.length), 2000);
    return () => clearInterval(t);
  }, [prompts.length]);

  const placeholder = prompts[phIndex];

  function openIntercomWith(text) {
    const msg = (text || '').trim();
    if (!msg) return;

    function attemptOpen(retries = 10) {
      const ready =
        typeof window !== 'undefined' &&
        typeof window.Intercom === 'function' &&
        (window.Intercom.booted || window.Intercom('booted'));

      if (ready) {
        window.Intercom('showNewMessage', msg);
        window.Intercom('trackEvent', 'hero_conversation_start', { query: msg });
      } else if (retries > 0) {
        setTimeout(() => attemptOpen(retries - 1), 100);
      } else if (typeof window !== 'undefined') {
        alert('Opening chat… (ensure Intercom snippet is loaded)');
      }
    }

    attemptOpen();
  }

  function expandAndShow() {
    setExpanded(true);
    setShowPanel(true);
  }

  function onSubmit(e) {
    e?.preventDefault();
    expandAndShow();
    openIntercomWith(value || placeholder);
  }

  function onChipClick(text) {
    setValue(text);
    setTimeout(() => openIntercomWith(text), 25);
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Animated width wrapper */}
      <div
        className={[
          'mx-auto transition-all duration-500 ease-out',
          // Initial: ~20–25% wider; Expanded: wide
          expanded
            ? 'max-w-3xl md:max-w-4xl lg:max-w-5xl'
            : 'max-w-lg md:max-w-xl lg:max-w-2xl',
        ].join(' ')}
      >
        {/* Input */}
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

            {/* Vertically up arrow button */}
            <button
              type="submit"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-black transition active:scale-95"
              aria-label="Start"
              title="Start"
            >
              <ArrowUpIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="px-5 pb-4 text-sm text-zinc-600">
            Start campaign planning with a simple conversation.
          </div>
        </form>
      </div>

      {/* 3×3 suggestion tiles — shown once focused/clicked */}
      {showPanel && (
        <div
          className={[
            'mx-auto mt-5 transition-all duration-500 ease-out',
            expanded
              ? 'max-w-3xl md:max-w-4xl lg:max-w-5xl'
              : 'max-w-lg md:max-w-xl lg:max-w-2xl',
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3',
          ].join(' ')}
        >
          {prompts.map((p, i) => (
            <button
              key={i}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onChipClick(p)}
              className="
                flex items-center justify-center text-center
                rounded-xl border
                border-[#bfd0e4]
                bg-[#e7eff8] hover:bg-[#dde8f5]
                text-[#1f2937] font-medium
                h-20 px-4 text-sm sm:text-[15px]
                shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset]
                transition
              "
            >
              <span className="line-clamp-2">{p}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}