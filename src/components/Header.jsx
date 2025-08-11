import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react';

export default function Header({ staticHeader = false }) {
  const headerRef = useRef(null);

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
      <Link to="/dashboard" className="flex items-center">
        <img
          src="https://ik.imagekit.io/boardbid/BoardBid%20logo.svg"
          alt="BoardBid Logo"
          className="h-8 sm:h-8 mt-1"
        />
      </Link>

      <nav className="space-x-6 text-sm font-semibold text-gray-700">
        <Link to="/blogs" className="hover:text-emerald-600 transition">Blog</Link>
        <SignedOut>
          <SignInButton mode="modal" afterSignInUrl="/dashboard">
            <button className="hover:text-emerald-600 transition">Login</button>
          </SignInButton>
          <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
            <button className="hover:text-emerald-600 transition">Sign Up</button>
          </SignUpButton>
        </SignedOut>
          <SignedIn>
            <Link to="/dashboard" className="hover:text-emerald-600 transition">Dashboard</Link>
            <UserButton
              afterSignOutUrl="/"
              userProfileMode="navigation"
              userProfileUrl="/account"
            />
          </SignedIn>
        </nav>
      </header>
    );
  }
