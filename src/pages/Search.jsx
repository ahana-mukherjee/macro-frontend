import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Search as SearchIcon, Music, User, Calendar, X } from 'lucide-react';
import MusicPostCard from '../components/feed/MusicPostCard';
import FeedSkeleton from '../components/skeletons/FeedSkeleton';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const filter = searchParams.get('filter') || 'all';
  
  const [results, setResults] = useState({
    tracks: [],
    artists: [],
    events: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const filters = [
    { id: 'all', label: 'All', icon: <SearchIcon className="w-4 h-4" /> },
    { id: 'tracks', label: 'Music', icon: <Music className="w-4 h-4" /> },
    { id: 'artists', label: 'Artists', icon: <User className="w-4 h-4" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
  ];

  useEffect(() => {
    if (!query.trim()) return;

    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/search?q=${query}&filter=${filter}`);
        setResults(response.data || { tracks: [], artists: [], events: [] });
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, filter]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchQuery = formData.get('searchQuery');
    
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery, filter });
    }
  };

  const handleFilterChange = (newFilter) => {
    setSearchParams({ q: query, filter: newFilter });
  };

  const clearSearch = () => {
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            name="searchQuery"
            placeholder="Search for music, artists, or events..."
            defaultValue={query}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-4"
            >
              <X className="h-5 w-5 text-gray-500 hover:text-white" />
            </button>
          )}
        </div>
      </form>
      
      {query && (
        <>
          <div className="flex overflow-x-auto space-x-2 mb-6 pb-2 scrollbar-hide">
            {filters.map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => handleFilterChange(filterOption.id)}
                className={`
                  flex items-center px-4 py-2 rounded-full whitespace-nowrap
                  ${filter === filterOption.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                <span className="mr-2">{filterOption.icon}</span>
                {filterOption.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <FeedSkeleton count={6} />
          ) : error ? (
            <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 text-center text-red-500">
              {error}
            </div>
          ) : (
            <div>
              {/* Tracks Section */}
              {(filter === 'all' || filter === 'tracks') && results.tracks.length > 0 && (
                <div className="mb-8">
                  {filter === 'all' && <h2 className="text-xl font-semibold text-white mb-4">Music</h2>}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.tracks.map((track) => (
                      <MusicPostCard key={track.id} post={track} />
                    ))}
                  </div>
                </div>
              )}

              {/* Artists Section */}
              {(filter === 'all' || filter === 'artists') && results.artists.length > 0 && (
                <div className="mb-8">
                  {filter === 'all' && <h2 className="text-xl font-semibold text-white mb-4">Artists</h2>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {results.artists.map((artist) => (
                      <Link 
                        key={artist.id} 
                        to={`/profile/${artist.id}`}
                        className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition duration-200"
                      >
                        <div className="flex flex-col items-center text-center">
                          <img 
                            src={artist.avatar || '/default-avatar.png'} 
                            alt={artist.name}
                            className="w-24 h-24 rounded-full object-cover mb-3"
                          />
                          <h3 className="text-white font-medium">{artist.name}</h3>
                          <p className="text-gray-400 text-sm">{artist.genre || 'Musician'}</p>
                          <div className="mt-2 text-purple-500 text-sm">
                            {artist.followerCount} followers
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Events Section */}
              {(filter === 'all' || filter === 'events') && results.events.length > 0 && (
                <div className="mb-8">
                  {filter === 'all' && <h2 className="text-xl font-semibold text-white mb-4">Events</h2>}
                  <div className="space-y-4">
                    {results.events.map((event) => (
                      <div 
                        key={event.id}
                        className="bg-gray-800 border border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex flex-col md:flex-row justify-between">
                          <div className="flex space-x-4">
                            <div className="flex flex-col items-center justify-center bg-gray-900 rounded-lg p-3 min-w-16 text-center">
                              <span className="text-purple-500 text-xs font-medium">
                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                              </span>
                              <span className="text-white text-xl font-bold">
                                {new Date(event.date).getDate()}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-white font-medium text-lg">{event.title}</h3>
                              <p className="text-gray-400">{event.venue} • {event.location}</p>
                              <div className="mt-2 flex items-center space-x-2">
                                <img 
                                  src={event.artist.avatar || '/default-avatar.png'}
                                  alt={event.artist.name} 
                                  className="w-6 h-6 rounded-full"
                                />
                                <span className="text-gray-400 text-sm">{event.artist.name}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 flex items-start">
                            <Link
                              to={`/events/${event.id}`}
                              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-200"
                            >
                              Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {((filter === 'all' && 
                results.tracks.length === 0 && 
                results.artists.length === 0 && 
                results.events.length === 0) || 
                (filter === 'tracks' && results.tracks.length === 0) ||
                (filter === 'artists' && results.artists.length === 0) ||
                (filter === 'events' && results.events.length === 0)) && (
                <div className="text-center py-12">
                  <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                    <SearchIcon className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
                  <p className="text-gray-400">
                    We couldn't find anything matching "{query}". Try adjusting your search terms.</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
      
      {!query && (
        <div className="text-center py-12">
          <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-gray-800 mb-4">
            <SearchIcon className="h-10 w-10 text-gray-500" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Search for music, artists, and events</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Discover new music, find artists to collaborate with, or check out upcoming events.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;