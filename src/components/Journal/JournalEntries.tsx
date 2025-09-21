import React from 'react';
import { JournalEntry } from '../../types';
import { Calendar, Tag, Sparkles, Volume2 } from 'lucide-react';

interface JournalEntriesProps {
  entries: JournalEntry[];
}

const moodEmojis = {
  'very-happy': '😄',
  'happy': '😊',
  'neutral': '😐',
  'sad': '😔',
  'very-sad': '😢'
};

const JournalEntries: React.FC<JournalEntriesProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-purple-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Start Your Journal Journey</h3>
        <p className="text-gray-600 mb-6">
          Your first journal entry is just a click away. Begin exploring your thoughts and emotions with AI-powered insights.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-medium text-gray-700">AI Insights</div>
            <div>Get personalized emotional pattern analysis</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl mb-2">🔒</div>
            <div className="font-medium text-gray-700">Private & Safe</div>
            <div>Your thoughts are completely confidential</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl mb-2">📈</div>
            <div className="font-medium text-gray-700">Track Progress</div>
            <div>Watch your emotional wellness journey unfold</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Your Journal Entries</h2>
        <div className="text-sm text-gray-500">{entries.length} entries</div>
      </div>

      <div className="grid gap-6">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{moodEmojis[entry.mood]}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{entry.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(entry.date).toLocaleDateString('en', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    {entry.voiceNote && (
                      <div className="flex items-center space-x-1 text-purple-600">
                        <Volume2 className="w-4 h-4" />
                        <span>Voice note</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  entry.sentiment > 0.3 ? 'bg-green-100 text-green-800' :
                  entry.sentiment < -0.3 ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {entry.sentiment > 0.3 ? 'Positive' : entry.sentiment < -0.3 ? 'Challenging' : 'Neutral'}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">{entry.content}</p>
            </div>

            {/* Tags */}
            {entry.tags.length > 0 && (
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="w-4 h-4 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* AI Summary */}
            {entry.aiSummary && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">AI Insight</h4>
                    <p className="text-gray-700 text-sm">{entry.aiSummary}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalEntries;