import React, { useState } from "react";
import { Home, Brain, Trophy, Settings, LogOut, X, Menu } from "lucide-react";
import Dashboard from "./Dashboard";
import StudyPlan from "./StudyPlan";
import Leaderboard from "./Leaderboard";
import { useUser } from '../hooks/useUser';
import ProfilePage from "./ProfilePage";
import { useNavigate, Link } from "react-router-dom";


const menuItems = [
  { icon: Home, label: "Dashboard", component: <Dashboard /> },
  { icon: Brain, label: "Study Plan", component: <StudyPlan /> },
  { icon: Trophy, label: "Leaderboard", component: <Leaderboard /> },
  { icon: Settings, label: "Settings", component: <ProfilePage /> },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(<Dashboard />); // Default Dashboard
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
    <div className="flex h-screen">
      {/* 🔹 Mobile Top Navbar */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between px-4 py-3 z-50">
        <button onClick={toggleSidebar} className="text-gray-600">
          <Menu className="h-6 w-6" />
        </button>
        <span className="text-lg font-bold text-gray-900">Self Learning </span>
      </div>

      {/* 🔹 Sidebar (Fixed on Desktop) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static lg:flex lg:flex-col`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b flex items-center justify-between lg:hidden">
            <Link to='/'>
              <span className="text-xl font-bold">Self Learning</span>
            </Link>

            <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer ${activeComponent.type === item.component.type
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => {
                  setActiveComponent(item.component);
                  setIsSidebarOpen(false); // Mobile pe close ho
                }}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Main Content (Scrollable) */}
      <div className="flex-1 overflow-auto p-6 lg:p-8 pt-16">{activeComponent}</div>
    </div>
  );
};

export default Sidebar;
