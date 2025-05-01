import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Edit, MapPin, Calendar, Music, Users, ArrowRightCircle, Globe } from 'lucide-react';
import MusicPostCard from '../components/feed/MusicPostCard';
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton';

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('music');
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would be your actual API endpoints
        const profileResponse = await axios.get(`/api/users/${userId || 'me'}`);
        const postsResponse = await axios.get(`/api/users/${userId || 'me'}/posts`);
        
        setProfile(profileResponse.data);
        setPosts(Array.isArray(postsResponse.data) ? postsResponse.data : postsResponse.data.posts || []);
        setIsCurrentUser(!userId || userId === 'me' || userId === profileResponse.data.id.toString());
        setErrorMessage('');
      } catch (error) {
        console.error('Error fetching profile:', error);
        setErrorMessage('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // For development purposes, use mock data
  useEffect(() => {
    const mockProfile = {
      id: 101,
      username: 'stella_nova',
      name: 'Stella Nova',
      bio: 'Electronic music producer and DJ based in Berlin. Creating atmospheric soundscapes since 2018.',
      profile_image: 'https://picsum.photos/150',
      cover_image: 'https://picsum.photos/1200/300',
      location: 'Berlin, Germany',
      joined_date: '2023-01-15',
      website: 'https://stellanova-music.com',
      followers_count: 1258,
      following_count: 423,
      role: 'artist',
      genres: ['electronic', 'ambient', 'downtempo']
    };

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
        id: 4,
        title: 'EP Preview - "Cosmic Journeys"',
        description: 'A sneak peek at my upcoming EP. Four tracks exploring space and consciousness.',
        audio_url: 'https://example.com/audio4.mp3',
        created_at: '2025-04-10T10:15:00Z',
        user: {
          id: 101,
          username: 'stella_nova',
          profile_image: 'https://via.placeholder.com/150',
        },
        likes_count: 36,
        comments_count: 9,
        tags: ['electronic', 'space', 'ambient']
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setProfile(mockProfile);
      setPosts(mockPosts);
      setIsCurrentUser(true); // For testing purposes
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (errorMessage) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6 text-red-200">
          {errorMessage}
        </div>
        <Link to="/feed" className="text-purple-500 hover:text-purple-400">
          Return to Feed
        </Link>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-bold text-white mb-4">Profile not found</h2>
        <Link to="/feed" className="text-purple-500 hover:text-purple-400">
          Return to Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Cover Image */}
      <div 
        className="w-full h-48 sm:h-64 md:h-80 bg-gradient-to-r from-purple-900 to-gray-900 relative"
        style={profile.cover_image ? { backgroundImage: `url(${profile.cover_image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        {isCurrentUser && (
          <button className="absolute top-4 right-4 bg-gray-900/70 hover:bg-gray-800 text-white rounded-full p-2 transition-colors">
            <Edit size={16} />
          </button>
        )}
      </div>
      
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto px-4 w-full -mt-16 z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end mb-6">
          <div className="w-32 h-32 rounded-full border-4 border-gray-900 overflow-hidden bg-gray-800">
            <img 
              src={profile.profile_image} 
              alt={profile.username}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                <p className="text-gray-400">@{profile.username}</p>
              </div>
              
              {isCurrentUser ? (
                <button className="mt-4 sm:mt-0 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors">
                  Edit Profile
                </button>
              ) : (
                <button className="mt-4 sm:mt-0 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors">
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <p className="text-gray-200 mb-4">{profile.bio}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {profile.location && (
              <div className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2" />
                <span>{profile.location}</span>
              </div>
            )}
            
            {profile.joined_date && (
              <div className="flex items-center text-gray-400">
                <Calendar size={16} className="mr-2" />
                <span>Joined {new Date(profile.joined_date).toLocaleDateString()}</span>
              </div>
            )}
            
            {profile.website && (
              <div className="flex items-center text-gray-400">
                <Globe size={16} className="mr-2" />
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-400">
                  {profile.website.replace(/(https?:\/\/)?(www\.)?/, '')}
                </a>
              </div>
            )}
            
            {profile.role === 'artist' && profile.genres && (
              <div className="flex items-center text-gray-400">
                <Music size={16} className="mr-2" />
                <span>{profile.genres.join(', ')}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Users size={16} className="mr-2 text-gray-400" />
              <span className="text-white font-semibold">{profile.followers_count}</span>
              <span className="ml-1 text-gray-400">Followers</span>
            </div>
            
            <div className="flex items-center">
              <ArrowRightCircle size={16} className="mr-2 text-gray-400" />
              <span className="text-white font-semibold">{profile.following_count}</span>
              <span className="ml-1 text-gray-400">Following</span>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-800 mb-6">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('music')}
              className={`mr-8 py-4 ${
                activeTab === 'music'
                  ? 'border-b-2 border-purple-500 text-purple-500'
                  : 'text-gray-400 hover:text-gray-200'
              } font-medium transition-colors`}
            >
              Music
            </button>
            
            <button
              onClick={() => setActiveTab('about')}
              className={`mr-8 py-4 ${
                activeTab === 'about'
                  ? 'border-b-2 border-purple-500 text-purple-500'
                  : 'text-gray-400 hover:text-gray-200'
              } font-medium transition-colors`}
            >
              About
            </button>
            
            {isCurrentUser && (
              <button
                onClick={() => setActiveTab('bookings')}
                className={`mr-8 py-4 ${
                  activeTab === 'bookings'
                    ? 'border-b-2 border-purple-500 text-purple-500'
                    : 'text-gray-400 hover:text-gray-200'
                } font-medium transition-colors`}
              >
                Bookings
              </button>
            )}
          </nav>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'music' && (
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map(post => (
                <MusicPostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
                <Music size={48} className="mx-auto text-gray-700 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No music posts yet</h3>
                {isCurrentUser ? (
                  <>
                    <p className="text-gray-400 mb-4">Share your music with the world by creating your first post.</p>
                    <Link to="/upload" className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors">
                      Upload Music
                    </Link>
                  </>
                ) : (
                  <p className="text-gray-400">This artist hasn't posted any music yet.</p>
                )}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'about' && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">About {profile.name}</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-2">Bio</h3>
                <p className="text-gray-300">{profile.bio || 'No bio available.'}</p>
              </div>
              
              {profile.role === 'artist' && (
                <div>
                  <h3 className="font-semibold text-white mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.genres && profile.genres.length > 0 ? (
                      profile.genres.map((genre, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full">
                          {genre}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-400">No genres specified.</p>
                    )}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-semibold text-white mb-2">Contact</h3>
                {profile.website ? (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-400 flex items-center">
                    <Globe size={16} className="mr-2" />
                    {profile.website}
                  </a>
                ) : (
                  <p className="text-gray-400">No contact information available.</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'bookings' && isCurrentUser && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Booking Requests</h2>
            
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">Your booking requests will appear here.</p>
              <Link to="/bookings" className="text-purple-500 hover:text-purple-400">
                View All Booking Requests
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;