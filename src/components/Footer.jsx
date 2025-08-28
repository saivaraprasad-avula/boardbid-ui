// src/components/Footer.jsx
import { Link } from 'react-router-dom';

const navigation = {
  support: [
    { name: 'Submit ticket', href: '/contact' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  social: [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/boardbid-ai',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M20 2H4C3.447 2 3 2.447 3 3v18c0 .553.447 1 1 1h16c.553 0 1-.447 1-1V3c0-.553-.447-1-1-1zM9 18H6V9h3v9zm-1.5-10.2c-.966 0-1.75-.79-1.75-1.8 0-1.01.784-1.8 1.75-1.8s1.75.79 1.75 1.8c0 1.01-.784 1.8-1.75 1.8zM18 18h-3v-4.8c0-1.14-.024-2.6-1.8-2.6-1.8 0-2.2 1.2-2.2 2.5V18h-3V9h2.9v1.2h.04c.4-.76 1.38-1.56 2.84-1.56 3.02 0 3.72 2 3.72 4.6V18z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@boardbid',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pb-16 sm:pb-24 lg:px-8 lg:pb-32">
        <div className="border-t border-white/10 pt-12 xl:grid xl:grid-cols-3 xl:gap-8">
          <img
            alt="BoardBid.ai Logo"
            src="https://ik.imagekit.io/boardbid/BoardBid%20logo-White.avif"
            className="h-8"
          />
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm/6 font-semibold font-sans text-white">Support</h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-sm/6 text-gray-400 hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm/6 font-semibold font-sans text-white">Company</h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-sm/6 text-gray-400 hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm/6 font-semibold font-sans text-white">Legal</h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-sm/6 text-gray-400 hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex gap-x-6 md:order-2">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-white">
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm/6 text-gray-400 md:order-1 md:mt-0">
            &copy; 2025 BoardBid, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

