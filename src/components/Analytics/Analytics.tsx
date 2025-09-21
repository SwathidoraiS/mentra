import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart3, TrendingUp, Calendar, Brain, Heart, Target, Award, Zap } from 'lucide-react';

const Analytics: React.FC = () => {
  const { moodPatterns, journals, chatMessages } = useApp();
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'Last 3 Months' },
    { id: 'year', label: 'This Year' }
  ];

  // Calculate analytics
  const avgMood = moodPatterns.reduce((sum, pattern) => sum + pattern.mood, 0) / moodPatterns.length || 0;
  const avgSentiment = moodPatterns.reduce((sum, pattern) => sum + pattern.sentiment, 0) / moodPatterns.length || 0;
  const totalJournals = journals.length;
  const totalChats = chatMessages.filter(msg => msg.sender === 'user').length;

  const insights = [
    {
      title: "Emotional Resilience Growing",
      description: "Your ability to bounce back from difficult emotions has improved by 23% this month.",
      trend: "+23%",
      color: "text-green-600 bg-green-50",
      icon: TrendingUp
    },
    {
      title: "Consistent Self-Care",
      description: "You've maintained a 7-day wellness streak, showing great commitment to your mental health.",
      trend: "7 days",
      color: "text-blue-600 bg-blue-50",
      icon: Target
    },
    {
      title: "Positive Communication",
      description: "Your AI conversations show increasingly positive language patterns and self-compassion.",
      trend: "+15%",
      color: "text-purple-600 bg-purple-50",
      icon: Brain
    },
    {
      title: "Mood Stability",
      description: "Your mood variations have become more stable, indicating better emotional regulation.",
      trend: "Stable",
      color: "text-orange-600 bg-orange-50",
      icon: Heart
    }
  ];

  const weeklyMoodData = [
    { day: 'Mon', mood: 1.2, activities: 3 },
    { day: 'Tue', mood: 0.8, activities: 2 },
    { day: 'Wed', mood: 1.5, activities: 4 },
    { day: 'Thu', mood: 0.5, activities: 2 },
    { day: 'Fri', mood: 1.8, activities: 5 },
    { day: 'Sat', mood: 1.0, activities: 3 },
    { day: 'Sun', mood: 1.3, activities: 4 }
  ];

  const emotionalPatterns = [
    { emotion: 'Joy', percentage: 35, color: 'bg-yellow-400' },
    { emotion: 'Calm', percentage: 28, color: 'bg-blue-400' },
    { emotion: 'Anxiety', percentage: 20, color: 'bg-orange-400' },
    { emotion: 'Sadness', percentage: 12, color: 'bg-gray-400' },
    { emotion: 'Anger', percentage: 5, color: 'bg-red-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Wellness Analytics</h1>
            </div>
            <p className="text-blue-100 text-lg">
              Understand your emotional patterns and track your mental wellness journey
            </p>
          </div>
          
          {/* Period Selector */}
          <div className="bg-white/20 rounded-lg p-1">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === period.id
                    ? 'bg-white text-blue-600'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl">😊</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {avgMood > 0 ? '+' : ''}{avgMood.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Average Mood</div>
          <div className="text-xs text-green-600 mt-1">↗ Trending positive</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl">🔥</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{user?.streak}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
          <div className="text-xs text-blue-600 mt-1">Keep it going!</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl">📝</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{totalJournals}</div>
          <div className="text-sm text-gray-600">Journal Entries</div>
          <div className="text-xs text-purple-600 mt-1">Great reflection!</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl">💬</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{totalChats}</div>
          <div className="text-sm text-gray-600">AI Conversations</div>
          <div className="text-xs text-orange-600 mt-1">Active engagement</div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Insights</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${insight.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900">{insight.title}</h3>
                      <span className={`text-sm font-medium ${insight.color.split(' ')[0]} px-2 py-1 rounded-full ${insight.color.split(' ')[1]}`}>
                        {insight.trend}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mood Trends Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Mood Trends</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Very Sad</span>
            <span>Neutral</span>
            <span>Very Happy</span>
          </div>
          
          <div className="relative h-64 bg-gray-50 rounded-lg p-4">
            {/* Grid lines */}
            <div className="absolute inset-4 flex flex-col justify-between">
              {[-2, -1, 0, 1, 2].map(value => (
                <div key={value} className="h-px bg-gray-200 w-full" />
              ))}
            </div>
            
            {/* Zero line */}
            <div className="absolute top-1/2 left-4 right-4 h-px bg-gray-400 transform -translate-y-px" />
            
            {/* Chart bars */}
            <div className="absolute inset-4 flex items-end justify-between">
              {weeklyMoodData.map((point, index) => {
                const height = (Math.abs(point.mood) / 2) * 100;
                const isPositive = point.mood >= 0;
                
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative">
                      <div 
                        className={`
                          w-8 rounded-t-lg transition-all duration-300 hover:scale-110
                          ${isPositive 
                            ? 'bg-gradient-to-t from-green-400 to-green-500' 
                            : 'bg-gradient-to-b from-red-400 to-red-500'
                          }
                        `}
                        style={{ 
                          height: `${height}px`,
                          marginBottom: isPositive ? 0 : 'auto',
                          marginTop: isPositive ? 'auto' : 0
                        }}
                      />
                      {/* Activity indicator */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        {Array.from({ length: point.activities }).map((_, i) => (
                          <div key={i} className="w-1 h-1 bg-blue-500 rounded-full inline-block mx-px" />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{point.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full" />
              <span className="text-gray-600">Positive mood</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full" />
              <span className="text-gray-600">Challenging mood</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-1 bg-blue-500 rounded-full" />
              <span className="text-gray-600">Wellness activities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emotional Patterns */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Emotional Patterns</h3>
          <div className="space-y-4">
            {emotionalPatterns.map((pattern, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-16 text-sm font-medium text-gray-700">{pattern.emotion}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${pattern.color} transition-all duration-500`}
                    style={{ width: `${pattern.percentage}%` }}
                  />
                </div>
                <div className="w-12 text-sm font-medium text-gray-600">{pattern.percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Wellness Goals Progress</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">Daily Journaling</span>
              </div>
              <span className="text-green-600 font-medium">85%</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">AI Chat Sessions</span>
              </div>
              <span className="text-blue-600 font-medium">92%</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-900">Mood Tracking</span>
              </div>
              <span className="text-purple-600 font-medium">78%</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-900">Wellness Challenges</span>
              </div>
              <span className="text-orange-600 font-medium">67%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;