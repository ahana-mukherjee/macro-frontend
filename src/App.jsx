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
import { ChatProvider } from './contexts/ChatContext'

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token')
    // For demo purposes, always consider the user authenticated
    // In a real app, you would validate the token with your backend
    setAuthenticated(true)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout authenticated={authenticated} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<MainLayout authenticated={authenticated} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<MusicUpload />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/search" element={<Search />} />
        
        {/* Chat Routes - Wrapped with ChatProvider */}
        <Route path="/chat" element={
          <ChatProvider>
            <Chat />
          </ChatProvider>
        } />
        <Route path="/chat/:id" element={
          <ChatProvider>
            <Chat />
          </ChatProvider>
        } />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App