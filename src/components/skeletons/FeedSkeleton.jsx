const FeedSkeleton = ({ count = 3 }) => {
    return (
      <div className="space-y-6">
        {Array(count).fill().map((_, index) => (
          <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
            {/* Artist Header */}
            <div className="flex items-center p-4 border-b border-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-800"></div>
                <div className="ml-3">
                  <div className="h-4 bg-gray-800 rounded w-24"></div>
                  <div className="h-3 bg-gray-800 rounded w-16 mt-2"></div>
                </div>
              </div>
              <div className="ml-auto p-2 rounded-full">
                <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
              </div>
            </div>
            
            {/* Post Content */}
            <div className="p-4">
              <div className="h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-800 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-800 rounded w-2/3 mb-3"></div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="h-6 bg-gray-800 rounded-full w-16"></div>
                <div className="h-6 bg-gray-800 rounded-full w-20"></div>
                <div className="h-6 bg-gray-800 rounded-full w-14"></div>
              </div>
            </div>
            
            {/* Audio Player */}
            <div className="px-4 pb-4">
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                  <div className="ml-3 flex-1">
                    <div className="h-1 bg-gray-700 rounded-full overflow-hidden"></div>
                  </div>
                  <div className="ml-4 flex items-center">
                    <div className="w-4 h-4 bg-gray-700 rounded"></div>
                    <div className="w-16 h-1 ml-2 bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Engagement */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-800 rounded"></div>
                <div className="ml-2 w-4 h-4 bg-gray-800 rounded"></div>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-800 rounded"></div>
                <div className="ml-2 w-4 h-4 bg-gray-800 rounded"></div>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-800 rounded"></div>
                <div className="ml-2 w-12 h-4 bg-gray-800 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default FeedSkeleton;