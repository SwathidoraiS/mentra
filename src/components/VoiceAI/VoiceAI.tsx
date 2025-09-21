import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, Languages } from 'lucide-react';

const VoiceAI: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [conversationHistory, setConversationHistory] = useState<Array<{
    type: 'user' | 'ai';
    text: string;
    timestamp: string;
  }>>([]);

  const languages = [
    { id: 'english', name: 'English', flag: '🇺🇸' },
    { id: 'hindi', name: 'हिन्दी', flag: '🇮🇳' },
    { id: 'telugu', name: 'తెలుగు', flag: '🇮🇳' },
    { id: 'tamil', name: 'தமிழ்', flag: '🇮🇳' },
    { id: 'bengali', name: 'বাংলা', flag: '🇧🇩' },
    { id: 'hinglish', name: 'Hinglish', flag: '🇮🇳' }
  ];

  const startRecording = () => {
    setIsRecording(true);
    // Simulate voice recognition
    setTimeout(() => {
      const mockTranscripts = [
        "I've been feeling really anxious lately about my upcoming exams.",
        "Sometimes I feel like I'm not good enough compared to others.",
        "I had a really good day today and wanted to share it with someone.",
        "I'm struggling with motivation to do anything productive.",
        "Can you help me understand why I feel so overwhelmed?"
      ];
      const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
      setTranscript(randomTranscript);
      setIsRecording(false);
      
      // Add to conversation history
      const newEntry = {
        type: 'user' as const,
        text: randomTranscript,
        timestamp: new Date().toISOString()
      };
      setConversationHistory(prev => [...prev, newEntry]);
      
      // Generate AI response
      setTimeout(() => {
        const aiResponses = [
          "I hear you, and what you're sharing sounds really important. Anxiety about exams is completely normal - it shows you care about your success. Let's talk about some strategies that might help you feel more prepared and confident.",
          "Those feelings of comparison are so common, especially in today's world. Remember that everyone's journey is unique, and you have your own special strengths and qualities that make you valuable just as you are.",
          "I'm so glad you had a good day! It's wonderful that you want to share positive moments. What made today special for you? Celebrating these moments can help build resilience for tougher days.",
          "Lack of motivation can be really frustrating. Sometimes our minds need rest, and that's okay. Let's explore what might be behind this feeling and find small, manageable steps to help you move forward.",
          "Feeling overwhelmed often happens when we're dealing with multiple stressors at once. I'm here to help you break things down into smaller, more manageable pieces. What feels most pressing to you right now?"
        ];
        const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        setAiResponse(response);
        
        const aiEntry = {
          type: 'ai' as const,
          text: response,
          timestamp: new Date().toISOString()
        };
        setConversationHistory(prev => [...prev, aiEntry]);
      }, 1500);
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Simulate audio playback
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Mic className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Voice-based Empathy AI</h1>
            </div>
            <p className="text-pink-100 text-lg">
              Speak naturally and receive supportive responses in your preferred language
            </p>
          </div>
          
          {/* Language Selector */}
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id} className="text-gray-900">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Voice Interface */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl transition-all duration-300 transform ${
                isRecording 
                  ? 'bg-red-500 scale-110 animate-pulse shadow-2xl' 
                  : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 hover:shadow-xl'
              }`}
            >
              {isRecording ? <MicOff /> : <Mic />}
            </button>
            
            {isRecording && (
              <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
            )}
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {isRecording ? 'Listening...' : 'Tap to speak'}
            </h3>
            <p className="text-gray-600">
              {isRecording 
                ? 'I\'m listening carefully to what you have to say' 
                : 'Share your thoughts, feelings, or anything on your mind'
              }
            </p>
          </div>
        </div>

        {/* Transcript Display */}
        {transcript && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <Mic className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">You said:</h4>
                <p className="text-gray-700">{transcript}</p>
              </div>
            </div>
          </div>
        )}

        {/* AI Response */}
        {aiResponse && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                <Volume2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900">AI Response:</h4>
                  <button
                    onClick={togglePlayback}
                    className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span className="text-sm">{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                </div>
                <p className="text-gray-700">{aiResponse}</p>
                {isPlaying && (
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <span className="text-sm text-purple-600 ml-2">Playing audio response...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Conversation History */}
      {conversationHistory.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Conversation History</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {conversationHistory.map((entry, index) => (
              <div key={index} className={`flex items-start space-x-3 ${
                entry.type === 'ai' ? 'flex-row' : 'flex-row-reverse'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                  entry.type === 'ai' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-blue-500'
                }`}>
                  {entry.type === 'ai' ? <Volume2 className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </div>
                <div className={`flex-1 max-w-xs lg:max-w-md ${
                  entry.type === 'ai' ? 'text-left' : 'text-right'
                }`}>
                  <div className={`p-3 rounded-lg ${
                    entry.type === 'ai' 
                      ? 'bg-purple-50 text-gray-800' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    <p className="text-sm">{entry.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(entry.timestamp).toLocaleTimeString('en', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Languages className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Multilingual Support</h3>
          <p className="text-gray-600 text-sm">Speak in your preferred language and receive responses in the same language</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <Volume2 className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Natural Speech</h3>
          <p className="text-gray-600 text-sm">Advanced text-to-speech with natural, empathetic voice responses</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
            <Mic className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Smart Recognition</h3>
          <p className="text-gray-600 text-sm">Accurate speech recognition that understands context and emotion</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceAI;