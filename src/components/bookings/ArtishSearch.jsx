import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

const ArtistSearch = ({ onSelectArtist, selectedArtist }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const searchArtists = async () => {
      if (searchTerm.trim().length < 2) {
        setArtists([]);
        return;
      }

      setIsLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`/api/users/artists?search=${searchTerm}`);
        setArtists(response.data || []);
        setIsDropdownOpen(true);
      } catch (error) {
        console.error('Error searching for artists:', error);
        setArtists([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(searchArtists, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleSelectArtist = (artist) => {
    onSelectArtist(artist);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.trim().length >= 2 && setIsDropdownOpen(true)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-purple-500" />
            </div>
          )}
        </div>

        {isDropdownOpen && artists.length > 0 && (
          <div className="absolute mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="flex items-center p-3 hover:bg-gray-700 cursor-pointer transition duration-150"
                onClick={() => handleSelectArtist(artist)}
              >
                <img
                  src={artist.avatar || '/default-avatar.png'}
                  alt={artist.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="text-white font-medium">{artist.name}</p>
                  <p className="text-gray-400 text-sm">{artist.genre || 'Musician'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {isDropdownOpen && searchTerm.trim().length >= 2 && artists.length === 0 && !isLoading && (
          <div className="absolute mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 p-3">
            <p className="text-gray-400 text-center">No artists found</p>
          </div>
        )}
      </div>

      {selectedArtist && (
        <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg p-3">
          <div className="flex items-center">
            <img
              src={selectedArtist.avatar || '/default-avatar.png'}
              alt={selectedArtist.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="text-white font-medium">{selectedArtist.name}</p>
              <p className="text-gray-400 text-sm">{selectedArtist.genre || 'Musician'}</p>
            </div>
          </div>
          <button
            onClick={() => onSelectArtist(null)}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ArtistSearch;