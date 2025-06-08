import React from 'react';
import './Trending.css';

const Trending = () => {
  // Mock trending data
  const trendingItems = [
    { id: 1, title: '#SummerVibes', posts: '24.5K posts' },
    { id: 2, title: '#NewRelease', posts: '18.2K posts' },
    { id: 3, title: '#ChillBeats', posts: '15.7K posts' },
    { id: 4, title: '#IndieMusic', posts: '12.3K posts' },
  ];

  return (
    <div className="trending-card">
      <h3 className="trending-title">Trending</h3>
      <div className="trending-list">
        {trendingItems.map((item) => (
          <div key={item.id} className="trending-item">
            <span className="trending-tag">{item.title}</span>
            <span className="trending-count">{item.posts}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;