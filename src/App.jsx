import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import MusicUpload from './pages/MusicUpload'
import Chat from './pages/Chat'
import Bookings from './pages/Bookings'
import Search from './pages/Search'
import NotFound from './pages/NotFound'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      // In a real app, you would verify the token with your backend
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/feed" />} />
        <Route path="/register" element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/feed" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      
      {/* Protected routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/feed" element={isAuthenticated ? <Feed /> : <Navigate to="/login" />} />
        <Route path="/profile/:id?" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/upload" element={isAuthenticated ? <MusicUpload /> : <Navigate to="/login" />} />
        <Route path="/chat/:id?" element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/bookings" element={isAuthenticated ? <Bookings /> : <Navigate to="/login" />} />
        <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/login" />} />
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;