import React from 'react';
import { FaPlay, FaPause, FaHeart, FaRegHeart, FaComment, FaPaperPlane } from 'react-icons/fa';
import './Post.css';

const Post = ({ 
  username, 
  time, 
  release, 
  hashtags, 
  isPlaying, 
  onPlayPause, 
  liked, 
  onLike 
}) => {
  return (
    <div className="post">
      <div className="post-header">
        <div className="user-info">
          <div className="avatar"></div>
          <div>
            <div className="username">{username}</div>
            <div className="post-time">{time}</div>
          </div>
        </div>
        <div className="release">{release}</div>
      </div>
      
      <div className="post-content">
        <p className="hashtags">{hashtags}</p>
        <div className="media-placeholder"></div>
      </div>
      
      <div className="post-actions">
        <button 
          className={`action-button ${isPlaying ? 'active' : ''}`} 
          onClick={onPlayPause}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: '45%' }}></div>
          </div>
          <div className="time-info">1:22 / 3:05</div>
        </div>
        
        <div className="action-buttons">
          <button 
            className={`action-button ${liked ? 'liked' : ''}`} 
            onClick={onLike}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button className="action-button">
            <FaComment />
          </button>
          <button className="action-button">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;