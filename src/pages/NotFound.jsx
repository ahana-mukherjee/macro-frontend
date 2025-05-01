import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-gray-800/50 rounded-full p-6 mb-6">
        <Music className="h-16 w-16 text-purple-500" />
      </div>
      
      <h1 className="text-4xl font-bold text-white mb-3">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Link 
          to="/" 
          className="flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-200"
        >
          <Home className="mr-2 h-5 w-5" />
          Go Home
        </Link>
        <Link 
          to="/feed" 
          className="flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition duration-200"
        >
          <Music className="mr-2 h-5 w-5" />
          Explore Music
        </Link>
      </div>
    </div>
  );
};

export default NotFound;