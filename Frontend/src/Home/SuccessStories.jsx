"use client";
import React, { useEffect, useState } from 'react';

export default function SuccessStories() {
  const [position, setPosition] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/all-feedback`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setFeedbacks(data.feedbacks);
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        const newPosition = prev - 1;
        if (newPosition < -100) return 0;
        return newPosition;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-200 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600">
            See how our platform has transformed careers
          </p>
        </div>

        <div className="relative">
          {/* Desktop View */}
          <div className="hidden md:block">
            <div
              className="flex gap-6 transition-transform duration-300"
              style={{ transform: `translateX(${position}%)` }}
            >
              {[...feedbacks, ...feedbacks].map((feedback, index) => (
                <div
                  key={index}
                  className="min-w-[350px] bg-gradient-to-br from-blue-50 to-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={feedback.user.photo || '/default-avatar.png'}
                      alt={feedback.user.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{feedback.user.name}</h3>
                      <p className="text-gray-600">{new Date(feedback.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{feedback.feedback}"</p>
                  <div className="mt-4 flex">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            <div className="flex flex-col gap-6">
              {feedbacks.map((feedback, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={feedback.user.photo || '/default-avatar.png'}
                      alt={feedback.user.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{feedback.user.name}</h3>
                      <p className="text-gray-600">{new Date(feedback.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{feedback.feedback}"</p>
                  <div className="mt-4 flex">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}