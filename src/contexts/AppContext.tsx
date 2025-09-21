import React, { createContext, useContext, useState } from 'react';
import { JournalEntry, ChatMessage, Challenge, MoodPattern, PeerMessage, MusicRecommendation } from '../types';

interface AppContextType {
  journals: JournalEntry[];
  addJournal: (entry: Omit<JournalEntry, 'id'>) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (message: Omit<ChatMessage, 'id'>) => void;
  challenges: Challenge[];
  completeChallenge: (id: string) => void;
  moodPatterns: MoodPattern[];
  addMoodPattern: (pattern: MoodPattern) => void;
  peerMessages: PeerMessage[];
  addPeerMessage: (message: Omit<PeerMessage, 'id'>) => void;
  musicRecommendations: MusicRecommendation[];
  generateMusicRecommendations: (mood: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Mock data
const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Morning Gratitude',
    description: 'Write down 3 things you\'re grateful for',
    points: 10,
    completed: false,
    category: 'journal',
    icon: '🙏'
  },
  {
    id: '2',
    title: 'Mindful Breathing',
    description: 'Take 5 deep breaths and focus on the present',
    points: 5,
    completed: true,
    category: 'mindfulness',
    icon: '🌬️'
  },
  {
    id: '3',
    title: 'Connect with AI',
    description: 'Have a meaningful conversation with your AI companion',
    points: 15,
    completed: false,
    category: 'chat',
    icon: '🤖'
  }
];

const mockMoodPatterns: MoodPattern[] = [
  { date: '2024-01-01', mood: 1, sentiment: 0.3 },
  { date: '2024-01-02', mood: 0, sentiment: 0.1 },
  { date: '2024-01-03', mood: 2, sentiment: 0.7 },
  { date: '2024-01-04', mood: 1, sentiment: 0.4 },
  { date: '2024-01-05', mood: -1, sentiment: -0.2 },
  { date: '2024-01-06', mood: 0, sentiment: 0.2 },
  { date: '2024-01-07', mood: 2, sentiment: 0.8 }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [moodPatterns, setMoodPatterns] = useState<MoodPattern[]>(mockMoodPatterns);
  const [peerMessages, setPeerMessages] = useState<PeerMessage[]>([]);
  const [musicRecommendations, setMusicRecommendations] = useState<MusicRecommendation[]>([]);

  const addJournal = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setJournals(prev => [newEntry, ...prev]);
  };

  const addChatMessage = (message: Omit<ChatMessage, 'id'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString()
    };
    setChatMessages(prev => [...prev, newMessage]);

    // Auto-reply from AI
    if (message.sender === 'user') {
      setTimeout(() => {
        const aiResponse = generateAIResponse(message.message);
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          message: aiResponse,
          timestamp: new Date().toISOString()
        };
        setChatMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  const completeChallenge = (id: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === id ? { ...challenge, completed: true } : challenge
      )
    );
  };

  const addMoodPattern = (pattern: MoodPattern) => {
    setMoodPatterns(prev => [...prev, pattern]);
  };

  const addPeerMessage = (message: Omit<PeerMessage, 'id'>) => {
    const newMessage: PeerMessage = {
      ...message,
      id: Date.now().toString()
    };
    setPeerMessages(prev => [...prev, newMessage]);
  };

  const generateMusicRecommendations = (mood: string) => {
    const recommendations: MusicRecommendation[] = [
      {
        id: '1',
        title: 'Peaceful Moments',
        artist: 'Lo-Fi Beats',
        mood: mood,
        duration: '3:45',
        url: '#',
        thumbnail: 'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg'
      },
      {
        id: '2',
        title: 'Gentle Rainfall',
        artist: 'Nature Sounds',
        mood: mood,
        duration: '5:30',
        url: '#',
        thumbnail: 'https://images.pexels.com/photos/1154510/pexels-photo-1154510.jpeg'
      }
    ];
    setMusicRecommendations(recommendations);
  };

  return (
    <AppContext.Provider value={{
      journals,
      addJournal,
      chatMessages,
      addChatMessage,
      challenges,
      completeChallenge,
      moodPatterns,
      addMoodPattern,
      peerMessages,
      addPeerMessage,
      musicRecommendations,
      generateMusicRecommendations
    }}>
      {children}
    </AppContext.Provider>
  );
};

// AI response generator
const generateAIResponse = (userMessage: string): string => {
  const responses = [
    "I hear you, and what you're sharing sounds really important. How are you feeling about that right now?",
    "Thank you for trusting me with your thoughts. It takes courage to express what's on your mind.",
    "That sounds like a lot to process. Would you like to explore these feelings together?",
    "I'm here to listen and support you. What would feel most helpful right now?",
    "Your feelings are completely valid. Sometimes just expressing them can bring clarity.",
    "I can sense the emotion in your words. Remember, it's okay to feel whatever you're experiencing.",
    "That sounds challenging. You're being really brave by working through these feelings.",
    "I appreciate you sharing that with me. What do you think might help you feel a little better?",
    "It sounds like you're going through something difficult. I'm here for you through this.",
    "Your self-awareness is really admirable. How can we turn these insights into positive steps forward?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};