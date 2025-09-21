import React from 'react';
import { Calendar, Target, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const WellnessStats: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: Calendar,
      label: 'Current Streak',
      value: `${user?.streak} days`,
      color: 'text-blue-500 bg-blue-50',
      bgColor: 'bg-blue-500'
    },
    {
      icon: Target,
      label: 'Goals Completed',
      value: '12/15',
      color: 'text-green-500 bg-green-50',
      bgColor: 'bg-green-500'
    },
    {
      icon: Award,
      label: 'Badges Earned',
      value: `${user?.badges?.length || 0}`,
      color: 'text-yellow-500 bg-yellow-50',
      bgColor: 'bg-yellow-500'
    },
    {
      icon: TrendingUp,
      label: 'Mood Trend',
      value: '+15%',
      color: 'text-purple-500 bg-purple-50',
      bgColor: 'bg-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className={`w-2 h-8 rounded-full ${stat.bgColor} opacity-20`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default WellnessStats;