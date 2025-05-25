import { useState } from 'react';

const ChatHeader = ({ conversation, connected }) => {
  const [showOptions, setShowOptions] = useState(false);
  
  return (
    <div className="flex items-center justify-between border-b border-dark-border p-4 bg-dark-DEFAULT">
      {/* User info */}
      <div className="flex items-center">
        <div className="relative mr-3">
          <img
            src={conversation.avatar_url}
            alt={conversation.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {conversation.online && (
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-secondary border-2 border-dark-DEFAULT"></span>
          )}
        </div>
        
        <div>
          <h3 className="text-light-DEFAULT font-medium">{conversation.name}</h3>
          <div className="flex items-center">
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
              connected ? 'bg-secondary' : 'bg-light-subtle'
            }`}></span>
            <span className="text-xs text-light-subtle">
              {connected 
                ? conversation.online ? 'Online' : 'Offline' 
                : 'Connecting...'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex items-center">
        <button className="p-2 rounded-full text-light-subtle hover:text-light-DEFAULT hover:bg-dark-lighter transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        
        <button className="p-2 rounded-full text-light-subtle hover:text-light-DEFAULT hover:bg-dark-lighter transition-colors ml-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        
        <div className="relative ml-1">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 rounded-full text-light-subtle hover:text-light-DEFAULT hover:bg-dark-lighter transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
          
          {showOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-dark-lighter rounded-md shadow-lg z-10 border border-dark-border">
              <div className="py-1">
                <button className="w-full text-left px-4 py-2 text-sm text-light-DEFAULT hover:bg-dark-lightest flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Save conversation
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-light-DEFAULT hover:bg-dark-lightest flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-light-DEFAULT hover:bg-dark-lightest flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  Block user
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-dark-lightest flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete conversation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;