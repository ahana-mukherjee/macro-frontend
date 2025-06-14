import { NavLink } from 'react-router-dom'
import { 
  HomeIcon, 
  RssIcon, 
  UserIcon, 
  UploadIcon, 
  ChatIcon, 
  CalendarIcon, 
  SearchIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  LogoutIcon 
} from '@heroicons/react/outline'
import Logo from './Logo'

function Sidebar({ isCollapsed, toggleSidebar }) {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
    { name: 'Feed', path: '/feed', icon: RssIcon },
    { name: 'Profile', path: '/profile', icon: UserIcon },
    { name: 'Upload Music', path: '/upload', icon: UploadIcon },
    { name: 'Chat', path: '/chat', icon: ChatIcon },
    { name: 'Bookings', path: '/bookings', icon: CalendarIcon },
    { name: 'Search', path: '/search', icon: SearchIcon }
  ]

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    window.location.href = '/login'
  }

  const activeClass = "bg-dark-lightest text-primary"
  const inactiveClass = "text-light-muted hover:bg-dark-lightest hover:text-light"
  const baseClass = "flex items-center px-4 py-3 rounded-md transition-colors duration-200"

  return (
    <div className="flex flex-col h-full bg-dark-lighter border-r border-dark-border">
      <div className="flex items-center justify-between h-16 px-4">
        {!isCollapsed && <Logo size="small" />}
        {isCollapsed && <div className="w-full flex justify-center">
          <Logo size="small" linkTo="#" />
        </div>}
        <button onClick={toggleSidebar} className="rounded-md p-1 text-light-muted hover:bg-dark-lightest hover:text-light">
          {isCollapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass} ${isCollapsed ? 'justify-center' : 'justify-start'} my-1 mx-2`
            }
          >
            <item.icon className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && <span className="ml-3">{item.name}</span>}
          </NavLink>
        ))}
      </div>

      <div className="p-4">
        <button 
          onClick={handleLogout}
          className={`${baseClass} ${inactiveClass} w-full ${isCollapsed ? 'justify-center' : 'justify-start'}`}
        >
          <LogoutIcon className="w-6 h-6" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar