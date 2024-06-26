import React from "react";
import { FaSearch, FaCog, FaUser } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py- px-6 flex justify-between items-center">
      <h1 className="text-3xl font-sem-bold mb-8">BookInn</h1>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg--700 text-white px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="focus:outline-none">
          <FaCog className="text-xl text-gray-300 hover:text-white" />
        </button>
        <button className="focus:outline-none">
          <FaUser className="text-xl text-gray-300 hover:text-white" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
