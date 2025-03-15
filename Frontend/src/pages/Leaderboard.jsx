
import Navbar from '../Home/Navbar'

import React, { useState, useEffect } from 'react';
import { Trophy, Brain, Users, Award, Crown, Star } from 'lucide-react';
import { motion } from 'framer-motion';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/get-user`
      );
      const data = await response.json();
      setLeaderboardData(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-8 bg-gradient-to-br from-blue-50 to-blue-200 py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block p-3 bg-white rounded-full shadow-lg mb-6"
            >
              <Brain className="w-12 h-12 text-blue-600" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              AI Learning Champions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet our top learners who are mastering AI-powered personalized education
            </p>
          </div>

          {/* Leaderboard Grid */}
          <div className="grid gap-6 mb-12">
            {leaderboardData?.users.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-6">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-16 text-center">
                    {index < 3 ? (
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${index === 0 ? 'bg-yellow-100' :
                        index === 1 ? 'bg-gray-100' :
                          'bg-orange-100'
                        }`}>
                        <Crown className={`w-6 h-6 ${index === 0 ? 'text-yellow-500' :
                          index === 1 ? 'text-gray-500' :
                            'text-orange-500'
                          }`} />
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                      />
                      {index < 3 && (
                        <div className="absolute -top-2 -right-2">
                          <Star className="w-6 h-6 text-yellow-400 fill-current" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name and Points */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="w-4 h-4" />
                      <span>{user.rank} learning points</span>
                    </div>
                  </div>

                  {/* Achievement Badge */}
                  <div className="hidden md:block">
                    <div className="px-4 py-2 bg-blue-50 rounded-full">
                      <span className="text-blue-600 font-medium">
                        {index === 0 ? 'Grand Master' :
                          index === 1 ? 'Expert' :
                            index === 2 ? 'Professional' : 'Learner'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
            >
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Active Learners</h3>
              <p className="text-3xl font-bold text-blue-600">
                {leaderboardData?.stats.totalUsers}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
            >
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Certifications Earned</h3>
              <p className="text-3xl font-bold text-blue-600">
                {leaderboardData?.stats.totalCertificates}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Leaderboard;