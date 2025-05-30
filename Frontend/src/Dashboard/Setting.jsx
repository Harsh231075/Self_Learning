import React, { useState } from "react";
const Settings = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
      {/* <div className="lg:hidden bg-white shadow-sm p-4">
        <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
          <Menu className="h-6 w-6" />
        </button>
      </div> */}
      <div className="p-6 lg:p-8">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="mt-2 text-gray-600">Manage your preferences and configurations.</p>
      </div>
    </div>
  );
};
export default Settings;
