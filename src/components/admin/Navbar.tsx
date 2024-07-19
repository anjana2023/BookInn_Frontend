import React from "react";
import { FaSearch, FaCog, FaUser } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py- px-6 flex justify-between items-center">
      <h1 className="text-3xl font-sem-bold mb-8">BookInn</h1>
      <div className="flex items-center space-x-6">
        

          <FaUser className="text-xl text-gray-300 hover:text-white" />
          <p className ="py-2">admin</p>
          
      
      </div>
    </header>
  );
};

export default Navbar;
