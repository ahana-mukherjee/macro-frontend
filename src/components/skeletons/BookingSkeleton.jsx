import React from 'react';

const BookingSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array(count)
        .fill()
        .map((_, index) => (
          <div 
            key={index} 
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 animate-pulse mb-4"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/4"></div>
              </div>
              <div className="h-6 bg-gray-700 rounded w-16"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="h-3 bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
              <div>
                <div className="h-3 bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
              <div>
                <div className="h-3 bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
              <div>
                <div className="h-3 bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4 space-x-2">
              <div className="h-8 bg-gray-700 rounded w-20"></div>
              <div className="h-8 bg-gray-700 rounded w-20"></div>
            </div>
          </div>
        ))}
    </>
  );
};

export default BookingSkeleton;