
import React from 'react';
import { cn } from '@/lib/utils';

interface UsageProgressProps {
  segments: {
    value: number;
    label: string;
    color: string;
  }[];
  className?: string;
}

const UsageProgress: React.FC<UsageProgressProps> = ({ segments, className }) => {
  // Calculate total for percentage
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <div className={className}>
      <div className="h-3 w-full flex rounded-full overflow-hidden">
        {segments.map((segment, index) => {
          const percentage = total > 0 ? (segment.value / total) * 100 : 0;
          return (
            <div
              key={index}
              className={cn("h-full transition-all duration-700", segment.color)}
              style={{ width: `${percentage}%` }}
            ></div>
          );
        })}
      </div>
      
      <div className="flex justify-between mt-3">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center text-sm">
            <div className={cn("w-3 h-3 rounded-full mr-2", segment.color)}></div>
            <span className="mr-2">{segment.label}</span>
            <span className="font-semibold">{segment.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsageProgress;
