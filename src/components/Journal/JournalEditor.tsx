import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { X, Save, Mic, MicOff } from 'lucide-react';

interface JournalEditorProps {
  onClose: () => void;
}

const moods = [
  { id: 'very-happy', emoji: '😄', label: 'Very Happy', color: 'bg-green-500' },
  { id: 'happy', emoji: '😊', label: 'Happy', color: 'bg-green-400' },
  { id: 'neutral', emoji: '😐', label: 'Neutral', color: 'bg-gray-400' },
  { id: 'sad', emoji: '😔', label: 'Sad', color: 'bg-orange-400' },
  { id: 'very-sad', emoji: '😢', label: 'Very Sad', color: 'bg-red-500' }
];

const JournalEditor: React.FC<JournalEditorProps> = ({ onClose }) => {
  const { addJournal } = useApp();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || !mood) return;

    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const sentiment = analyzeSentiment(content);
    const aiSummary = generateAISummary(content);
    
    addJournal({
      userId: user?.id || '',
      date: new Date().toISOString(),
      title: title.trim(),
      content: content.trim(),
      mood: mood as any,
      sentiment,
      aiSummary,
      tags: extractTags(content),
      voiceNote: isRecording ? 'voice-note-id' : undefined
    });

    onClose();
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, you'd start/stop voice recording here
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">New Journal Entry</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            How are you feeling today? Give this entry a title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., A challenging but growth-filled day"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Mood Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select your current mood
          </label>
          <div className="flex flex-wrap gap-3">
            {moods.map((moodOption) => (
              <button
                key={moodOption.id}
                onClick={() => setMood(moodOption.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200
                  ${mood === moodOption.id
                    ? `${moodOption.color} text-white shadow-lg transform scale-105`
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <span className="text-lg">{moodOption.emoji}</span>
                <span className="font-medium">{moodOption.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              What's on your mind? Express yourself freely
            </label>
            <button
              onClick={toggleRecording}
              className={`
                flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors
                ${isRecording 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span className="text-sm">
                {isRecording ? 'Stop Recording' : 'Voice Note'}
              </span>
            </button>
          </div>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write about your thoughts, feelings, experiences, or anything that matters to you today. There's no judgment here - this is your safe space..."
            rows={8}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {content.length} characters
          </div>
        </div>

        {isRecording && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-700 font-medium">Recording voice note...</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          AI will analyze your entry for emotional patterns and insights
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim() || !mood || isLoading}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>AI Processing...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Entry</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Mock AI functions
const analyzeSentiment = (text: string): number => {
  const positiveWords = ['happy', 'joy', 'love', 'excited', 'grateful', 'peaceful', 'amazing', 'wonderful'];
  const negativeWords = ['sad', 'angry', 'frustrated', 'stressed', 'worried', 'anxious', 'tired', 'upset'];
  
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.some(pos => word.includes(pos))) score += 0.1;
    if (negativeWords.some(neg => word.includes(neg))) score -= 0.1;
  });
  
  return Math.max(-1, Math.min(1, score));
};

const generateAISummary = (text: string): string => {
  const summaries = [
    "This entry reflects a journey of self-discovery and emotional awareness. You're processing experiences thoughtfully.",
    "I can sense both challenges and resilience in your words. You're showing great strength in working through your feelings.",
    "Your emotional awareness is remarkable. This entry shows growth and a healthy approach to processing experiences.",
    "There's a beautiful balance of reflection and forward-thinking in your writing. You're developing great emotional intelligence.",
    "This entry reveals your capacity for deep thinking and emotional processing. Keep nurturing this self-awareness."
  ];
  
  return summaries[Math.floor(Math.random() * summaries.length)];
};

const extractTags = (text: string): string[] => {
  const commonTags = ['reflection', 'growth', 'mindfulness', 'relationships', 'work', 'goals', 'gratitude'];
  return commonTags.slice(0, Math.floor(Math.random() * 3) + 1);
};

export default JournalEditor;