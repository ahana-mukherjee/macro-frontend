const ChatSkeleton = () => {
  return (
    <div className="flex h-full bg-gray-900 rounded-lg shadow-xl animate-pulse">
      {/* Sidebar Skeleton */}
      <div className="w-80 flex-shrink-0 bg-gray-900 border-r border-gray-800 rounded-l-lg">
        {/* Search Bar Skeleton */}
        <div className="p-4 border-b border-gray-800">
          <div className="h-10 bg-gray-800 rounded-md w-full"></div>
        </div>
        
        {/* Conversations List Skeleton */}
        <div className="p-4">
          <div className="h-4 bg-gray-800 rounded w-1/4 mb-6"></div>
          
          {/* Conversation Items */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 mr-3"></div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <div className="h-4 bg-gray-800 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-800 rounded w-16"></div>
                </div>
                <div className="h-3 bg-gray-800 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Chat Area Skeleton */}
      <div className="flex flex-col flex-grow border-l border-gray-800 rounded-r-lg">
        {/* Chat Header Skeleton */}
        <div className="flex items-center justify-between border-b border-gray-800 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-800 mr-3"></div>
            <div>
              <div className="h-4 bg-gray-800 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-800 rounded w-20"></div>
            </div>
          </div>
          <div className="flex">
            <div className="w-8 h-8 rounded-full bg-gray-800 mr-2"></div>
            <div className="w-8 h-8 rounded-full bg-gray-800 mr-2"></div>
            <div className="w-8 h-8 rounded-full bg-gray-800"></div>
          </div>
        </div>
        
        {/* Messages Skeleton */}
        <div className="flex-grow p-4 overflow-y-auto">
          <div className="flex justify-center my-4">
            <div className="h-px bg-gray-800 flex-grow"></div>
            <div className="px-4 h-4 bg-gray-800 rounded w-32"></div>
            <div className="h-px bg-gray-800 flex-grow"></div>
          </div>
          
          {/* Left message */}
          <div className="flex mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-800 mr-2"></div>
            <div className="max-w-md">
              <div className="h-16 bg-gray-800 rounded-lg rounded-bl-none mb-1"></div>
              <div className="h-3 bg-gray-800 rounded w-12"></div>
            </div>
          </div>
          
          {/* Right message */}
          <div className="flex justify-end mb-4">
            <div className="max-w-md">
              <div className="h-12 bg-gray-700 rounded-lg rounded-br-none mb-1"></div>
              <div className="h-3 bg-gray-800 rounded w-12 ml-auto"></div>
            </div>
          </div>
          
          {/* Left message */}
          <div className="flex mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-800 mr-2"></div>
            <div className="max-w-md">
              <div className="h-20 bg-gray-800 rounded-lg rounded-bl-none mb-1"></div>
              <div className="h-3 bg-gray-800 rounded w-12"></div>
            </div>
          </div>
        </div>
        
        {/* Input Skeleton */}
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-800 mr-2"></div>
            <div className="flex-grow h-10 bg-gray-800 rounded-md mx-2"></div>
            <div className="w-10 h-10 rounded-full bg-gray-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;