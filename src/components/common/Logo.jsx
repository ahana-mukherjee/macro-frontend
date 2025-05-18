import { Link } from 'react-router-dom'

function Logo({ size = 'medium', linkTo = '/' }) {
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-10',
    large: 'h-16'
  }
  
  return (
    <Link to={linkTo} className="flex items-center">
      <div className={`flex items-center justify-center overflow-hidden ${sizeClasses[size]}`}>
        <svg 
          viewBox="0 0 80 80" 
          className={`${sizeClasses[size]} text-primary`}
          fill="currentColor"
        >
          <path d="M40 0C17.9 0 0 17.9 0 40s17.9 40 40 40 40-17.9 40-40S62.1 0 40 0zm0 72c-17.6 0-32-14.4-32-32S22.4 8 40 8s32 14.4 32 32-14.4 32-32 32z" />
          <path d="M56 40c0 8.8-7.2 16-16 16V24c8.8 0 16 7.2 16 16z" />
          <path d="M32 40c0-8.8 3.2-16 8-16v32c-4.8 0-8-7.2-8-16z" />
        </svg>
        <span className={`font-bold ml-2 ${size === 'large' ? 'text-2xl' : size === 'medium' ? 'text-xl' : 'text-lg'}`}>
          MACRO
        </span>
      </div>
    </Link>
  )
}

export default Logo;