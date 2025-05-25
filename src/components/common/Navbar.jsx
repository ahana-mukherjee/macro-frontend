import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MenuIcon, BellIcon, ChatIcon } from '@heroicons/react/outline'
import { BellIcon as BellIconSolid, ChatIcon as ChatIconSolid } from '@heroicons/react/solid'

function Navbar({ onMenuClick }) {
  const [notifications] = useState(3) // Example count
  const [messages] = useState(2) // Example count
  const [user] = useState({
    name: 'Jane Doe',
    avatar: null // We'll use initials instead
  })
  
  // Get initials for the avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
  }

  return (
    <header className="bg-dark-lighter border-b border-dark-border h-16 flex items-center px-4 md:px-6">
      {/* Mobile menu button */}
      <button 
        onClick={onMenuClick}
        className="md:hidden rounded-md p-2 text-light-muted hover:bg-dark-lightest hover:text-light mr-4"
      >
        <MenuIcon className="h-6 w-6" />
      </button>
      
      {/* Page title - could be dynamic based on current route */}
      <h1 className="text-xl font-semibold">MACRO</h1>
      
      <div className="ml-auto flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <Link 
            to="/notifications" 
            className="p-2 rounded-full hover:bg-dark-lightest text-light-muted hover:text-light"
          >
            {notifications > 0 ? (
              <BellIconSolid className="h-6 w-6 text-primary" />
            ) : (
              <BellIcon className="h-6 w-6" />
            )}
            {notifications > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-secondary text-xs text-white font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Link>
        </div>
        
        {/* Messages */}
        <div className="relative">
          <Link 
            to="/chat" 
            className="p-2 rounded-full hover:bg-dark-lightest text-light-muted hover:text-light"
          >
            {messages > 0 ? (
              <ChatIconSolid className="h-6 w-6 text-primary" />
            ) : (
              <ChatIcon className="h-6 w-6" />
            )}
            {messages > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-secondary text-xs text-white font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {messages}
              </span>
            )}
          </Link>
        </div>
        
        {/* User menu */}
        <div className="relative">
          <Link to="/profile" className="flex items-center">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
              ) : (
                <span className="font-semibold">{getInitials(user.name)}</span>
              )}
            </div>
            <span className="hidden md:block ml-2 text-light">{user.name}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar