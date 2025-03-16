import React, { useState } from 'react';
import { Bot, Send, Star, ThumbsUp, MessageSquare, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function Feedback({ onClose }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rate: rating,
          text: feedback
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose?.();
        }, 2000);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full text-center text-white">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-16 h-16 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p className="text-gray-200 mb-6">Your feedback helps us improve our AI learning platform.</p>
          <Link to="/my-dashbaord">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <Bot className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">AI Learning Feedback</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2">How would you rate your learning experience?</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-2 rounded-lg transition-all ${rating >= star ? 'text-yellow-400' : 'text-gray-400'
                    }`}
                >
                  <Star className="w-8 h-8" fill={rating >= star ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <ThumbsUp className="w-5 h-5" />
              <span>What did you like most?</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MessageSquare className="w-5 h-5" />
              <span>How can we improve?</span>
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-32 px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Share your thoughts with us..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {isLoading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;