import { Music, UserPlus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyFeed = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-gray-800/50 p-6 rounded-full mb-6">
        <Music size={48} className="text-purple-500" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Your feed is empty</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        Follow artists to see their latest music posts appear in your feed.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
        <Link 
          to="/search" 
          className="flex flex-col items-center p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-purple-500/50 transition-colors"
        >
          <Search size={24} className="text-purple-500 mb-2" />
          <span className="text-gray-200 font-medium">Discover Artists</span>
        </Link>
        
        <Link 
          to="/profile" 
          className="flex flex-col items-center p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-purple-500/50 transition-colors"
        >
          <UserPlus size={24} className="text-purple-500 mb-2" />
          <span className="text-gray-200 font-medium">Find Friends</span>
        </Link>
        
        <Link 
          to="/upload" 
          className="flex flex-col items-center p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-purple-500/50 transition-colors"
        >
          <Music size={24} className="text-purple-500 mb-2" />
          <span className="text-gray-200 font-medium">Upload Music</span>
        </Link>
      </div>
    </div>
  );
};

export default EmptyFeed;