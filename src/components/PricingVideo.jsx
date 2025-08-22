'use client';

import { useEffect, useRef } from 'react';

export default function PricingVideo() {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const readyRef = useRef(false);

  // Load the YouTube Iframe API once per page
  useEffect(() => {
    const API_SRC = 'https://www.youtube.com/iframe_api';

    // Already loaded?
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    // If a loader is already in the DOM, wait for it to finish
    const existing = document.querySelector(`script[src="${API_SRC}"]`);
    if (existing) {
      // Poll a few times until YT is ready
      const iv = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(iv);
          initPlayer();
        }
      }, 100);
      // Safety timeout
      setTimeout(() => clearInterval(iv), 8000);
      return;
    }

    // Inject script
    const tag = document.createElement('script');
    tag.src = API_SRC;
    tag.async = true;
    document.body.appendChild(tag);

    // Hook the global ready (YT calls this)
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') prev();
      initPlayer();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize player
  const initPlayer = () => {
    if (!iframeRef.current || (playerRef.current && readyRef.current)) return;

    playerRef.current = new window.YT.Player(iframeRef.current, {
      // Player vars must be duplicated here (they override URL params)
      playerVars: {
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        showinfo: 0,
        iv_load_policy: 3,
        cc_load_policy: 1,
        // Start with a strong hint; YT may still adapt down
        vq: 'hd1080',
      },
      events: {
        onReady: (e) => {
          readyRef.current = true;
          // Request HD on ready
          tryRequestHD(e.target);
          // Try again shortly after metadata loads/bitrate stabilizes
          setTimeout(() => tryRequestHD(e.target), 800);
          setTimeout(() => tryRequestHD(e.target), 2000);
        },
        onStateChange: (e) => {
          // When playback actually starts, push quality again
          if (e.data === window.YT.PlayerState.PLAYING) {
            tryRequestHD(e.target);
          }
        },
      },
    });
  };

  // Politely but firmly ask for HD (with graceful fallbacks)
  const tryRequestHD = (player) => {
    if (!player || typeof player.setPlaybackQuality !== 'function') return;
    const prefs = ['highres', 'hd2160', 'hd1440', 'hd1080', 'hd720', 'large'];
    // Call a couple times—YT may ignore the first request pre-buffer
    prefs.forEach((q, i) => {
      setTimeout(() => {
        try {
          player.setPlaybackQuality(q);
        } catch {}
      }, i * 50);
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        if (playerRef.current && typeof playerRef.current.destroy === 'function') {
          playerRef.current.destroy();
        }
      } catch {}
      playerRef.current = null;
      readyRef.current = false;
    };
  }, []);

  return (
    <section aria-labelledby="pricing-video" className="mx-auto mt-16 max-w-4xl">
      <h3 id="pricing-video" className="sr-only">
        How pricing works (video)
      </h3>

      <div className="relative overflow-hidden rounded-2xl ring-1 ring-gray-200 shadow-sm bg-white">
        <div className="aspect-video">
          {/* NOTE: enablejsapi=1 is required for Player API control */}
          <iframe
            ref={iframeRef}
            id="pricing-video-yt"
            src="https://www.youtube.com/embed/pBG1pxlcyS8?enablejsapi=1&rel=0&modestbranding=1&playsinline=1&showinfo=0&iv_load_policy=3&cc_load_policy=1&vq=hd1080"
            title="BoardBid.ai — How CPM Pricing Works"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>

      <p className="mt-3 text-center text-sm text-gray-500">
        What is CPM in 45 seconds: a quick overview of how our pricing works
      </p>
    </section>
  );
}