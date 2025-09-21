import React from 'react';
import { MessageCircle, BookOpen, Users, Music } from 'lucide-react';

const activities = [
  {
    icon: BookOpen,
    title: 'Journal Entry',
    description: 'Reflected on today\'s experiences',
    time: '2 hours ago',
    color: 'text-blue-500 bg-blue-50'
  },
  {
    icon: MessageCircle,
    title: 'AI Chat Session',
    description: 'Had a meaningful conversation',
    time: '4 hours ago',
    color: 'text-purple-500 bg-purple-50'
  },
  {
    icon: Users,
    title: 'Peer Support',
    description: 'Shared in group discussion',
    time: '1 day ago',
    color: 'text-green-500 bg-green-50'
  },
  {
    icon: Music,
    title: 'Mood Music',
    description: 'Listened to calming playlist',
    time: '1 day ago',
    color: 'text-pink-500 bg-pink-50'
  }
];

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Wellness Activities</h2>
      <div className="space-y-3">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{activity.title}</h3>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;