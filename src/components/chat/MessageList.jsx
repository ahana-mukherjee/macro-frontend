import React from 'react';
import { format } from 'date-fns';

const MessageList = ({ messages, currentUserId }) => {
  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.created_at).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(groupedMessages).map(([date, dayMessages]) => (
        <div key={date}>
          <div className="flex items-center justify-center my-4">
            <div className="h-px bg-gray-800 flex-grow"></div>
            <span className="px-4 text-sm text-gray-500">
              {new Date(date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
            <div className="h-px bg-gray-800 flex-grow"></div>
          </div>
          
          <div className="space-y-4">
            {dayMessages.map((message) => {
              const isCurrentUser = message.sender_id === currentUserId;
              
              return (
                <div 
                  key={message.id} 
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs md:max-w-md ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                    <div 
                      className={`px-4 py-2 rounded-lg ${
                        isCurrentUser 
                          ? 'bg-purple-600 text-white rounded-br-none' 
                          : 'bg-gray-800 text-white rounded-bl-none'
                      }`}
                    >
                      {message.content}
                    </div>
                    <div 
                      className={`mt-1 text-xs text-gray-500 ${
                        isCurrentUser ? 'text-right' : 'text-left'
                      }`}
                    >
                      {format(new Date(message.created_at), 'h:mm a')}
                    </div>
                  </div>
                  
                  {!isCurrentUser && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 order-0 mr-2">
                      <img 
                        src={message.sender?.avatar_url || 'https://via.placeholder.com/32'} 
                        alt={message.sender?.username || 'User'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      
      {messages.length === 0 && (
        <div className="text-center py-8">
          <div className="inline-block p-3 rounded-full bg-gray-800 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-gray-400">No messages yet. Start the conversation!</p>
        </div>
      )}
    </div>
  );
};

export default MessageList;