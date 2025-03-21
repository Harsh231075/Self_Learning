import React from 'react';
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from 'react-router-dom'
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto pt-16 pb-8 px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">EduAI</h3>
            <p className="text-gray-400 mb-4">
              Transforming education through AI-powered personalized learning experiences.
            </p>
            <div className="flex space-x-4">
              <Link to="https://www.instagram.com/harsh_singh_9685/?hl=en" target="_blank" rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <FaInstagram className="h-5 w-5" />
              </Link>
              <Link to="https://www.linkedin.com/in/harsh-singh-baghel/" target="_blank" rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <FaLinkedinIn className="h-5 w-5" />
              </Link>
              <Link to="/" target="_blank" rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <FaTwitter className="h-5 w-5" />
              </Link>
              <Link to="/" target="_blank" rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <FaFacebookF className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Courses</Link></li>
              <li><Link to="/leaderboard" className="text-gray-400 hover:text-white transition-colors">Leaderboard</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span>123 Learning Street, Education City, 12345</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5 text-blue-500" />
                <span>contact@eduai.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5 text-blue-500" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} EduAI. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}