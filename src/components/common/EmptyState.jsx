import React from 'react';

const EmptyState = ({ 
  icon, 
  title, 
  message, 
  action = null,
  size = 'default' // 'small', 'default', 'large'
}) => {
  const sizeClasses = {
    small: {
      container: 'py-6',
      icon: 'w-12 h-12',
      title: 'text-lg',
    },
    default: {
      container: 'py-12',
      icon: 'w-16 h-16',
      title: 'text-xl',
    },
    large: {
      container: 'py-16',
      icon: 'w-20 h-20',
      title: 'text-2xl',
    }
  };

  const classes = sizeClasses[size] || sizeClasses.default;

  return (
    <div className={`text-center ${classes.container}`}>
      {icon && (
        <div className="inline-flex justify-center items-center rounded-full bg-gray-800 mb-4 p-4">
          {React.cloneElement(icon, { className: `${classes.icon} text-gray-500` })}
        </div>
      )}
      <h3 className={`${classes.title} font-medium text-white mb-2`}>{title}</h3>
      <p className="text-gray-400 max-w-md mx-auto mb-6">{message}</p>
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;