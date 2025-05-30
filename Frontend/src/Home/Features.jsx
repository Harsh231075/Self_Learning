"use client";
import React from 'react';
import { Brain, Target, Trophy, Rocket, Users, GraduationCap } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Get personalized study plans and career guidance tailored to your learning style and goals.",
      color: "blue"
    },
    {
      icon: Target,
      title: "Track Progress",
      description: "Monitor your improvement with detailed analytics and insights to stay on track.",
      color: "green"
    },
    {
      icon: Trophy,
      title: "Compete & Achieve",
      description: "Join the leaderboard, earn rewards, and showcase your achievements to the world.",
      color: "yellow"
    },
    {
      icon: Rocket,
      title: "Fast Learning",
      description: "Accelerate your learning journey with AI-optimized study materials and practice tests.",
      color: "purple"
    },
    {
      icon: GraduationCap,
      title: "Get Certified",
      description: "Earn recognized certificates upon completing courses and passing assessments.",
      color: "red"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with peers, share knowledge, and learn together in our vibrant community.",
      color: "indigo"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-200"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elevate your learning experience with our powerful AI-driven features
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, description, color, delay }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 shadow-blue-100",
    green: "bg-green-100 text-green-600 shadow-green-100",
    yellow: "bg-yellow-100 text-yellow-600 shadow-yellow-100",
    purple: "bg-purple-100 text-purple-600 shadow-purple-100",
    red: "bg-red-100 text-red-600 shadow-red-100",
    indigo: "bg-indigo-100 text-indigo-600 shadow-indigo-100"
  };

  return (
    <div
      className="group relative bg-gradient-to-br from-blue-90 to-blue-300 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`flex items-center justify-center w-16 h-16 rounded-xl ${colorClasses[color]} transition-transform duration-300 group-hover:scale-110`}>
        <Icon className="h-8 w-8" />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-4 text-gray-600 leading-relaxed">
        {description}
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
    </div>
  );
}