import React, { useState, useEffect } from 'react';
import { Trophy, Brain, Users, Award } from 'lucide-react';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/get-user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="animate-spin text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-purple-300" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Learning Leaders</h1>
          </div>
          <p className="text-purple-200 text-base sm:text-lg">Top performers in our learning community</p>
        </div>

        {/* Leaderboard */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-xl">
          {leaderboardData?.users.map((user, index) => (
            <div
              key={user._id}
              className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-3 sm:p-4 ${index !== leaderboardData.users.length - 1 ? 'border-b border-purple-700/30' : ''
                } hover:bg-white/5 transition-all rounded-lg`}
            >
              {/* Rank + Image + Name */}
              <div className="flex items-center w-full sm:w-auto gap-3 sm:gap-4">
                {/* Rank */}
                <div className="flex-shrink-0 w-10 sm:w-12 text-center">
                  {index === 0 ? (
                    <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mx-auto" />
                  ) : index === 1 ? (
                    <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300 mx-auto" />
                  ) : index === 2 ? (
                    <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mx-auto" />
                  ) : (
                    <span className="text-xl sm:text-2xl font-bold text-purple-300">{index + 1}</span>
                  )}
                </div>

                {/* User Image */}
                <div className="relative flex-shrink-0">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-purple-500"
                  />
                </div>

                {/* User Name */}
                <div className="flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">{user.name}</h3>
                </div>
              </div>

              {/* Points */}
              <div className="flex-shrink-0 text-center sm:text-right">
                <span className="text-xl sm:text-2xl font-bold text-purple-300">
                  {user.rank}
                </span>
                <p className="text-purple-400 text-xs sm:text-sm">points</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-6 h-6 text-purple-300" />
              <h3 className="text-purple-300 text-base sm:text-lg">Total Users</h3>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {leaderboardData?.stats.totalUsers}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-6 h-6 text-purple-300" />
              <h3 className="text-purple-300 text-base sm:text-lg">Total Certificates</h3>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {leaderboardData?.stats.totalCertificates}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;