import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const ChatSidebar = ({ conversations, activeConversation, onSelectConversation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    conversation => 
      conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="w-80 flex-shrink-0 bg-dark-DEFAULT border-r border-dark-border rounded-l-lg">
      {/* Search Bar */}
      <div className="p-4 border-b border-dark-border">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-lighter text-light-DEFAULT px-4 py-2 pl-10 rounded-md border border-dark-border focus:outline-none focus:border-primary"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-2.5 text-light-subtle"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      
      {/* Conversations List */}
      <div className="h-full overflow-y-auto pb-20">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-light-subtle p-4">Messages</h3>
        
        {filteredConversations.length === 0 ? (
          <div className="text-center py-8 text-light-subtle">
            No conversations found
          </div>
        ) : (
          <ul>
            {filteredConversations.map((conversation) => (
              <li key={conversation.id}>
                <button
                  onClick={() => onSelectConversation(conversation)}
                  className={`w-full text-left px-4 py-3 flex items-start hover:bg-dark-lighter transition-colors ${
                    activeConversation?.id === conversation.id ? 'bg-dark-lighter' : ''
                  }`}
                >
                  <div className="relative mr-3 flex-shrink-0">
                    <img
                      src={conversation.avatar_url}
                      alt={conversation.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-secondary border-2 border-dark-DEFAULT"></span>
                    )}
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm font-medium text-light-DEFAULT truncate">{conversation.name}</h4>
                      <span className="text-xs text-light-subtle">
                        {formatDistanceToNow(new Date(conversation.lastMessageTime), { addSuffix: false })}
                      </span>
                    </div>
                    
                    <div className="flex items-center mt-1">
                      <p className="text-xs text-light-muted truncate mr-2">{conversation.lastMessage}</p>
                      
                      {conversation.unread > 0 && (
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-xs font-medium text-white">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;