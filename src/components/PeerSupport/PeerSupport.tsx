import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { Send, Users, Shield, MessageCircle, Heart, Globe } from 'lucide-react';

const supportRooms = [
  {
    id: 'anxiety',
    name: 'Anxiety Support',
    description: 'A safe space to discuss anxiety and coping strategies',
    members: 24,
    color: 'from-blue-500 to-purple-600',
    icon: '🌊'
  },
  {
    id: 'depression',
    name: 'Depression Support',
    description: 'Understanding and supporting each other through difficult times',
    members: 18,
    color: 'from-purple-500 to-pink-600',
    icon: '🌸'
  },
  {
    id: 'stress',
    name: 'Stress Management',
    description: 'Share techniques and support for managing daily stress',
    members: 31,
    color: 'from-green-500 to-blue-600',
    icon: '🍃'
  },
  {
    id: 'general',
    name: 'General Wellness',
    description: 'Open discussions about mental health and wellness',
    members: 42,
    color: 'from-orange-500 to-red-600',
    icon: '☀️'
  }
];

const PeerSupport: React.FC = () => {
  const { peerMessages, addPeerMessage } = useApp();
  const { user } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedRoom) return;

    addPeerMessage({
      message: message.trim(),
      timestamp: new Date().toISOString(),
      roomId: selectedRoom,
      isAnonymous,
      mood: 'supportive'
    });

    setMessage('');
  };

  const roomMessages = peerMessages.filter(msg => msg.roomId === selectedRoom);

  if (!selectedRoom) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Anonymous Peer Support</h1>
              </div>
              <p className="text-green-100 text-lg">
                Connect with others who understand your journey in safe, moderated spaces
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">115</div>
              <div className="text-green-100">Active Members</div>
            </div>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Safe & Moderated Spaces</h3>
              <p className="text-gray-600 mb-4">
                All conversations are monitored by AI to ensure a supportive, respectful environment. 
                Personal information is never shared, and you can choose to remain completely anonymous.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>AI Moderated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Anonymous Option</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Rooms */}
        <div className="grid md:grid-cols-2 gap-6">
          {supportRooms.map((room) => (
            <div
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${room.color} rounded-full flex items-center justify-center text-white text-xl`}>
                    {room.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{room.name}</h3>
                    <p className="text-sm text-gray-600">{room.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{room.members} members online</span>
                </div>
                <button className={`px-4 py-2 bg-gradient-to-r ${room.color} text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200`}>
                  Join Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentRoom = supportRooms.find(room => room.id === selectedRoom);

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-12rem)]">
      {/* Room Header */}
      <div className={`bg-gradient-to-r ${currentRoom?.color} rounded-t-2xl p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedRoom(null)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              ←
            </button>
            <div className="text-2xl">{currentRoom?.icon}</div>
            <div>
              <h2 className="text-xl font-bold">{currentRoom?.name}</h2>
              <p className="text-sm opacity-90">{currentRoom?.members} members online</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded"
              />
              <span>Anonymous</span>
            </label>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white rounded-b-2xl shadow-lg border border-gray-100 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {roomMessages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Start the Conversation</h3>
              <p className="text-gray-600 mb-4">
                Be the first to share in this supportive space. Remember, we're all here to help each other.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md mx-auto">
                {[
                  'How is everyone doing today?',
                  'I could use some support right now',
                  'What helps you when you\'re feeling overwhelmed?',
                  'Grateful for this community'
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(suggestion)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors text-left"
                  >
                    "{suggestion}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {roomMessages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {msg.isAnonymous ? '?' : user?.nickname?.[0] || 'U'}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {msg.isAnonymous ? 'Anonymous' : user?.nickname}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleTimeString('en', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <p className="text-gray-700 bg-gray-50 rounded-lg p-3">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts with the community..."
                rows={2}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            This is a safe, moderated space. Be kind and supportive to others.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerSupport;