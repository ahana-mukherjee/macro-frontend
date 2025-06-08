import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/header/Header';
import Trending from './components/Trending/Trending';
import Dashboard from './components/Dashboard/Dashboard';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Post from './components/Post/Post';
import ChatList from './components/ChatList/ChatList';
import Chat from './components/Chat/Chat';
import { FaArrowUp } from 'react-icons/fa';

function App() {
  const [isPlaying, setIsPlaying] = useState({});
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [liked, setLiked] = useState({});
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const feedRef = useRef(null);
  const [chats, setChats] = useState([
    { id: 1, name: 'Artist 1', lastMessage: 'Check out my new track!', messages: [{ text: 'Check out my new track!', sender: 'them', timestamp: Date.now() - 3600000 }] },
    { id: 2, name: 'Artist 2', lastMessage: 'Thanks for the follow!', messages: [{ text: 'Thanks for the follow!', sender: 'them', timestamp: Date.now() - 7200000 }] },
    { id: 3, name: 'Artist 3', lastMessage: 'Let\'s collaborate!', messages: [{ text: 'Let\'s collaborate!', sender: 'them', timestamp: Date.now() - 10800000 }] },
    { id: 4, name: 'Artist 4', lastMessage: 'New EP dropping soon', messages: [{ text: 'New EP dropping soon', sender: 'them', timestamp: Date.now() - 14400000 }] },
  ]);

  const handlePlayPause = () => {
    if (currentTrackId === null) return;
    setIsPlaying(prev => ({
      ...prev,
      [currentTrackId]: !prev[currentTrackId]
    }));
  };

  const handleLike = (postId) => {
    setLiked(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleSetCurrentTrack = (postId) => {
    setCurrentTrackId(postId);
  };

  const handleChatSelect = (chat) => {
    setActiveChat(chat);
  };

  const handleBackToChatList = () => {
    setActiveChat(null);
  };

  const handleSendMessage = (chatId, messageText) => {
    const newMessage = {
      text: messageText,
      sender: 'me',
      timestamp: Date.now()
    };

    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId 
          ? { 
              ...chat, 
              messages: [...chat.messages, newMessage],
              lastMessage: messageText
            } 
          : chat
      )
    );

    if (activeChat && activeChat.id === chatId) {
      setActiveChat(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessage: messageText
      }));
    }
  };

  useEffect(() => {
    const feedElement = feedRef.current;
    if (!feedElement) return;

    const handleScroll = () => {
      if (feedElement.scrollTop > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    feedElement.addEventListener('scroll', handleScroll);
    return () => feedElement.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (feedRef.current) {
      feedRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Mock data for posts
  const posts = [
    {
      id: 1,
      username: 'artist1',
      time: '2h ago',
      release: 'Summer Vibes',
      hashtags: '#summer #beats #music',
      image: 'https://source.unsplash.com/random/800x400?music,summer',
    },
    {
      id: 2,
      username: 'dj_pro',
      time: '5h ago',
      release: 'Night Drive',
      hashtags: '#electronic #night #drive',
      image: 'https://source.unsplash.com/random/800x400?music,night',
    },
    {
      id: 3,
      username: 'chill_wave',
      time: '1d ago',
      release: 'Lofi Beats',
      hashtags: '#lofi #chill #study',
      image: 'https://source.unsplash.com/random/800x400?music,lofi',
    },
    {
      id: 4,
      username: 'bass_master',
      time: '3h ago',
      release: 'Deep Bass Drops',
      hashtags: '#bass #edm #dubstep',
      image: 'https://source.unsplash.com/random/800x400?music,bass',
    },
    {
      id: 5,
      username: 'jazz_cat',
      time: '7h ago',
      release: 'Smooth Jazz',
      hashtags: '#jazz #relax #instrumental',
      image: 'https://source.unsplash.com/random/800x400?music,jazz',
    },
  ];

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <div className="left-sidebar">
          <Trending />
          <MusicPlayer 
            isPlaying={currentTrackId !== null ? isPlaying[currentTrackId] : false} 
            onPlayPause={handlePlayPause} 
            trackTitle={currentTrackId !== null ? posts.find(p => p.id === currentTrackId)?.release : 'No Track Selected'}
            artistName={currentTrackId !== null ? posts.find(p => p.id === currentTrackId)?.username : ''}
          />
        </div>
        
        <div className="feed" ref={feedRef}>
          {posts.map(post => (
            <Post
              key={post.id}
              id={post.id}
              username={post.username}
              time={post.time}
              release={post.release}
              hashtags={post.hashtags}
              image={post.image}
              isPlaying={isPlaying[post.id] || false}
              onPlayPause={() => {
                handleSetCurrentTrack(post.id);
                handlePlayPause(post.id);
              }}
              liked={liked[post.id] || false}
              onLike={() => handleLike(post.id)}
            />
          ))}
        </div>
        
        <div className="right-sidebar">
          <Dashboard />
          {activeChat ? (
            <Chat 
              activeChat={activeChat} 
              onBack={handleBackToChatList} 
              onSendMessage={handleSendMessage}
            />
          ) : (
            <ChatList 
              chats={chats} 
              onChatSelect={handleChatSelect} 
            />
          )}
        </div>
        
        {/* Scroll to Top Button - Fixed position at bottom right */}
        <button 
          onClick={scrollToTop}
          className={`scroll-to-top ${showScrollButton ? 'visible' : ''}`}
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
}

export default App;