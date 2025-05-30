"use client";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Hero() {
  const [text, setText] = useState('');
  const fullText = "AI-Powered Learning Platform for Your Future";
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [index]);

  const getReferralCode = () => {
    const params = new URLSearchParams(location.search);
    return params.get('ref');
  };

  const handleFeedback = () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      const refCode = getReferralCode();
      navigate(refCode ? `/sign-login?ref=${refCode}` : '/sign-login?');
    } else {
      navigate('/my-dashbaord');
    }

  };

  return (
    <div className="relative min-h-[85vh] w-full overflow-hidden bg-gradient-to-br from-blue-50 to-blue-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#ffffff_10%,_transparent_50%)] opacity-50"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[85vh] flex-col items-center justify-center text-center">
          <div className="max-w-4xl">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-800 sm:text-5xl md:text-6xl">
              {text}
              <span className="animate-blink">|</span>
            </h1>

            <p className="mb-8 text-lgtext-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse sm:text-xl md:text-2xl">
              Personalized learning paths, career guidance, and certification all in one place.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-xl hover:scale-105"
                onClick={handleFeedback}
              >
                Get Started
              </button>
              <button className="rounded-full border-2 border-blue-600 px-8 py-3 text-lg font-semibold text-blue-600 transition-all hover:bg-blue-50 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-300 opacity-40 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-400 opacity-40 blur-3xl"></div>
    </div>
  );
}
