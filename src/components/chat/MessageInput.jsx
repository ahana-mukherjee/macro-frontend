import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t border-dark-border p-4 bg-dark-DEFAULT"
    >
      <div className="flex items-center">
        <button 
          type="button"
          onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
          className="p-2 rounded-full text-light-subtle hover:text-light-DEFAULT hover:bg-dark-lighter transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        
        <button 
          type="button"
          className="p-2 rounded-full text-light-subtle hover:text-light-DEFAULT hover:bg-dark-lighter transition-colors ml-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
        
        <input 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={disabled ? "Connecting..." : "Type a message..."}
          disabled={disabled}
          className="flex-grow mx-3 bg-dark-lightest text-light-DEFAULT px-4 py-2 rounded-md border border-dark-border focus:outline-none focus:border-primary"
        />
        
        <button 
          type="submit"
          disabled={!message.trim() || disabled}
          className={`p-2 rounded-full ${
            !message.trim() || disabled 
              ? 'bg-dark-lighter text-light-subtle' 
              : 'bg-primary text-white hover:bg-primary-hover'
          } transition-colors`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>

      {/* Emoji picker would go here, using a library like emoji-mart */}
      {isEmojiPickerOpen && (
        <div className="mt-2 p-2 bg-dark-lighter rounded-md border border-dark-border">
          <p className="text-light-muted text-sm text-center py-2">
            Emoji picker would be integrated here using a library like emoji-mart
          </p>
        </div>
      )}
    </form>
  );
};

export default MessageInput;