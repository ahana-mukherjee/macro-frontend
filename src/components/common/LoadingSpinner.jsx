import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'purple', 
  className = '',
  fullScreen = false
}) => {
  const sizeClasses = {
    xs: 'h-3 w-3 border-2',
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-3',
    xl: 'h-12 w-12 border-4'
  };
  
  const colorClasses = {
    white: 'border-white/20 border-t-white',
    gray: 'border-gray-700 border-t-gray-300',
    purple: 'border-purple-900 border-t-purple-500',
    blue: 'border-blue-900 border-t-blue-500'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.md;
  const spinnerColor = colorClasses[color] || colorClasses.purple;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50">
        <div className={`animate-spin rounded-full ${spinnerSize} ${spinnerColor} ${className}`}></div>
      </div>
    );
  }

  return (
    <div className={`animate-spin rounded-full ${spinnerSize} ${spinnerColor} ${className}`}></div>
  );
};

export default LoadingSpinner;