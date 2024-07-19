import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./sidebar";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-cols-3 gap-6">
            {/* Card 1: Doctors Count */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-bold mb-2">Users Count</h2>
              <p className="text-3xl font-bold">100</p>
            </div>
            {/* Card 2: Patients Count */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-bold mb-2">Owners Count</h2>
              <p className="text-3xl font-bold">500</p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-bold mb-2">Total Booking Today</h2>
              <p className="text-3xl font-bold">350</p>
            </div>
          </div>
          {/* Placeholder Graph */}
          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-lg font-bold mb-4">Booking Over Time</h2>
            {/* Placeholder for graph */}
            <div className="h-64 bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
