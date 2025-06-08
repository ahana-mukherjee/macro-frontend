import { createContext, useContext, useState, useEffect } from 'react';
import { dummyContacts, dummyMessages } from '../data/chatData';

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(true); // Simulate WebSocket connection

  // Load dummy conversations on mount
  useEffect(() => {
    const loadDummyData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setConversations(dummyContacts);
      setLoading(false);
    };
    
    loadDummyData();
  }, []);

  // Load messages when active conversation changes
  useEffect(() => {
    if (!activeConversation) return;
    
    const loadMessages = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400));
      // Filter messages for the current conversation
      const conversationMessages = dummyMessages.filter(
        msg => msg.conversationId === activeConversation.id
      );
      setMessages(conversationMessages);
    };
    
    loadMessages();
  }, [activeConversation]);

  const selectConversation = (conversation) => {
    setActiveConversation(conversation);
  };

  const sendMessage = (content) => {
    if (!activeConversation) return;
    
    // Create a new message
    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversation.id,
      content,
      sender_id: 'current-user', // Current user id
      created_at: new Date().toISOString(),
      read: true
    };
    
    // Add to messages state
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Update last message in conversation
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === activeConversation.id 
          ? { 
              ...conv, 
              lastMessage: content,
              lastMessageTime: new Date().toISOString()
            } 
          : conv
      )
    );
  };

  const value = {
    conversations,
    activeConversation,
    messages,
    loading,
    connected,
    selectConversation,
    sendMessage
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;