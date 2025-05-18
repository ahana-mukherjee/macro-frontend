import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for WebSocket connection management
 * @param {string|null} url - WebSocket URL to connect to (null to disable)
 * @param {Object} options - Additional options
 * @param {number} options.reconnectInterval - Time in ms to wait before reconnecting (default: 2000)
 * @param {number} options.maxReconnectAttempts - Max number of reconnect attempts (default: 5)
 * @returns {Object} WebSocket connection state and methods
 */
const useWebSocket = (url, options = {}) => {
  const { 
    reconnectInterval = 2000, 
    maxReconnectAttempts = 5 
  } = options;
  
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);
  
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  // Clean up function to close socket and clear timeouts
  const cleanUp = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  // Connect to WebSocket
  const connect = useCallback(() => {
    if (!url) return;
    
    cleanUp();
    
    try {
      const socket = new WebSocket(url);
      socketRef.current = socket;
      
      socket.onopen = () => {
        setConnected(true);
        setReconnectAttempt(0);
        console.log('WebSocket connected');
      };
      
      socket.onmessage = (event) => {
        setLastMessage(event.data);
      };
      
      socket.onclose = (event) => {
        setConnected(false);
        console.log(`WebSocket closed: ${event.code} ${event.reason}`);
        
        // Attempt to reconnect if not closed cleanly and under max attempts
        if (!event.wasClean && reconnectAttempt < maxReconnectAttempts) {
          reconnectTimeoutRef.current = setTimeout(() => {
            setReconnectAttempt(prev => prev + 1);
            connect();
          }, reconnectInterval);
        }
      };
      
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
    }
  }, [url, reconnectAttempt, maxReconnectAttempts, reconnectInterval, cleanUp]);

  // Send message through WebSocket
  const send = useCallback((data) => {
    if (socketRef.current && connected) {
      socketRef.current.send(data);
      return true;
    }
    return false;
  }, [connected]);

  // Initialize connection when URL changes
  useEffect(() => {
    if (url) {
      connect();
    } else {
      cleanUp();
      setConnected(false);
    }
    
    return cleanUp;
  }, [url, connect, cleanUp]);

  return {
    connected,
    lastMessage,
    send,
    reconnectAttempt
  };
};

export default useWebSocket;