import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Challenge } from '../../types';
import { Check, Trophy } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const { completeChallenge } = useApp();

  return (
    <div className={`
      p-4 rounded-xl border transition-all duration-200 hover:shadow-md
      ${challenge.completed 
        ? 'bg-green-50 border-green-200' 
        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
      }
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center text-lg
            ${challenge.completed 
              ? 'bg-green-500 text-white' 
              : 'bg-white border-2 border-gray-200'
            }
          `}>
            {challenge.completed ? <Check className="w-5 h-5" /> : challenge.icon}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{challenge.title}</h3>
            <p className="text-sm text-gray-600">{challenge.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-yellow-600">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-medium">{challenge.points}</span>
          </div>
          
          {!challenge.completed && (
            <button
              onClick={() => completeChallenge(challenge.id)}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;