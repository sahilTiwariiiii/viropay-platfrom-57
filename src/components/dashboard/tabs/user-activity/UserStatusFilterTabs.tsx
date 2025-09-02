
import React from 'react';
import { UserStatus } from './userGenerationUtils';

interface UserStatusFilterTabsProps {
  statusFilter: UserStatus | 'all';
  setStatusFilter: (status: UserStatus | 'all') => void;
  statusCount: {
    all: number;
    active: number;
    moderate: number;
    inactive: number;
    unassigned: number;
  };
}

const UserStatusFilterTabs: React.FC<UserStatusFilterTabsProps> = ({
  statusFilter,
  setStatusFilter,
  statusCount,
}) => {
  // Generate status filter colors
  const getStatusBgColor = (status: string, isActive: boolean) => {
    if (!isActive) return 'bg-gray-100';
    
    switch (status) {
      case 'active':
        return 'bg-green-100';
      case 'moderate':
        return 'bg-yellow-100';
      case 'inactive':
        return 'bg-red-100';
      case 'unassigned':
        return 'bg-gray-200';
      default:
        return 'bg-blue-100';
    }
  };

  return (
    <div className="mb-6 border-b overflow-x-auto">
      <div className="flex space-x-4 min-w-max">
        <button
          onClick={() => setStatusFilter('all')}
          className={`flex items-center pb-2 px-1 ${
            statusFilter === 'all' 
              ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' 
              : 'text-gray-600'
          }`}
        >
          <span className="mr-2">Total Users</span>
          <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${getStatusBgColor('all', statusFilter === 'all')}`}>
            {statusCount.all}
          </span>
        </button>
        
        <button
          onClick={() => setStatusFilter('active')}
          className={`flex items-center pb-2 px-1 ${
            statusFilter === 'active' 
              ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' 
              : 'text-gray-600'
          }`}
        >
          <span className="mr-2">Active</span>
          <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${getStatusBgColor('active', statusFilter === 'active')}`}>
            {statusCount.active}
          </span>
        </button>
        
        <button
          onClick={() => setStatusFilter('moderate')}
          className={`flex items-center pb-2 px-1 ${
            statusFilter === 'moderate' 
              ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' 
              : 'text-gray-600'
          }`}
        >
          <span className="mr-2">Moderately Active</span>
          <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${getStatusBgColor('moderate', statusFilter === 'moderate')}`}>
            {statusCount.moderate}
          </span>
        </button>
        
        <button
          onClick={() => setStatusFilter('inactive')}
          className={`flex items-center pb-2 px-1 ${
            statusFilter === 'inactive' 
              ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' 
              : 'text-gray-600'
          }`}
        >
          <span className="mr-2">Inactive</span>
          <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${getStatusBgColor('inactive', statusFilter === 'inactive')}`}>
            {statusCount.inactive}
          </span>
        </button>
        
        <button
          onClick={() => setStatusFilter('unassigned')}
          className={`flex items-center pb-2 px-1 ${
            statusFilter === 'unassigned' 
              ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' 
              : 'text-gray-600'
          }`}
        >
          <span className="mr-2">Unassigned</span>
          <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${getStatusBgColor('unassigned', statusFilter === 'unassigned')}`}>
            {statusCount.unassigned}
          </span>
        </button>
      </div>
    </div>
  );
};

export default UserStatusFilterTabs;
