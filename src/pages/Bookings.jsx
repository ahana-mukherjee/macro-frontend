import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import BookingRequestModal from '../components/bookings/BookingRequestModal';
import BookingDetailModal from '../components/bookings/BookingDetailModal';
import BookingSkeleton from '../components/skeletons/BookingSkeleton';
import TabSwitcher from '../components/common/TabSwitcher';

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('incoming');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  
  // Fetch bookings when component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/bookings/');

        if(Array.isArray(response.data)) {
        setBookings(response.data);
        } else if (response.data && Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
        } else {
          console.error('Unexpected bookings data structure:', response.data);
          setBookings([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]);
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'incoming') {
      return booking.artist_id === user?.id;
    } else if (activeTab === 'outgoing') {
      return booking.requester_id === user?.id;
    } else if (activeTab === 'upcoming') {
      return (
        (booking.artist_id === user?.id || booking.requester_id === user?.id) &&
        booking.status === 'accepted' &&
        new Date(booking.event_date) >= new Date()
      );
    } else if (activeTab === 'past') {
      return (
        (booking.artist_id === user?.id || booking.requester_id === user?.id) &&
        (booking.status === 'accepted' || booking.status === 'completed') &&
        new Date(booking.event_date) < new Date()
      );
    }
    return false;
  });

  // Handle booking status change
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.patch(`/api/bookings/${bookingId}/`, {
        status: newStatus
      });
      
      // Update local state
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: newStatus } 
            : booking
        )
      );
      
      // Close detail modal if open
      if (showDetailModal) {
        setShowDetailModal(false);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  // Handle booking request submission
  const handleBookingSubmit = async (bookingData) => {
    try {
      const response = await axios.post('/api/bookings/', {
        ...bookingData,
        artist_id: selectedArtist.id,
        status: 'pending'
      });
      
      // Add new booking to state
      setBookings(prev => [...prev, response.data]);
      
      // Close modal
      setShowRequestModal(false);
      setSelectedArtist(null);
    } catch (error) {
      console.error('Error creating booking request:', error);
    }
  };

  if (loading) {
    return <BookingSkeleton />;
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Bookings</h1>
        
        <button 
          onClick={() => setShowRequestModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
        >
          Request a Booking
        </button>
      </div>
      
      <TabSwitcher 
        tabs={[
          { id: 'incoming', label: 'Incoming Requests' },
          { id: 'outgoing', label: 'Your Requests' },
          { id: 'upcoming', label: 'Upcoming Events' },
          { id: 'past', label: 'Past Events' }
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      
      {filteredBookings.length > 0 ? (
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden mt-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-800">
                <tr>
                  {activeTab === 'incoming' && <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Requester</th>}
                  {activeTab === 'outgoing' && <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Artist</th>}
                  {(activeTab === 'upcoming' || activeTab === 'past') && <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">With</th>}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Event Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredBookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-gray-800 transition-colors">
                    {/* Conditional rendering for the first column based on active tab */}
                    {activeTab === 'incoming' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img 
                              className="h-10 w-10 rounded-full" 
                              src={booking.requester?.avatar_url || "https://via.placeholder.com/40"} 
                              alt="" 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{booking.requester?.username}</div>
                          </div>
                        </div>
                      </td>
                    )}
                    
                    {activeTab === 'outgoing' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img 
                              className="h-10 w-10 rounded-full" 
                              src={booking.artist?.avatar_url || "https://via.placeholder.com/40"} 
                              alt="" 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{booking.artist?.username}</div>
                          </div>
                        </div>
                      </td>
                    )}
                    
                    {(activeTab === 'upcoming' || activeTab === 'past') && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img 
                              className="h-10 w-10 rounded-full" 
                              src={booking.artist_id === user?.id 
                                ? booking.requester?.avatar_url 
                                : booking.artist?.avatar_url || "https://via.placeholder.com/40"} 
                              alt="" 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {booking.artist_id === user?.id 
                                ? booking.requester?.username 
                                : booking.artist?.username}
                            </div>
                          </div>
                        </div>
                      </td>
                    )}
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{format(new Date(booking.event_date), 'MMM d, yyyy')}</div>
                      <div className="text-sm text-gray-400">{format(new Date(booking.event_date), 'h:mm a')}</div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{booking.event_location}</div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'pending' ? 'bg-yellow-900 text-yellow-200' :
                        booking.status === 'accepted' ? 'bg-green-900 text-green-200' :
                        booking.status === 'declined' ? 'bg-red-900 text-red-200' :
                        booking.status === 'completed' ? 'bg-blue-900 text-blue-200' : 
                        'bg-gray-800 text-gray-200'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowDetailModal(true);
                        }}
                        className="text-purple-400 hover:text-purple-300 mr-4"
                      >
                        View
                      </button>
                      
                      {booking.status === 'pending' && booking.artist_id === user?.id && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(booking.id, 'accepted')}
                            className="text-green-400 hover:text-green-300 mr-4"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleStatusChange(booking.id, 'declined')}
                            className="text-red-400 hover:text-red-300"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      
                      {booking.status === 'accepted' && 
                       new Date(booking.event_date) < new Date() && 
                       (booking.artist_id === user?.id || booking.requester_id === user?.id) && 
                       booking.status !== 'completed' && (
                        <button 
                          onClick={() => handleStatusChange(booking.id, 'completed')}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Mark Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 text-center mt-6">
          <div className="inline-block p-4 rounded-full bg-gray-800 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No {activeTab} bookings</h3>
          {activeTab === 'incoming' && (
            <p className="text-gray-400">You don't have any incoming booking requests yet.</p>
          )}
          {activeTab === 'outgoing' && (
            <p className="text-gray-400">You haven't sent any booking requests yet.</p>
          )}
          {activeTab === 'upcoming' && (
            <p className="text-gray-400">You don't have any upcoming bookings.</p>
          )}
          {activeTab === 'past' && (
            <p className="text-gray-400">You don't have any past bookings.</p>
          )}
        </div>
      )}
      
      {/* Booking Detail Modal */}
      {showDetailModal && selectedBooking && (
        <BookingDetailModal 
          booking={selectedBooking}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedBooking(null);
          }}
          onStatusChange={handleStatusChange}
          currentUserId={user?.id}
        />
      )}
      
      {/* Booking Request Modal */}
      {showRequestModal && (
        <BookingRequestModal 
          onClose={() => {
            setShowRequestModal(false);
            setSelectedArtist(null);
          }}
          onSubmit={handleBookingSubmit}
          selectedArtist={selectedArtist}
          onSelectArtist={setSelectedArtist}
        />
      )}
    </div>
  );
};

export default Bookings;