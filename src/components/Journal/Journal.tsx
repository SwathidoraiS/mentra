import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import JournalEditor from './JournalEditor';
import JournalEntries from './JournalEntries';
import { Plus, BookOpen, Sparkles } from 'lucide-react';

const Journal: React.FC = () => {
  const [showEditor, setShowEditor] = useState(false);
  const { journals } = useApp();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-8 h-8" />
              <h1 className="text-3xl font-bold">AI-Powered Journal</h1>
            </div>
            <p className="text-purple-100 text-lg">
              Express your thoughts and let AI help you understand your emotional patterns
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{journals.length}</div>
            <div className="text-purple-100">Journal Entries</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="font-bold text-gray-900">AI Insights</div>
              <div className="text-sm text-gray-600">3 patterns found</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
              <span className="text-lg">😊</span>
            </div>
            <div>
              <div className="font-bold text-gray-900">Avg Mood</div>
              <div className="text-sm text-gray-600">Positive</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
              <span className="text-lg">🔥</span>
            </div>
            <div>
              <div className="font-bold text-gray-900">Streak</div>
              <div className="text-sm text-gray-600">{user?.streak} days</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowEditor(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <div className="flex items-center space-x-3">
            <Plus className="w-6 h-6" />
            <div className="text-left">
              <div className="font-bold">New Entry</div>
              <div className="text-sm opacity-90">Start writing</div>
            </div>
          </div>
        </button>
      </div>

      {/* Journal Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <JournalEditor onClose={() => setShowEditor(false)} />
        </div>
      )}

      {/* Journal Entries */}
      <JournalEntries entries={journals} />
    </div>
  );
};

export default Journal;