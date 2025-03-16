import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn
} from 'react-icons/fa';
import { useUser } from '../hooks/useUser';

export default function SocialShare() {
  const { user, loading } = useUser(); // Use the context
  // console.log(user);
  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      Loading...
    </div>;
  }
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const websiteUrl = `${window.location.origin}/?ref=${user.referral}`;

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=Join our learning platform using my referral link: ${websiteUrl}`,
    instagram: `https://www.instagram.com/share?url=${websiteUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${websiteUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=Join our learning platform using my referral link: ${websiteUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${websiteUrl}`
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(websiteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        <Share2 className="h-4 w-4" />
        Share & Earn
      </button>

      {showShareMenu && (
        <div className="absolute right-0 top-12 z-50 w-72 rounded-lg bg-white p-4 shadow-lg border">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Share your referral link</h3>
            <p className="text-xs text-gray-500 mt-1">Earn 10 points for each signup!</p>
          </div>

          <div className="grid grid-cols-5 gap-4 mb-4">
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-green-500"
            >
              <FaWhatsapp className="h-6 w-6" />
              <span className="text-xs">WhatsApp</span>
            </a>
            <a
              href={shareLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-pink-500"
            >
              <FaInstagram className="h-6 w-6" />
              <span className="text-xs">Instagram</span>
            </a>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600"
            >
              <FaFacebookF className="h-6 w-6" />
              <span className="text-xs">Facebook</span>
            </a>
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-400"
            >
              <FaTwitter className="h-6 w-6" />
              <span className="text-xs">Twitter</span>
            </a>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-700"
            >
              <FaLinkedinIn className="h-6 w-6" />
              <span className="text-xs">LinkedIn</span>
            </a>
          </div>

          <div className="flex gap-2 items-center bg-gray-50 rounded-lg p-2">
            <input
              type="text"
              value={websiteUrl}
              readOnly
              className="flex-1 text-sm bg-transparent outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-md hover:bg-gray-200"
              title={copied ? "Copied!" : "Copy link"}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}