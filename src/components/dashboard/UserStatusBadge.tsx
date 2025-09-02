
import React from 'react';
import { cn } from '@/lib/utils';

type UserStatus = 'active' | 'moderate' | 'inactive' | 'unassigned';

interface UserStatusBadgeProps {
  status: UserStatus;
  className?: string;
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status, className }) => {
  const statusConfig = {
    active: {
      label: 'Active',
      className: 'bg-green-50 text-green-700 border-green-200'
    },
    moderate: {
      label: 'Moderately Active',
      className: 'bg-yellow-50 text-yellow-700 border-yellow-200'
    },
    inactive: {
      label: 'Inactive',
      className: 'bg-red-50 text-red-700 border-red-200'
    },
    unassigned: {
      label: 'Unassigned',
      className: 'bg-gray-50 text-gray-700 border-gray-200'
    }
  };

  const config = statusConfig[status];
  const dotColor = status === 'active' 
    ? 'bg-green-500' 
    : status === 'moderate' 
      ? 'bg-yellow-500' 
      : status === 'inactive'
        ? 'bg-red-500'
        : 'bg-gray-500';

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      config.className,
      className
    )}>
      <span className={cn("inline-block w-1.5 h-1.5 rounded-full mr-1.5", dotColor)}></span>
      {config.label}
    </span>
  );
};

export default UserStatusBadge;
