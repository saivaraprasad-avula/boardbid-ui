import { useEffect, useRef, useState } from 'react';
import { isLoggedIn, logOut } from '../utils/auth';

export default function Header({ staticHeader = false }) {
  const headerRef = useRef(null);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  useEffect(() => {
    if (staticHeader) {
      const header = headerRef.current;
      if (header) {
        header.classList.remove('-translate-y-4', 'opacity-0', 'pointer-events-none');
        header.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      }
      return;
    }

    const header = headerRef.current;
    const handleScroll = () => {
      if (!header) return;
      const scrollY = window.scrollY;
      if (scrollY > window.innerHeight * 0.8) {
        header.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
        header.classList.remove('opacity-0', '-translate-y-4', 'pointer-events-none');
      } else {
        header.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
        header.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [staticHeader]);

  return (
    <header
      ref={headerRef}
      id="sticky-header"
      className="fixed top-0 left-0 right-0 w-full h-20 bg-white/90 backdrop-blur z-50 shadow-md px-6 flex justify-between items-center transform -translate-y-4 opacity-0 pointer-events-none transition-all duration-500"
    >
      <a href="/dashboard" className="flex items-center">
        <img
          src="https://ik.imagekit.io/boardbid/logo-optimized.avif?updatedAt=1748049683476"
          alt="BoardBid Logo"
          className="h-14 sm:h-16 mt-1"
        />
      </a>

      <nav className="space-x-6 text-sm font-semibold text-gray-700">
        {loggedIn ? (
          <>
            <a href="/dashboard" className="hover:text-emerald-600 transition">Dashboard</a>
            <button
              onClick={() => {
                logOut();
                window.location.href = '/';
              }}
              className="text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <a href="/login" className="hover:text-emerald-600 transition">Login</a>
        )}
      </nav>
    </header>
  );
}
