import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-lg text-sm font-medium ${
      pathname === path
        ? 'bg-emerald-100 text-emerald-700'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <aside className="w-full sm:w-60 bg-white border-r h-screen fixed top-0 left-0 pt-24 px-4 z-40 shadow-sm">
      <nav className="space-y-3 mt-2 sm:mt-6">
        <Link to="/dashboard" className={linkClass('/dashboard')}>🏠 Dashboard</Link>
        <Link to="/upload-creative" className={linkClass('/upload-creative')}>🎨 Upload Creative</Link>
        <Link to="/campaign/new" className={linkClass('/campaign/new')}>📢 New Campaign</Link>
        <Link to="/reports" className={linkClass('/reports')}>📊 Reports</Link>
      </nav>

      <div className="absolute bottom-6 w-full px-4">
        <a
          href="/admin"
          className="flex items-center text-sm font-medium text-gray-600 hover:text-emerald-600"
        >
          🛠️ Admin
        </a>
      </div>
    </aside>
  );
}
