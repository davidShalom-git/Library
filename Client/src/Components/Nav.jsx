import React, { useState } from 'react';
import { SignInButton, useAuth, UserButton } from '@clerk/clerk-react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { isSignedIn } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Library', path: '/lib' },
    { name: 'UserBooks', path: '/user-books' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl bg-slate-950/90 backdrop-blur-xl rounded-2xl shadow-2xl px-8 py-4 z-50 border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* Enhanced Logo */}
        <Link 
          to="/" 
          className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
        >
          Book World
        </Link>

        {/* Enhanced Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map(({ name, path }) => (
            <li key={name}>
              <Link
                to={path}
                className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive(path)
                    ? 'text-white bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {name}
                {isActive(path) && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Enhanced Right Section */}
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <div className="hover:scale-105 transition-transform duration-200">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full ring-2 ring-purple-400/50 hover:ring-purple-400 transition-all"
                  }
                }}
              />
            </div>
          ) : (
            <div className="hover:scale-105 transition-transform duration-200">
              <SignInButton>
                <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 border border-purple-500/20">
                  Sign In
                </button>
              </SignInButton>
            </div>
          )}
          
          {/* Enhanced Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Nav Slide-In */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-gradient-to-br from-slate-950/95 via-gray-900/95 to-slate-950/95 backdrop-blur-xl rounded-b-2xl shadow-2xl border border-white/10 border-t-0 transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 py-6' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col items-center gap-4 text-sm font-medium">
          {navItems.map(({ name, path }) => (
            <li key={name} className="w-full text-center">
              <Link
                to={path}
                className={`block py-3 px-6 mx-4 rounded-xl transition-all duration-300 ${
                  isActive(path)
                    ? 'text-white bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </Link>
            </li>
          ))}
          
          {/* Mobile Auth Section */}
          <li className="w-full text-center pt-4 border-t border-white/10 mx-4">
            {isSignedIn ? (
              <div className="flex justify-center">
                <UserButton />
              </div>
            ) : (
              <SignInButton>
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg">
                  Sign In
                </button>
              </SignInButton>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;