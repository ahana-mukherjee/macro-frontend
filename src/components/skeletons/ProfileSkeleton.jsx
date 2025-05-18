const ProfileSkeleton = () => {
    return (
      <div className="flex flex-col w-full animate-pulse">
        {/* Cover Image */}
        <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-800 relative"></div>
        
        {/* Profile Header */}
        <div className="max-w-4xl mx-auto px-4 w-full -mt-16 z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-gray-900 overflow-hidden bg-gray-700"></div>
            
            <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="h-8 bg-gray-700 rounded w-64 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-40"></div>
                </div>
                
                <div className="mt-4 sm:mt-0 h-10 bg-gray-700 rounded-full w-32"></div>
              </div>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6 mb-4"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-700 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-700 rounded w-32"></div>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-700 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-700 rounded w-40"></div>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-700 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-700 rounded w-36"></div>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-700 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-700 rounded w-28"></div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-700 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-700 rounded w-24"></div>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-700 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-700 rounded w-24"></div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-800 mb-6">
            <nav className="flex -mb-px">
              <div className="mr-8 py-4 h-6 bg-gray-700 rounded w-24"></div>
              <div className="mr-8 py-4 h-6 bg-gray-700 rounded w-24"></div>
              <div className="mr-8 py-4 h-6 bg-gray-700 rounded w-24"></div>
            </nav>
          </div>
          
          {/* Content Skeleton */}
          <div className="space-y-6">
            {[1, 2].map((item) => (
              <div key={item} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="h-48 bg-gray-800 p-4">
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3 mb-8"></div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                    <div className="ml-3 flex-1">
                      <div className="h-2 bg-gray-700 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 flex items-center justify-between border-t border-gray-800">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-12 ml-2"></div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-12 ml-2"></div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-12 ml-2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileSkeleton;