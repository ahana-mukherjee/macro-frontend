import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { NavLink } from 'react-router-dom'
import { 
  HomeIcon, 
  RssIcon, 
  UserIcon, 
  UploadIcon, 
  ChatIcon, 
  CalendarIcon, 
  SearchIcon,
  LogoutIcon 
} from '@heroicons/react/outline'
import Logo from './Logo'

function MobileMenu({ isOpen, onClose }) {
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
    onClose()
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 md:hidden"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex flex-col w-4/5 max-w-xs h-full bg-dark-lighter shadow-xl">
            <div className="flex items-center justify-between h-16 px-4 border-b border-dark-border">
              <Logo size="small" />
              <button
                type="button"
                className="rounded-md p-2 text-light-muted hover:bg-dark-lightest hover:text-light"
                onClick={onClose}
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 my-1 mx-2 rounded-md transition-colors 
                    ${isActive ? 'bg-dark-lightest text-primary' : 'text-light-muted hover:bg-dark-lightest hover:text-light'}`
                  }
                  onClick={onClose}
                >
                  <item.icon className="h-6 w-6 flex-shrink-0" />
                  <span className="ml-3">{item.name}</span>
                </NavLink>
              ))}
            </div>

            <div className="p-4 border-t border-dark-border">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 rounded-md text-light-muted hover:bg-dark-lightest hover:text-light transition-colors"
              >
                <LogoutIcon className="h-6 w-6 flex-shrink-0" />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default MobileMenu;