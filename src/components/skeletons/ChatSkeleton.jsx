import React from 'react';

const ChatSkeleton = () => {
  return (
    <div className="flex h-full bg-gray-900">
      {/* Sidebar Skeleton */}
      <div className="w-80 flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="h-8 bg-gray-800 rounded-md w-2/3 mb-4"></div>
          <div className="w-full h-10 bg-gray-800 rounded-md"></div>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 border-b border-gray-800 animate-pulse">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex-shrink-0"></div>
                <div className="ml-3 flex-grow">
                  <div className="h-4 bg-gray-800 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Main Area Skeleton */}
      <div className="flex flex-col flex-grow border-l border-gray-800">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900">
          <div className="flex items-center animate-pulse">
            <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
            <div className="ml-3">
              <div className="h-4 bg-gray-800 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-800 rounded w-16"></div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <div className="w-6 h-6 bg-gray-800 rounded"></div>
            <div className="w-6 h-6 bg-gray-800 rounded"></div>
            <div className="w-6 h-6 bg-gray-800 rounded"></div>
          </div>
        </div>
        
        {/* Messages Skeleton */}
        <div className="flex-grow overflow-y-auto p-4 bg-gray-900">
          <div className="flex items-center justify-center my-4">
            <div className="h-px bg-gray-800 flex-grow"></div>
            <div className="px-4 h-4 bg-gray-800 rounded w-24"></div>
            <div className="h-px bg-gray-800 flex-grow"></div>
          </div>
          
          <div className="space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-start">
                <div className="w-8 h-8 bg-gray-800 rounded-full mr-2"></div>
                <div>
                  <div className="h-10 bg-gray-800 rounded-lg w-64"></div>
                  <div className="h-3 bg-gray-800 rounded w-16 mt-1"></div>
                </div>
              </div>
            ))}
            
            {[...Array(2)].map((_, i) => (
              <div key={`out-${i}`} className="flex justify-end">
                <div>
                  <div className="h-10 bg-purple-900 bg-opacity-50 rounded-lg w-48"></div>
                  <div className="h-3 bg-gray-800 rounded w-16 mt-1 ml-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Input Skeleton */}
        <div className="border-t border-gray-800 p-4 bg-gray-900">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
            <div className="flex-grow mx-3 h-10 bg-gray-800 rounded-md"></div>
            <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;