import React from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp } from 'react-icons/fa';
import './MusicPlayer.css';

const MusicPlayer = ({ isPlaying, onPlayPause, trackTitle, artistName }) => {
  return (
    <div className="music-player">
      <div className="now-playing">
        <div className="album-art"></div>
        <div className="track-info">
          <h4 className="track-title">{trackTitle}</h4>
          <p className="artist-name">{artistName}</p>
        </div>
      </div>
      <div className="player-controls">
        <button className="control-button">
          <FaStepBackward size={16} />
        </button>
        <button className="play-button" onClick={onPlayPause}>
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>
        <button className="control-button">
          <FaStepForward size={16} />
        </button>
      </div>
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: '30%' }}></div>
        </div>
        <span className="time">1:45 / 3:22</span>
      </div>
      <div className="volume-control">
        <FaVolumeUp size={16} />
        <div className="volume-slider">
          <div className="volume-level" style={{ width: '70%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;