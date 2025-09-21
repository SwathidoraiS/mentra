import React from 'react';
import { MoodPattern } from '../../types';

interface MoodChartProps {
  data: MoodPattern[];
}

const MoodChart: React.FC<MoodChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => Math.abs(d.mood)));
  const chartHeight = 200;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Very Sad</span>
        <span>Neutral</span>
        <span>Very Happy</span>
      </div>
      
      <div className="relative" style={{ height: chartHeight }}>
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[-2, -1, 0, 1, 2].map(value => (
            <div key={value} className="h-px bg-gray-100 w-full" />
          ))}
        </div>
        
        {/* Zero line */}
        <div className="absolute top-1/2 w-full h-px bg-gray-300 transform -translate-y-px" />
        
        {/* Chart bars */}
        <div className="absolute inset-0 flex items-end justify-between px-2">
          {data.map((point, index) => {
            const height = (Math.abs(point.mood) / 2) * (chartHeight / 2);
            const isPositive = point.mood >= 0;
            
            return (
              <div key={index} className="flex flex-col items-center">
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
                <span className="text-xs text-gray-500 mt-2">
                  {new Date(point.date).toLocaleDateString('en', { weekday: 'short' })}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full" />
          <span className="text-gray-600">Positive mood</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full" />
          <span className="text-gray-600">Challenging mood</span>
        </div>
      </div>
    </div>
  );
};

export default MoodChart;