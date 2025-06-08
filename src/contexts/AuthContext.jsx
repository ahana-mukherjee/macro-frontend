import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock user for demo purposes
  const demoUser = {
    id: 'current-user',
    name: 'Demo User',
    username: 'demo_user',
    email: 'demo@macro.com',
    avatar_url: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'artist',
    bio: 'Professional music producer and DJ',
    location: 'Los Angeles, CA',
    genres: ['Electronic', 'House', 'Techno']
  };

  // Load user on mount (simulating fetching user data)
  useEffect(() => {
    const loadUser = async () => {
      try {
        // In a real app, you would fetch the user from your API
        // const response = await axios.get('/api/auth/me');
        // setUser(response.data);
        
        // For demo, use mock user
        await new Promise(resolve => setTimeout(resolve, 500)); // Fake delay
        setUser(demoUser);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Mock login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      // In a real app, you would call your API here
      // const response = await axios.post('/api/auth/login', { email, password });
      // localStorage.setItem('token', response.data.token);
      
      // For demo, just set the user after a fake delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(demoUser);
      localStorage.setItem('token', 'demo-token');
      setLoading(false);
      return true;
    } catch (error) {
      setError(error);
      setLoading(false);
      return false;
    }
  };

  // Mock register function
  const register = async (userData) => {
    try {
      setLoading(true);
      // In a real app, you would call your API here
      // const response = await axios.post('/api/auth/register', userData);
      
      // For demo, just set the user after a fake delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(demoUser);
      localStorage.setItem('token', 'demo-token');
      setLoading(false);
      return true;
    } catch (error) {
      setError(error);
      setLoading(false);
      return false;
    }
  };

  // Mock logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;