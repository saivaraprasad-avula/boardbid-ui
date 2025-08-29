'use client';
import React from 'react';

/**
 * Curved underline behind text.
 * Props:
 *  - color: underline color
 *  - thickness: stroke width (px)
 *  - offset: distance below baseline (px)
 *  - animate: draw the line on mount (true/false)
 */
export default function Highlight({
  children,
  className = '',
  color = '#0f172a',     // deep slate; works with your blue card
  thickness = 3,
  offset = 4,
  animate = false,
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden="true"
        className="absolute left-0 w-full"
        style={{ bottom: `-${offset}px`, height: `${Math.max(thickness * 3, 10)}px` }}
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        {/* gentle curve; tweak control points for different vibes */}
        <path
          d="M2,6 Q22,1 42,5 T98,5"
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={
            animate
              ? {
                  strokeDasharray: 120,
                  strokeDashoffset: 120,
                  animation: 'hl-draw 800ms ease-out forwards',
                }
              : undefined
          }
        />
      </svg>
      <style jsx>{`
        @keyframes hl-draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </span>
  );
}