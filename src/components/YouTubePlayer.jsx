'use client';

import { useEffect, useRef } from 'react';

const YT_API_SRC = 'https://www.youtube.com/iframe_api';

// Singleton loader: returns a Promise that resolves to window.YT
function loadYouTubeAPI() {
  if (typeof window === 'undefined') return Promise.reject(new Error('SSR'));

  // Reuse if already loaded
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);

  // Reuse existing in-flight promise
  if (window.__ytApiPromise) return window.__ytApiPromise;

  // Create a promise and expose it globally
  window.__ytApiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;

    // Register callback BEFORE injecting the script
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') prev();
      resolve(window.YT);
    };

    // If script tag already exists, don't add again
    const existing = document.querySelector(`script[src="${YT_API_SRC}"]`);
    if (!existing) {
      const s = document.createElement('script');
      s.src = YT_API_SRC;
      s.async = true;
      document.head.appendChild(s);
    } else {
      // Fallback: if script is cached & load event already fired, poll briefly
      const iv = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(iv);
          resolve(window.YT);
        }
      }, 50);
      setTimeout(() => clearInterval(iv), 8000);
    }
  });

  return window.__ytApiPromise;
}

export default function YouTubePlayer({ videoId, title }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeAPI()
      .then((YT) => {
        if (cancelled || !containerRef.current) return;

        // Create player (let API inject the <iframe/>)
        playerRef.current = new YT.Player(containerRef.current, {
          videoId,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            iv_load_policy: 3,
            cc_load_policy: 1,
            vq: 'hd1080',
          },
          events: {
            onReady: (e) => {
              // Politely ask for HD
              tryRequestHD(e.target);
              setTimeout(() => tryRequestHD(e.target), 800);
              setTimeout(() => tryRequestHD(e.target), 2000);
            },
            onStateChange: (e) => {
              if (e.data === YT.PlayerState.PLAYING) {
                tryRequestHD(e.target);
              }
            },
          },
        });
      })
      .catch(() => { /* ignore SSR / load issues */ });

    return () => {
      cancelled = true;
      try {
        if (playerRef.current?.destroy) playerRef.current.destroy();
      } catch {}
      playerRef.current = null;
    };
  }, [videoId]);

  const tryRequestHD = (player) => {
    if (!player || typeof player.setPlaybackQuality !== 'function') return;
    const prefs = ['highres', 'hd2160', 'hd1440', 'hd1080', 'hd720', 'large'];
    prefs.forEach((q, i) => {
      setTimeout(() => {
        try { player.setPlaybackQuality(q); } catch {}
      }, i * 50);
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl ring-1 ring-gray-200 shadow-sm bg-white">
      <div className="aspect-video">
        {/* Let YT API inject the iframe into this container */}
        <div
          ref={containerRef}
          title={title}
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}