"use client";
import React, { useState } from "react";
import { Award, Edit, X } from "lucide-react";
import StatCard from "./StatCard";
import EditProfileModal from "./EditProfileModal";
import SocialShare from './SocialShare';
import { useUser } from '../hooks/useUser'; // Add this import

export default function ProfilePage() {
  const [showLargephoto, setShowLargephoto] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { user, loading } = useUser(); // Use the context

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      Loading...
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {showLargephoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setShowLargephoto(false)}
        >
          <div className="relative max-w-2xl rounded-lg bg-white p-2">
            <button
              className="absolute right-2 top-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => setShowLargephoto(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={user.photo}
              alt={user.name}
              className="w-96 h-96 rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl">
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="flex flex-col items-center md:flex-row md:gap-6">
              <div
                className="relative cursor-pointer"
                onClick={() => setShowLargephoto(true)}
              >
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-gray-300 shadow-md transition-transform hover:scale-105 md:h-32 md:w-32">
                  <img
                    src={user.photo
                    }
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <h1 className="mt-4 text-center text-3xl font-bold md:mt-0 md:text-left md:text-4xl">
                {user.name}
              </h1>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row md:mt-0">
              <SocialShare referralCode={user.refferal} />
              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard
            title="Referrals"
            value={user.total_referral || 0}
            bgColor="bg-blue-100"
          />
          <StatCard
            title="Certifications"
            value={user.cartificate
              ?.length || 0}
            bgColor="bg-green-100"
          />
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Certifications</h2>
          <div className="space-y-4">
            {user.cartificate && user.cartificate.length > 0 ? (
              user.cartificate.map((cert, index) => (
                <div key={index} className="group">
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors">
                    <Award className="h-6 w-6 flex-shrink-0 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{cert.courseName}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                        <p className="text-sm text-gray-500">
                          Completed on: {new Date(cert.Date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-blue-600">
                          By: {cert.userName}
                        </p>
                      </div>
                    </div>
                  </div>
                  {index < user.cartificate.length - 1 && (
                    <div className="h-px bg-gray-200 mx-4" />
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                No certifications yet
              </div>
            )}
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}