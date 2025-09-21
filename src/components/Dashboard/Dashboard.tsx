import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import MoodChart from './MoodChart';
import ChallengeCard from './ChallengeCard';
import RecentActivity from './RecentActivity';
import WellnessStats from './WellnessStats';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { challenges, moodPatterns } = useApp();

  const completedChallenges = challenges.filter(c => c.completed).length;
  const totalChallenges = challenges.length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Good {getTimeOfDay()}, {user?.nickname}! ✨
            </h1>
            <p className="text-blue-100 text-lg">
              You're on a {user?.streak}-day wellness streak! Keep the momentum going.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{user?.totalPoints}</div>
            <div className="text-blue-100">Wellness Points</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <WellnessStats />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Mood Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Mood Journey</h2>
          <MoodChart data={moodPatterns} />
        </div>

        {/* Daily Challenges */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Today's Wellness Challenges</h2>
              <span className="text-sm text-gray-500">
                {completedChallenges}/{totalChallenges} completed
              </span>
            </div>
            <div className="space-y-3">
              {challenges.slice(0, 3).map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>

          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

const getTimeOfDay = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
};

export default Dashboard;