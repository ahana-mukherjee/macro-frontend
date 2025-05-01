import { useState, useEffect } from 'react';
import axios from 'axios';
import MusicPostCard from '../components/feed/MusicPostCard';
import FeedSkeleton from '../components/skeletons/FeedSkeleton';
import EmptyFeed from '../components/feed/EmptyFeed';
import FilterBar from '../components/feed/FilterBar';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('recent'); // 'recent' or 'popular'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would be your actual API endpoint
        const response = await axios.get(`/api/posts?sort=${filter}`);
        //setPosts(response.data);
        setPosts([]);
        setErrorMessage('');
      } catch (error) {
        console.error('Error fetching feed:', error);
        setErrorMessage('Failed to load feed. Please try again later.');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filter]);

  // For development purposes, use mock data
  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        title: 'New Single Release - "Midnight Dreams"',
        description: 'My latest single exploring themes of night and imagination. Let me know what you think!',
        audio_url: 'https://example.com/audio1.mp3',
        created_at: '2025-04-20T14:22:00Z',
        user: {
          id: 101,
          username: 'stella_nova',
          profile_image: 'https://via.placeholder.com/150',
        },
        likes_count: 42,
        comments_count: 7,
        tags: ['electronic', 'ambient']
      },
      {
        id: 2,
        title: 'Live Session - Acoustic Set',
        description: 'Recorded this acoustic set last weekend. Raw and unedited!',
        audio_url: 'https://example.com/audio2.mp3',
        created_at: '2025-04-18T09:15:00Z',
        user: {
          id: 102,
          username: 'acoustic_wanderer',
          profile_image: 'https://via.placeholder.com/150',
        },
        likes_count: 28,
        comments_count: 5,
        tags: ['acoustic', 'live', 'folk']
      },
      {
        id: 3,
        title: 'Beat Tape Vol. 2',
        description: 'My second collection of instrumental beats. Perfect for freestyle sessions.',
        audio_url: 'https://example.com/audio3.mp3',
        created_at: '2025-04-15T16:40:00Z',
        user: {
          id: 103,
          username: 'rhythm_architect',
          profile_image: 'https://via.placeholder.com/150',
        },
        likes_count: 63,
        comments_count: 12,
        tags: ['hiphop', 'beats', 'instrumental']
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-white mb-6">Your Feed</h1>

      <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />

      {errorMessage && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6 text-red-200">
          {errorMessage}
        </div>
      )}

      {loading ? (
        <FeedSkeleton count={3} />
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map(post => (
            <MusicPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyFeed />
      )}
    </div>
  );
};

export default Feed;