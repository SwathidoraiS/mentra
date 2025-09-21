import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, Shuffle, Repeat } from 'lucide-react';

const moods = [
  { id: 'calm', name: 'Calm & Peaceful', color: 'from-blue-400 to-blue-600', emoji: '🌊' },
  { id: 'happy', name: 'Happy & Uplifting', color: 'from-yellow-400 to-orange-500', emoji: '☀️' },
  { id: 'focused', name: 'Focused & Productive', color: 'from-green-400 to-green-600', emoji: '🎯' },
  { id: 'relaxed', name: 'Relaxed & Chill', color: 'from-purple-400 to-purple-600', emoji: '🌸' },
  { id: 'energetic', name: 'Energetic & Motivated', color: 'from-red-400 to-pink-500', emoji: '⚡' },
  { id: 'melancholy', name: 'Reflective & Gentle', color: 'from-gray-400 to-gray-600', emoji: '🌙' }
];

const MoodMusic: React.FC = () => {
  const { musicRecommendations, generateMusicRecommendations } = useApp();
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(225); // 3:45 in seconds

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    generateMusicRecommendations(moodId);
    setCurrentTrack(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Simulate audio progress
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const mockTracks = [
    {
      id: '1',
      title: 'Peaceful Moments',
      artist: 'Lo-Fi Collective',
      duration: '3:45',
      thumbnail: 'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      title: 'Gentle Rainfall',
      artist: 'Nature Sounds',
      duration: '5:30',
      thumbnail: 'https://images.pexels.com/photos/1154510/pexels-photo-1154510.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      title: 'Morning Meditation',
      artist: 'Zen Garden',
      duration: '4:15',
      thumbnail: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '4',
      title: 'Soft Piano Dreams',
      artist: 'Ambient Piano',
      duration: '6:20',
      thumbnail: 'https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Volume2 className="w-8 h-8" />
              <h1 className="text-3xl font-bold">AI Mood-to-Music</h1>
            </div>
            <p className="text-orange-100 text-lg">
              Discover music that matches and enhances your emotional state
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">🎵</div>
            <div className="text-orange-100">Personalized</div>
          </div>
        </div>
      </div>

      {/* Mood Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How are you feeling right now?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                selectedMood === mood.id
                  ? `bg-gradient-to-r ${mood.color} text-white border-transparent shadow-lg`
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl mb-2">{mood.emoji}</div>
              <div className="font-medium">{mood.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Music Player */}
      {selectedMood && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Current Track Display */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
            <div className="flex items-center space-x-4">
              <img
                src={mockTracks[currentTrack]?.thumbnail}
                alt="Album art"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold">{mockTracks[currentTrack]?.title}</h3>
                <p className="text-purple-100">{mockTracks[currentTrack]?.artist}</p>
              </div>
              <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Player Controls */}
          <div className="p-6">
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{mockTracks[currentTrack]?.duration}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center space-x-6">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Shuffle className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentTrack(Math.max(0, currentTrack - 1))}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                onClick={togglePlay}
                className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
              <button
                onClick={() => setCurrentTrack(Math.min(mockTracks.length - 1, currentTrack + 1))}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Repeat className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Playlist */}
      {selectedMood && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Your {moods.find(m => m.id === selectedMood)?.name} Playlist
          </h3>
          <div className="space-y-3">
            {mockTracks.map((track, index) => (
              <div
                key={track.id}
                onClick={() => setCurrentTrack(index)}
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors ${
                  currentTrack === index
                    ? 'bg-purple-50 border border-purple-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={track.thumbnail}
                  alt={track.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{track.title}</h4>
                  <p className="text-sm text-gray-600">{track.artist}</p>
                </div>
                <div className="text-sm text-gray-500">{track.duration}</div>
                {currentTrack === index && isPlaying && (
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-6 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Mood-Based Curation</h3>
          <p className="text-gray-600 text-sm">AI analyzes your emotional state to recommend perfect music matches</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🎵</span>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Therapeutic Sounds</h3>
          <p className="text-gray-600 text-sm">Carefully selected tracks designed to support mental wellness</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🔄</span>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Adaptive Playlists</h3>
          <p className="text-gray-600 text-sm">Playlists that evolve based on your listening patterns and feedback</p>
        </div>
      </div>
    </div>
  );
};

export default MoodMusic;