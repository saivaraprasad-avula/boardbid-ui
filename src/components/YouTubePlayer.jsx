'use client';

import { useEffect, useRef } from 'react';

export default function YouTubePlayer({ videoId, title }) {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const readyRef = useRef(false);

  // Load the YouTube Iframe API once per page
  useEffect(() => {
    const API_SRC = 'https://www.youtube.com/iframe_api';

    // If API already loaded, init immediately
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    // If a loader is already present, poll until ready
    const existing = document.querySelector(`script[src="${API_SRC}"]`);
    if (existing) {
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

    // Hook global ready callback
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') prev();
      initPlayer();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initPlayer = () => {
    if (!iframeRef.current || (playerRef.current && readyRef.current)) return;

    playerRef.current = new window.YT.Player(iframeRef.current, {
      videoId,
      playerVars: {
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        showinfo: 0,
        iv_load_policy: 3,
        cc_load_policy: 1,
        vq: 'hd1080',
      },
      events: {
        onReady: (e) => {
          readyRef.current = true;
          tryRequestHD(e.target);
          setTimeout(() => tryRequestHD(e.target), 800);
          setTimeout(() => tryRequestHD(e.target), 2000);
        },
        onStateChange: (e) => {
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
    prefs.forEach((q, i) => {
      setTimeout(() => {
        try {
          player.setPlaybackQuality(q);
        } catch {}
      }, i * 50);
    });
  };

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
    <div className="relative overflow-hidden rounded-2xl ring-1 ring-gray-200 shadow-sm bg-white">
      <div className="aspect-video">
        <iframe
          ref={iframeRef}
          id={`yt-player-${videoId}`}
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&playsinline=1&showinfo=0&iv_load_policy=3&cc_load_policy=1&vq=hd1080`}
          title={title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
