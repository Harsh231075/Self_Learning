import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Get referral code from current URL
  const getReferralCode = () => {
    const params = new URLSearchParams(location.search);
    return params.get('ref');
  };

  // Handle navigation with referral code
  const handleNavigation = (path) => {
    const refCode = getReferralCode();
    navigate(refCode ? `${path}?ref=${refCode}` : path);
  };

  // ... existing scroll effect ...

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gradient-to-br from-blue-50 to-blue-200' : 'bg-blue-200'}`}>
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavigation('/')}
            className={`text-2xl font-bold ${scrolled ? 'text-blue-600' : 'text-blue-600'}`}
          >
            Self Learning
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/')}
              className={`font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-blue-600 hover:text-blue-700'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('/leaderboard')}
              className={`font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-blue-600 hover:text-blue-700'}`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => handleNavigation('/about')}
              className={`font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-blue-600 hover:text-blue-700'}`}
            >
              About
            </button>

            {token ? (
              <button
                onClick={() => navigate("/my-dashbaord")}
                className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => handleNavigation("/sign-login")}
                className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg"
              >
                Sign Up
              </button>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-gray-700' : 'text-blue-600'
              }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className={`px-4 pt-2 pb-4 space-y-3 ${scrolled ? 'bg-white' : 'bg-white/90 backdrop-blur-md'
              }`}>
              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                to="/leaderboard"
                className="block px-3 py-2 text-base font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600"
              >
                Leaderboard
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-base font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600"
              >
                About
              </Link>
              {token ? (
                <button
                  onClick={() => navigate("/my-dashbaord")}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={() => navigate("/sign-login")}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;