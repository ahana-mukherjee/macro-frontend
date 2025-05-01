import { useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import Modal from '../common/Modal';
import { useAuth } from '../../contexts/AuthContext';

const BookingDetailModal = ({ isOpen, onClose, booking, onStatusUpdate }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Determine if the current user is the artist or the requester
  const isArtist = user?.id === booking?.artist?.id;

  const handleStatusChange = async (newStatus) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.patch(`/api/bookings/${booking.id}`, {
        status: newStatus
      });
      
      if (response.data) {
        onStatusUpdate(response.data);
      }
    } catch (err) {
      setError('Failed to update booking status. Please try again.');
      console.error('Error updating booking status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!booking) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Booking Details">
      <div className="space-y-6">
        {/* Booking Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img 
              src={isArtist ? booking.requester.avatar : booking.artist.avatar} 
              alt={isArtist ? booking.requester.name : booking.artist.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-white">
                {isArtist ? booking.requester.name : booking.artist.name}
              </h3>
              <p className="text-gray-400 text-sm">
                {isArtist ? 'Booking Request' : 'Your Booking with'}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 rounded-lg p-4">
            <div>
              <p className="text-gray-400 text-sm">Event Date</p>
              <p className="text-white">{format(new Date(booking.eventDate), 'PPP')}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Time</p>
              <p className="text-white">{format(new Date(booking.eventDate), 'p')}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Event Type</p>
              <p className="text-white">{booking.eventType}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Location</p>
              <p className="text-white">{booking.location}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-400 text-sm">Budget</p>
              <p className="text-white font-medium">${booking.budget.toLocaleString()}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-400 text-sm">Status</p>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                ${booking.status === 'pending' ? 'bg-yellow-900/30 text-yellow-500' : 
                booking.status === 'accepted' ? 'bg-green-900/30 text-green-500' : 
                booking.status === 'declined' ? 'bg-red-900/30 text-red-500' : 
                'bg-blue-900/30 text-blue-500'}`}
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-gray-300 font-medium mb-2">Event Details</h4>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-200 whitespace-pre-wrap">{booking.description}</p>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <h4 className="text-gray-300 font-medium mb-2">Contact Information</h4>
            <div className="bg-gray-800 rounded-lg p-4 space-y-2">
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white">{isArtist ? booking.requester.email : booking.artist.email}</p>
              </div>
              {booking.contactPhone && (
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white">{booking.contactPhone}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Actions */}
        {booking.status === 'pending' && isArtist && (
          <div className="flex space-x-3 justify-end">
            <button
              onClick={() => handleStatusChange('declined')}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition duration-200"
            >
              Decline
            </button>
            <button
              onClick={() => handleStatusChange('accepted')}
              disabled={isLoading}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-200"
            >
              Accept
            </button>
          </div>
        )}
        
        {booking.status === 'accepted' && (
          <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
            <p className="text-green-500 font-medium">
              This booking has been confirmed. Connect via email to finalize details.
            </p>
          </div>
        )}
        
        {booking.status === 'declined' && (
          <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
            <p className="text-red-500 font-medium">
              This booking request has been declined.
            </p>
          </div>
        )}

        {booking.status === 'completed' && (
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <p className="text-blue-500 font-medium">
              This booking has been completed.
            </p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BookingDetailModal;