import React, { useState } from "react";
import { Home, Brain, Trophy, Settings, LogOut, X, Menu, User, MessageCircle } from "lucide-react";
import Dashboard from "./Dashboard";
import StudyPlan from "./StudyPlan";
import Leaderboard from "./Leaderboard";
import { useUser } from '../hooks/useUser';
import ProfilePage from "./ProfilePage";
import ChatBox from "../ChatBot/ChatBox"
import { useNavigate, Link } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Dashboard", component: <Dashboard /> },
  { icon: Brain, label: "Study Plan", component: <StudyPlan /> },
  { icon: Trophy, label: "Leaderboard", component: <Leaderboard /> },
  { icon: MessageCircle, label: "chatbot", component: <ChatBox /> },
  { icon: Settings, label: "Settings", component: <ProfilePage /> },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(<Dashboard />);
  const navigate = useNavigate();
  const { logout } = useUser();

  const handleLogout = () => {
    // Clear all local storage items
    localStorage.clear();

    // Use context logout function
    logout();

    // Dispatch token update event
    window.dispatchEvent(new Event("tokenUpdated"));

    // Force a page reload after navigation
    navigate("/", { replace: true });
    window.location.reload();
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Top Navbar */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-lg border-b border-gray-200 flex items-center justify-between px-6 py-4 z-50">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Self Learning
          </span>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-all duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static lg:flex lg:flex-col border-r border-gray-200`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between">
              <Link to='/' className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Self Learning
                  </span>
                  <p className="text-xs text-gray-500 hidden lg:block">Learn • Grow • Excel</p>
                </div>
              </Link>

              <button
                onClick={toggleSidebar}
                className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* User Profile Section */}
          {/* <div className="p-6 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-md">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Welcome back!</h3>
                <p className="text-sm text-gray-500">Ready to learn today?</p>
              </div>
            </div>
          </div> */}

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
                Navigation
              </p>
            </div>

            {menuItems.map((item, index) => (
              <div
                key={item.label}
                className={`group relative flex items-center space-x-4 px-4 py-4 rounded-xl cursor-pointer transition-all duration-200 ${activeComponent.type === item.component.type
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm border border-blue-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                onClick={() => {
                  setActiveComponent(item.component);
                  setIsSidebarOpen(false);
                }}
              >
                {/* Active indicator */}
                {activeComponent.type === item.component.type && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full" />
                )}

                <div className={`p-2 rounded-lg transition-colors ${activeComponent.type === item.component.type
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                  : "bg-gray-100 group-hover:bg-gray-200"
                  }`}>
                  <item.icon className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <span className="font-medium">{item.label}</span>
                  {activeComponent.type === item.component.type && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto opacity-75" />
                  )}
                </div>
              </div>
            ))}
          </nav>

          {/* Stats Section */}
          <div className="p-4 mx-4 mb-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-green-800">Study Streak</p>
                <p className="text-2xl font-bold text-green-600">7 days</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl w-full transition-all duration-200 group"
            >
              <div className="p-2 bg-gray-100 group-hover:bg-red-100 rounded-lg transition-colors">
                <LogOut className="h-5 w-5" />
              </div>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6 lg:p-8 pt-20 lg:pt-8 min-h-full">
          <div className="max-w-7xl mx-auto">
            {activeComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;