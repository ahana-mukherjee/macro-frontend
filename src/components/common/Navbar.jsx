// components/Navbar.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MenuIcon, BellIcon, ChatIcon } from '@heroicons/react/outline'
import { BellIcon as BellSolid, ChatIcon as ChatSolid } from '@heroicons/react/solid'

function Navbar({ onMenuClick }) {
  const [notifications] = useState(3)
  const [messages] = useState(2)
  const [user] = useState({ name: 'Jane Doe', avatar: null })

  const getInitials = (name) => name.split(' ').map(part => part[0]).join('').toUpperCase()

  return (
    <header className="bg-dark-lighter/90 backdrop-blur border-b border-dark-border h-16 flex items-center px-4 md:px-6 shadow-sm">
      <button
        onClick={onMenuClick}
        className="md:hidden rounded p-2 text-light-muted hover:bg-dark-lightest hover:text-light mr-4"
      >
        <MenuIcon className="h-6 w-6" />
      </button>
      <h1 className="text-xl font-bold tracking-wide text-light">MACRO</h1>
      <div className="ml-auto flex items-center space-x-4">
        <IconButton to="/notifications" icon={notifications ? BellSolid : BellIcon} count={notifications} />
        <IconButton to="/chat" icon={messages ? ChatSolid : ChatIcon} count={messages} />
        <Link to="/profile" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
            {user.avatar
              ? <img src={user.avatar} alt={user.name} className="rounded-full w-full h-full object-cover" />
              : <span className="font-semibold">{getInitials(user.name)}</span>}
          </div>
          <span className="hidden md:block text-light">{user.name}</span>
        </Link>
      </div>
    </header>
  )
}

function IconButton({ to, icon: Icon, count }) {
  return (
    <div className="relative">
      <Link
        to={to}
        className="p-2 rounded-full hover:bg-dark-lightest text-light-muted hover:text-light"
      >
        <Icon className={`h-6 w-6 ${count ? 'text-primary' : ''}`} />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-secondary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center text-white">
            {count}
          </span>
        )}
      </Link>
    </div>
  )
}

export default Navbar
