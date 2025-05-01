import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { 
  Heart, MessageCircle, Share2, Play, Pause, 
  Volume2, VolumeX, MoreVertical 
} from 'lucide-react';

const MusicPostCard = ({ post }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  // Format the date using date-fns
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });
  
  const togglePlay = () => {
    // In a real implementation, this would control the audio element
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    // In a real implementation, this would mute/unmute the audio
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };
  
  const toggleLike = () => {
    // In a real implementation, this would call the API to like/unlike
    setIsLiked(!isLiked);
  };
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  
  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing post:', post.id);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Artist Header */}
      <div className="flex items-center p-4 border-b border-gray-800">
        <Link to={`/profile/${post.user.id}`} className="flex items-center">
          <img 
            src={post.user.profile_image} 
            alt={post.user.username} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-white">{post.user.username}</h3>
            <p className="text-xs text-gray-400">{timeAgo}</p>
          </div>
        </Link>
        
        <button className="ml-auto p-2 rounded-full hover:bg-gray-800">
          <MoreVertical size={18} className="text-gray-400" />
        </button>
      </div>
      
      {/* Post Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
        <p className="text-gray-300 mb-3">{post.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Audio Player */}
      <div className="px-4 pb-4">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center mb-3">
            <button 
              onClick={togglePlay}
              className="w-10 h-10 flex items-center justify-center bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
            >
              {isPlaying ? 
                <Pause size={20} className="text-white" /> : 
                <Play size={20} className="text-white ml-1" />
              }
            </button>
            
            <div className="ml-3 flex-1">
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500" 
                  style={{ width: isPlaying ? '45%' : '0%' }}
                ></div>
              </div>
            </div>
            
            <div className="ml-4 flex items-center">
              <button onClick={toggleMute} className="p-1 hover:text-white">
                {isMuted ? 
                  <VolumeX size={18} className="text-gray-400" /> : 
                  <Volume2 size={18} className="text-gray-400" />
                }
              </button>
              
              <input 
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 ml-2 accent-purple-500 bg-gray-700 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Engagement */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800">
        <button 
          onClick={toggleLike}
          className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          <span className="ml-2">{isLiked ? post.likes_count + 1 : post.likes_count}</span>
        </button>
        
        <button 
          onClick={toggleComments}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <MessageCircle size={18} />
          <span className="ml-2">{post.comments_count}</span>
        </button>
        
        <button 
          onClick={handleShare}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <Share2 size={18} />
          <span className="ml-2">Share</span>
        </button>
      </div>
      
      {/* Comments Section (collapsed by default) */}
      {showComments && (
        <div className="px-4 py-3 border-t border-gray-800">
          <div className="flex items-center mb-4">
            <input 
              type="text"
              placeholder="Add a comment..."
              className="w-full bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
              Post
            </button>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-400 text-center text-sm">
              Comments will appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPostCard;