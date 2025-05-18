import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar'
import Navbar from '../components/common/Navbar'
import MobileMenu from '../components/common/MobileMenu'

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="flex h-screen bg-dark overflow-hidden">
      {/* Sidebar - hidden on mobile */}
      <div className={`hidden md:block w-64 transition-all duration-300 ease-in-out 
                      ${isSidebarOpen ? 'md:w-64' : 'md:w-20'}`}>
        <Sidebar isCollapsed={!isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      
      {/* Mobile menu - visible on mobile only */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onMenuClick={toggleMobileMenu} />
        <main className="flex-1 overflow-y-auto bg-dark p-4">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout;
