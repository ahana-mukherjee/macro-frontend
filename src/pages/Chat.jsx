import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';
import ChatSkeleton from '../components/skeletons/ChatSkeleton';
import useWebSocket from '../hooks/useWebSocket';
import { useAuth } from '../contexts/AuthContext';

const Chat = () => {
  const { id: chatId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  
  // Socket connection for real-time messaging
  const { connected, send, lastMessage } = useWebSocket(
    chatId ? `ws://localhost:8000/ws/chat/${chatId}/` : null
  );

  // Fetch user conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/messages/conversations/');
        setConversations(response.data);
        
        // If chatId is provided in URL, set it as active
        if (chatId) {
          const conversation = response.data.find(c => c.id === parseInt(chatId));
          setActiveConversation(conversation || null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        setLoading(false);
      }
    };
    
    fetchConversations();
  }, [chatId]);

  // Fetch messages for active conversation
  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeConversation) return;
      
      try {
        const response = await axios.get(`/api/messages/conversations/${activeConversation.id}/`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    
    fetchMessages();
  }, [activeConversation]);

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage);
        if (data.type === 'chat_message') {
          setMessages(prevMessages => [...prevMessages, data.message]);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    }
  }, [lastMessage]);

  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (content) => {
    if (!activeConversation || !connected) return;
    
    send(JSON.stringify({
      type: 'chat_message',
      message: {
        sender_id: user.id,
        receiver_id: activeConversation.user.id,
        content
      }
    }));
  };

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    // Update URL without reloading
    window.history.pushState({}, '', `/chat/${conversation.id}`);
  };

  if (loading) {
    return <ChatSkeleton />;
  }

  return (
    <div className="flex h-full bg-gray-900">
      {/* Chat Sidebar */}
      <ChatSidebar 
        conversations={conversations}
        activeConversation={activeConversation}
        onSelectConversation={handleSelectConversation}
      />
      
      {/* Chat Main Area */}
      <div className="flex flex-col flex-grow border-l border-gray-800">
        {activeConversation ? (
          <>
            <ChatHeader conversation={activeConversation} connected={connected} />
            
            <div className="flex-grow overflow-y-auto p-4 bg-gray-900">
              <MessageList 
                messages={messages} 
                currentUserId={user?.id} 
              />
              <div ref={messagesEndRef} />
            </div>
            
            <MessageInput 
              onSendMessage={handleSendMessage} 
              disabled={!connected}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
              <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;