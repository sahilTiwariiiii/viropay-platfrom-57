
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
  color?: 'default' | 'blue' | 'green' | 'orange' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  className,
  trend,
  isLoading = false,
  color = 'default'
}) => {
  const colorStyles = {
    default: '',
    blue: 'border-l-4 border-l-saas-blue',
    green: 'border-l-4 border-l-saas-green',
    orange: 'border-l-4 border-l-saas-orange',
    red: 'border-l-4 border-l-saas-red',
  };

  return (
    <div className={cn("stat-card", colorStyles[color], className)}>
      <div className="flex justify-between items-start">
        <h3 className="metric-label">{title}</h3>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      
      {isLoading ? (
        <div className="h-9 w-24 bg-gray-200 rounded animate-pulse mt-2"></div>
      ) : (
        <div className="metric-value">
          {value}
          
          {trend && (
            <span 
              className={cn(
                "ml-2 text-sm",
                trend.isPositive ? "text-saas-green" : "text-saas-red"
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
