import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserCircle, 
  Music, 
  Calendar, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Clock 
} from 'lucide-react';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    totalPlays: 0,
    followers: 0,
    pendingBookings: 0,
    unreadMessages: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simulating API calls
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be API calls
        const userResponse = { 
          data: { 
            id: 1, 
            username: 'jazzmusician', 
            name: 'Alex Johnson', 
            role: 'artist', 
            profileImage: null 
          } 
        };
        
        const statsResponse = { 
          data: { 
            totalPlays: 2547, 
            followers: 142, 
            pendingBookings: 3, 
            unreadMessages: 5 
          } 
        };
        
        const activityResponse = { 
          data: [
            { id: 1, type: 'like', user: 'Sarah M.', content: 'liked your new track "Midnight Blues"', time: '2 hours ago' },
            { id: 2, type: 'booking', user: 'Jazz Cafe', content: 'sent you a booking request for July 15', time: '5 hours ago' },
            { id: 3, type: 'comment', user: 'Mike T.', content: 'commented on your track "Urban Sounds"', time: '1 day ago' },
            { id: 4, type: 'follow', user: 'Emma W.', content: 'started following you', time: '1 day ago' },
            { id: 5, type: 'message', user: 'David K.', content: 'sent you a message', time: '2 days ago' }
          ] 
        };

        setUserData(userResponse.data);
        setStats(statsResponse.data);
        setRecentActivity(activityResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'like':
        return <TrendingUp className="text-pink-500" size={18} />;
      case 'booking':
        return <Calendar className="text-green-500" size={18} />;
      case 'comment':
        return <MessageSquare className="text-blue-500" size={18} />;
      case 'follow':
        return <Users className="text-purple-500" size={18} />;
      case 'message':
        return <MessageSquare className="text-yellow-500" size={18} />;
      default:
        return <Clock className="text-gray-500" size={18} />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back, {userData?.name || userData?.username}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 font-medium">Total Plays</h3>
            <Music className="text-indigo-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalPlays.toLocaleString()}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 font-medium">Followers</h3>
            <Users className="text-indigo-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">{stats.followers.toLocaleString()}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 font-medium">Pending Bookings</h3>
            <Calendar className="text-indigo-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">{stats.pendingBookings}</p>
          {stats.pendingBookings > 0 && (
            <Link to="/bookings" className="text-indigo-400 text-sm mt-2 inline-block hover:text-indigo-300">
              Review bookings →
            </Link>
          )}
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 font-medium">Unread Messages</h3>
            <MessageSquare className="text-indigo-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">{stats.unreadMessages}</p>
          {stats.unreadMessages > 0 && (
            <Link to="/chat" className="text-indigo-400 text-sm mt-2 inline-block hover:text-indigo-300">
              Open messages →
            </Link>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            to="/profile"
            className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            <UserCircle size={24} className="text-indigo-400 mb-2" />
            <span className="text-white">View Profile</span>
          </Link>
          
          <Link 
            to="/upload"
            className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            <Music size={24} className="text-indigo-400 mb-2" />
            <span className="text-white">Upload Music</span>
          </Link>
          
          <Link 
            to="/bookings"
            className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            <Calendar size={24} className="text-indigo-400 mb-2" />
            <span className="text-white">Manage Bookings</span>
          </Link>
          
          <Link 
            to="/chat"
            className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            <MessageSquare size={24} className="text-indigo-400 mb-2" />
            <span className="text-white">Messages</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg">
                <div className="p-2 bg-gray-600 rounded-full">
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <p className="text-white">
                    <span className="font-medium">{activity.user}</span> {activity.content}
                  </p>
                  <p className="text-gray-400 text-sm">{activity.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No recent activity to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;