import React from 'react';
import './ChatList.css';

const ChatList = ({ chats, onChatSelect, onClose }) => {
  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        <h3>Chats</h3>
        {onClose && (
          <button onClick={onClose} className="close-button">
            ×
          </button>
        )}
      </div>
      <div className="chat-search">
        <input 
          type="text" 
          placeholder="Search chats..." 
          className="search-input"
        />
      </div>
      <div className="chat-items">
        {chats.map(chat => (
          <div 
            key={chat.id} 
            className="chat-item"
            onClick={() => onChatSelect(chat)}
          >
            <div className="chat-avatar">
              {chat.name.charAt(0).toUpperCase()}
            </div>
            <div className="chat-info">
              <div className="chat-name">{chat.name}</div>
              <div className="chat-preview">
                {chat.lastMessage || 'No messages yet'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
