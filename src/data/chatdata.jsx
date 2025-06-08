// Dummy data for chat functionality
export const dummyContacts = [
    {
      id: 1,
      name: 'Alex Johnson',
      username: 'alexj',
      avatar_url: 'https://randomuser.me/api/portraits/men/32.jpg',
      online: true,
      lastMessage: 'Can we discuss the set list for Saturday?',
      lastMessageTime: new Date(Date.now() - 15 * 60000).toISOString(),
      unread: 2
    },
    {
      id: 2,
      name: 'Maya Williams',
      username: 'mayaw',
      avatar_url: 'https://randomuser.me/api/portraits/women/44.jpg',
      online: true,
      lastMessage: 'I loved your new track! The beats are incredible.',
      lastMessageTime: new Date(Date.now() - 2 * 3600000).toISOString(),
      unread: 0
    },
    {
      id: 3,
      name: 'Rhythm Records',
      username: 'rhythm_records',
      avatar_url: 'https://randomuser.me/api/portraits/men/45.jpg',
      online: false,
      lastMessage: 'We need to review the contract details before signing.',
      lastMessageTime: new Date(Date.now() - 1 * 86400000).toISOString(),
      unread: 0
    },
    {
      id: 4,
      name: 'DJ Electra',
      username: 'dj_electra',
      avatar_url: 'https://randomuser.me/api/portraits/women/28.jpg',
      online: false,
      lastMessage: 'Would you be interested in a collaboration?',
      lastMessageTime: new Date(Date.now() - 3 * 86400000).toISOString(),
      unread: 1
    },
    {
      id: 5,
      name: 'Steve Martinez',
      username: 'stevem',
      avatar_url: 'https://randomuser.me/api/portraits/men/62.jpg',
      online: true,
      lastMessage: 'The venue is booked for your performance next month.',
      lastMessageTime: new Date(Date.now() - 4 * 86400000).toISOString(),
      unread: 0
    }
  ];
  
  export const dummyMessages = [
    // Conversation 1
    {
      id: 'm1',
      conversationId: 1,
      sender_id: 1,
      content: 'Hey there! I was wondering if we could discuss the set list for Saturday\'s show.',
      created_at: new Date(Date.now() - 30 * 60000).toISOString(),
      read: true
    },
    {
      id: 'm2',
      conversationId: 1,
      sender_id: 'current-user',
      content: 'Sure! I was thinking of starting with the new track "Midnight".',
      created_at: new Date(Date.now() - 25 * 60000).toISOString(),
      read: true
    },
    {
      id: 'm3',
      conversationId: 1,
      sender_id: 1,
      content: 'That sounds great! How about following up with "Electric Dreams"?',
      created_at: new Date(Date.now() - 20 * 60000).toISOString(),
      read: true
    },
    {
      id: 'm4',
      conversationId: 1,
      sender_id: 1,
      content: 'Also, I was wondering if we could add a cover song to the lineup?',
      created_at: new Date(Date.now() - 15 * 60000).toISOString(),
      read: false
    },
    
    // Conversation 2
    {
      id: 'm5',
      conversationId: 2,
      sender_id: 'current-user',
      content: 'Hey Maya! Just released a new track. Would love to hear your thoughts!',
      created_at: new Date(Date.now() - 5 * 3600000).toISOString(),
      read: true
    },
    {
      id: 'm6',
      conversationId: 2,
      sender_id: 2,
      content: 'Just listened to it! The beats are incredible, and I loved the melody.',
      created_at: new Date(Date.now() - 3 * 3600000).toISOString(),
      read: true
    },
    {
      id: 'm7',
      conversationId: 2,
      sender_id: 2,
      content: 'The production quality is top-notch. How long did it take you to mix?',
      created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
      read: true
    },
    
    // Conversation 3
    {
      id: 'm8',
      conversationId: 3,
      sender_id: 3,
      content: 'We\'ve prepared the contract for your upcoming album release.',
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      read: true
    },
    {
      id: 'm9',
      conversationId: 3,
      sender_id: 'current-user',
      content: 'Great! When can we go through the details?',
      created_at: new Date(Date.now() - 1.5 * 86400000).toISOString(),
      read: true
    },
    {
      id: 'm10',
      conversationId: 3,
      sender_id: 3,
      content: 'How about tomorrow at 3 PM? We need to review the contract details before signing.',
      created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      read: true
    },
    
    // Conversation 4
    {
      id: 'm11',
      conversationId: 4,
      sender_id: 4,
      content: 'Your latest track is fire! 🔥',
      created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      read: true
    },
    {
      id: 'm12',
      conversationId: 4,
      sender_id: 'current-user',
      content: 'Thanks! Been working on it for months.',
      created_at: new Date(Date.now() - 3.5 * 86400000).toISOString(),
      read: true
    },
    {
      id: 'm13',
      conversationId: 4,
      sender_id: 4,
      content: 'Would you be interested in a collaboration? I think our styles would mesh well.',
      created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
      read: false
    },
    
    // Conversation 5
    {
      id: 'm14',
      conversationId: 5,
      sender_id: 'current-user',
      content: 'Hey Steve, any update on the venue booking for next month?',
      created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      read: true
    },
    {
      id: 'm15',
      conversationId: 5,
      sender_id: 5,
      content: 'Good news! The venue is booked for your performance next month. July 15th at 8 PM.',
      created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      read: true
    }
  ];