import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Upload from './pages/MusicUpload'
import Chat from './pages/Chat'
import Bookings from './pages/Bookings'
import Search from './pages/Search'
//import Notifications from './pages/Notifications'
//import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {
  const isAuthenticated = !!localStorage.getItem('authToken')

  return (
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />

        {/* Protected Routes within Main Layout */}
        {isAuthenticated ? (
          <Route path="/" element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
  )
}

export default App;