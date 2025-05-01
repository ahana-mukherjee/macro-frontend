import { Outlet } from 'react-router-dom'
import Logo from '../components/common/Logo'

function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-dark">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center bg-gradient-to-br from-dark to-dark-lighter">
        <div className="max-w-md p-8">
          <Logo size="large" />
          <h1 className="text-4xl font-bold mt-8 mb-4 text-light">MACRO</h1>
          <p className="text-light-muted text-xl mb-6">
            Connect, share, and grow your music career on the platform built for artists.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="bg-dark-lightest p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">Share Music</h3>
              <p className="text-light-subtle text-sm">Upload and showcase your best tracks to fans worldwide</p>
            </div>
            <div className="bg-dark-lightest p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">Connect</h3>
              <p className="text-light-subtle text-sm">Build relationships with fans and other musicians</p>
            </div>
            <div className="bg-dark-lightest p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">Get Bookings</h3>
              <p className="text-light-subtle text-sm">Receive and manage performance opportunities directly</p>
            </div>
            <div className="bg-dark-lightest p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">Grow</h3>
              <p className="text-light-subtle text-sm">Expand your audience and music career with MACRO</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo size="medium" />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout;