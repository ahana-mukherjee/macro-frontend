import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for websocket connection
 * This is a mock implementation for demo purposes
 * In a real app, you would use an actual WebSocket connection
 */
const useWebSocket = (url) => {
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const socketRef = useRef(null);

  // Connect to WebSocket
  useEffect(() => {
    if (!url) {
      setConnected(false);
      return;
    }

    // Simulate connecting to WebSocket
    const connectTimeout = setTimeout(() => {
      setConnected(true);
      console.log(`[WebSocket Mock] Connected to ${url}`);
    }, 1000);

    return () => {
      clearTimeout(connectTimeout);
      setConnected(false);
      console.log('[WebSocket Mock] Disconnected');
    };
  }, [url]);

  // Mock send function
  const send = useCallback((data) => {
    if (!connected) {
      console.warn('[WebSocket Mock] Cannot send message: not connected');
      return;
    }

    try {
      console.log('[WebSocket Mock] Sending message:', data);
      const parsedData = JSON.parse(data);

      // Simulate receiving the message back from the server
      setTimeout(() => {
        setLastMessage(JSON.stringify({
          type: parsedData.type,
          message: {
            ...parsedData.message,
            id: `msg-${Date.now()}`,
            created_at: new Date().toISOString()
          }
        }));
      }, 300);
    } catch (error) {
      console.error('[WebSocket Mock] Error sending message:', error);
    }
  }, [connected]);

  return { connected, send, lastMessage };
};

export default useWebSocket;