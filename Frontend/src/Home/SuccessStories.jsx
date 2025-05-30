"use client";
import React, { useEffect, useState, useRef } from 'react';

export default function SuccessStories() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      console.log("feedback")
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
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      let scrollPos = 0;
      const totalWidth = scrollContainer.scrollWidth;
      setScrollWidth(totalWidth);

      const scroll = () => {
        scrollPos -= 1;
        if (Math.abs(scrollPos) >= totalWidth / 2) {
          scrollPos = 0;
        }
        scrollContainer.style.transform = `translateX(${scrollPos}px)`;
        requestAnimationFrame(scroll);
      };

      const animation = requestAnimationFrame(scroll);
      return () => cancelAnimationFrame(animation);
    }
  }, [feedbacks]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="py-20 bg-gradient-to-br from-blue-50 to-blue-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600">Be the first to share your success story!</p>
        </div>
      </div>
    );
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

        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-6 transition-transform duration-300"
            style={{ width: `${scrollWidth * 2}px` }}
          >
            {[...feedbacks, ...feedbacks, ...feedbacks].map((feedback, index) => (
              <div
                key={index}
                className="min-w-[300px] md:min-w-[350px] bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={feedback.user.photo || '/default-avatar.png'}
                    alt={feedback.user.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{feedback.user.name}</h3>
                    {/* <p className="text-gray-500 text-sm">
                      {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p> */}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex mb-2">
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
                  <p className="text-gray-600 italic">"{feedback.feedback}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}