import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const ChatSidebar = ({ conversations, activeConversation, onSelectConversation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredConversations = (Array.isArray(conversations) ? conversations : []).filter(conversation => 
    conversation.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-purple-500"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {filteredConversations.length > 0 ? (
          <ul>
            {filteredConversations.map(conversation => (
              <li 
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className={`p-4 border-b border-gray-800 cursor-pointer transition-colors ${
                  activeConversation?.id === conversation.id 
                    ? 'bg-purple-900 bg-opacity-30' 
                    : 'hover:bg-gray-800'
                }`}
              >
                <div className="flex items-start">
                  <div className="relative flex-shrink-0">
                    <img 
                      src={conversation.user.avatar_url || 'https://via.placeholder.com/40'} 
                      alt={conversation.user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {conversation.user.is_online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                    )}
                  </div>
                  <div className="ml-3 flex-grow">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-white">{conversation.user.username}</h3>
                      <span className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(conversation.last_message?.created_at || conversation.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">
                      {conversation.last_message?.content || 'Start a conversation'}
                    </p>
                    {conversation.unread_count > 0 && (
                      <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-purple-600 rounded-full mt-1">
                        {conversation.unread_count}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-gray-400 text-center">
            No conversations found
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
          New Message
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;