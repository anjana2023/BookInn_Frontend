import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white text-center font-poppins overflow-hidden">
      <div className="p-6 rounded-lg bg-opacity-0 shadow-lg relative">
        <h1 className="text-7xl font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent mb-0 animate-fadeIn">
          404
        </h1>
        <h2 className="text-2xl font-bold my-5 text-orange-500 shadow-md animate-fadeIn delay-500">
          Internal Server Error
        </h2>
        <button 
          onClick={handleGoBack} 
          title="Back to site" 
          className="inline-block px-5 py-2 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-blue-500 rounded-md transition-colors duration-300 hover:bg-opacity-70"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
