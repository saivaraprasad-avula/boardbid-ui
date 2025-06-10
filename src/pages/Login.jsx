// src/pages/Login.jsx
import { useState } from 'react';
import { logIn } from '../utils/auth.js';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert('Please enter an email');
    logIn(email);
    navigate('/dashboard'); // change this to your actual dashboard route
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 sm:p-10 max-w-md w-full animate-fadeIn">
        <div className="mb-6 text-center">
          <img
            src="https://ik.imagekit.io/boardbid/logo-optimized.avif?updatedAt=1748049683476"
            alt="BoardBid Logo"
            className="h-[80px] mx-auto"
          />
          <p className="text-gray-500 text-sm mt-1">Login to your advertiser account</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input type="checkbox" className="form-checkbox text-emerald-500 rounded" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-sm text-emerald-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-semibold shadow"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          New here?{' '}
          <a href="mailto:founders@boardbid.ai" className="text-emerald-600 hover:underline">
            Request Access
          </a>
        </p>
      </div>
    </div>
  );
}
