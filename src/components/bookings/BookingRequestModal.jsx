import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../common/Modal';
import ArtistSearch from '../bookings/ArtishSearch';

const BookingRequestModal = ({ onClose, onSubmit, selectedArtist, onSelectArtist }) => {
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState({});
  
  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!selectedArtist) {
      newErrors.artist = 'Please select an artist';
    }
    
    if (!eventDate) {
      newErrors.eventDate = 'Event date is required';
    } else if (new Date(eventDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.eventDate = 'Event date cannot be in the past';
    }
    
    if (!eventTime) {
      newErrors.eventTime = 'Event time is required';
    }
    
    if (!eventLocation) {
      newErrors.eventLocation = 'Event location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Combine date and time into a Date object
      const eventDateTime = new Date(`${eventDate}T${eventTime}`);
      
      onSubmit({
        event_date: eventDateTime.toISOString(),
        event_location: eventLocation,
        details
      });
    }
  };

  return (
    <Modal onClose={onClose} title="Request a Booking">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Artist Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Artist
          </label>
          {selectedArtist ? (
            <div className="flex items-center justify-between bg-gray-800 rounded-md p-3 border border-gray-700">
              <div className="flex items-center">
                <img 
                  src={selectedArtist.avatar_url || "https://via.placeholder.com/40"} 
                  alt={selectedArtist.username} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-medium text-white">{selectedArtist.username}</div>
                  {selectedArtist.genres && (
                    <div className="text-sm text-gray-400">
                      {selectedArtist.genres.join(', ')}
                    </div>
                  )}
                </div>
              </div>
              <button 
                type="button"
                onClick={() => onSelectArtist(null)}
                className="text-gray-400 hover:text-white"
              >
                Change
              </button>
            </div>
          ) : (
            <ArtistSearch onSelectArtist={onSelectArtist} />
          )}
          {errors.artist && (
            <p className="mt-1 text-sm text-red-500">{errors.artist}</p>
          )}
        </div>
        
        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="event-date" className="block text-sm font-medium text-gray-300 mb-1">
              Date
            </label>
            <input
              type="date"
              id="event-date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-purple-500"
            />
            {errors.eventDate && (
              <p className="mt-1 text-sm text-red-500">{errors.eventDate}</p>
            )}
          </div>
          <div>
            <label htmlFor="event-time" className="block text-sm font-medium text-gray-300 mb-1">
              Time
            </label>
            <input
              type="time"
              id="event-time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-purple-500"
            />
            {errors.eventTime && (
              <p className="mt-1 text-sm text-red-500">{errors.eventTime}</p>
            )}
          </div>
        </div>
        
        {/* Location */}
        <div>
          <label htmlFor="event-location" className="block text-sm font-medium text-gray-300 mb-1">
            Location
          </label>
          <input
            type="text"
            id="event-location"
            placeholder="Enter venue or location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-purple-500"
          />
          {errors.eventLocation && (
            <p className="mt-1 text-sm text-red-500">{errors.eventLocation}</p>
          )}
        </div>
        
        {/* Details */}
        <div>
          <label htmlFor="event-details" className="block text-sm font-medium text-gray-300 mb-1">
            Details
          </label>
          <textarea
            id="event-details"
            placeholder="Describe the event, expectations, etc."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows="4"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>
        
        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Send Request
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BookingRequestModal;