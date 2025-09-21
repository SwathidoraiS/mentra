export interface User {
  id: string;
  nickname: string;
  age: number;
  gender: string;
  language: string;
  email: string;
  avatar?: string;
  joinDate: string;
  streak: number;
  totalPoints: number;
  badges: Badge[];
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  title: string;
  content: string;
  mood: 'very-happy' | 'happy' | 'neutral' | 'sad' | 'very-sad';
  sentiment: number; // -1 to 1
  aiSummary?: string;
  tags: string[];
  voiceNote?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
  mood?: string;
  language?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
  category: 'streak' | 'journal' | 'chat' | 'mood' | 'social';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  category: string;
  icon: string;
}

export interface MoodPattern {
  date: string;
  mood: number; // -2 to 2
  sentiment: number;
}

export interface PeerMessage {
  id: string;
  message: string;
  timestamp: string;
  roomId: string;
  isAnonymous: boolean;
  mood?: string;
}

export interface MusicRecommendation {
  id: string;
  title: string;
  artist: string;
  mood: string;
  duration: string;
  url: string;
  thumbnail: string;
}