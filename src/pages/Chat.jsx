import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';
import ChatSkeleton from '../components/skeletons/ChatSkeleton';
import { useChatContext } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';

const Chat = () => {
  const { id: chatId } = useParams();
  const { user } = useAuth() || { user: { id: 'current-user' } }; // Fallback for demo
  const { 
    loading, 
    conversations, 
    activeConversation, 
    messages, 
    connected, 
    selectConversation,
    sendMessage 
  } = useChatContext();
  const messagesEndRef = useRef(null);
  
  // Set active conversation from URL param
  useEffect(() => {
    if (chatId && conversations.length > 0) {
      const conversation = conversations.find(c => c.id === parseInt(chatId));
      if (conversation) {
        selectConversation(conversation);
      }
    }
  }, [chatId, conversations, selectConversation]);

  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle selecting a conversation
  const handleSelectConversation = (conversation) => {
    selectConversation(conversation);
    // Update URL without reloading
    window.history.pushState({}, '', `/chat/${conversation.id}`);
  };

  if (loading) {
    return <ChatSkeleton />;
  }

  return (
    <div className="flex h-full bg-dark-DEFAULT rounded-lg shadow-xl">
      {/* Chat Sidebar */}
      <ChatSidebar 
        conversations={conversations}
        activeConversation={activeConversation}
        onSelectConversation={handleSelectConversation}
      />
      
      {/* Chat Main Area */}
      <div className="flex flex-col flex-grow border-l border-dark-border rounded-r-lg">
        {activeConversation ? (
          <>
            <ChatHeader conversation={activeConversation} connected={connected} />
            
            <div className="flex-grow overflow-y-auto p-4 bg-dark-DEFAULT">
              <MessageList 
                messages={messages} 
                currentUserId={user?.id} 
              />
              <div ref={messagesEndRef} />
            </div>
            
            <MessageInput 
              onSendMessage={sendMessage} 
              disabled={!connected}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-light-muted">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2 text-light-DEFAULT">Your Messages</h3>
              <p className="text-light-subtle">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;