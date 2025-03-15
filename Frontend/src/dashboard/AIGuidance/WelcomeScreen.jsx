"use client";
import React from "react";
import { Sparkles, BookOpen, Brain, Target, Star, Zap, Rocket } from "lucide-react";

export default function WelcomeScreen({ handleStart }) {
  return (
    <div className=" w-full bg-gradient-to-br from-blue-900 via-black to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0">
        <div className="absolute w-[500px] h-[500px] -top-20 -left-20 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] -bottom-20 -right-20 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative min-h-screen flex flex-col justify-center ">
        {/* Icon Section */}
        <div className="flex justify-center mb-6 sm:mb-10">
          <div className="relative">
            <div className="animate-bounce">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center">
                <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-white animate-pulse" />
              </div>
            </div>
            <div className="absolute -top-4 -right-4 animate-ping">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
            </div>
            <div className="absolute -bottom-4 -left-4 animate-bounce">
              <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 rotate-45" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8 text-center max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse px-4">
            AI-Powered Learning Journey
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed px-4">
            Embark on a revolutionary learning experience powered by advanced AI.
            Let's unlock your true potential together.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-4 max-w-2xl mx-auto mt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex items-center gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-white/20"
              >
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-sm sm:text-base text-white/90">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Start Button */}
          <div className="pt-6 sm:pt-10 px-4">
            <button
              onClick={handleStart}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white overflow-hidden rounded-xl sm:rounded-2xl transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <span className="relative flex items-center justify-center gap-2">
                Begin Your Journey
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: Brain,
    text: "AI-Driven Learning Paths"
  },
  {
    icon: Target,
    text: "Personalized Goals"
  },
  {
    icon: BookOpen,
    text: "Interactive Learning"
  },
  {
    icon: Star,
    text: "Progress Tracking"
  }
];