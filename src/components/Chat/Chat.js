import React, { useRef, useEffect } from 'react';
import { FiSend, FiChevronLeft } from 'react-icons/fi';
import './Chat.css';

const Chat = ({ activeChat, onBack, onSendMessage }) => {
  const [message, setMessage] = React.useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(activeChat.id, message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat.messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="back-button" onClick={onBack}>
          <FiChevronLeft size={20} />
        </button>
        <div className="chat-user-info">
          <div className="chat-avatar">
            {activeChat.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3>{activeChat.name}</h3>
            <p className="online-status">Online</p>
          </div>
        </div>
      </div>
      
      <div className="chat-messages">
        {activeChat.messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}
          >
            <div className="message-content">{msg.text}</div>
            <div className="message-time">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={handleSend} className="send-button">
          <FiSend size={16} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
