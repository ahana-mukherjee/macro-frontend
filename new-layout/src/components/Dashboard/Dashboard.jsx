import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-card">
      <h3 className="dashboard-title">Dashboard</h3>
      <div className="welcome-message">
        <p>Welcome back! Check out the latest releases and trending tracks.</p>
      </div>
      <div className="stats">
        <div className="stat-item">
          <div className="stat-value">1,245</div>
          <div className="stat-label">Plays</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">356</div>
          <div className="stat-label">Followers</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">24</div>
          <div className="stat-label">Tracks</div>
        </div>
      </div>
      <button className="upload-button">Upload New Track</button>
    </div>
  );
};

export default Dashboard;