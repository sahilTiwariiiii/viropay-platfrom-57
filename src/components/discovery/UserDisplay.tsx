
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Discovery } from '@/features/procurement/types';

interface UserDisplayProps {
  discovery: Discovery;
  onViewAll: () => void;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ discovery, onViewAll }) => {
  const { users } = discovery;
  const userCount = users.length;
  
  return (
    <div className="text-sm">
      {userCount > 1 ? (
        <div>
          <div className="flex items-center mb-1">
            <span className="font-medium">{userCount} users</span>
            <button 
              className="ml-2 text-xs text-blue-600 hover:underline"
              onClick={onViewAll}
            >
              View all
            </button>
          </div>
          <div className="flex">
            {users.slice(0, 3).map((user, i) => (
              <Avatar key={i} className="h-6 w-6 border-2 border-white mr-[-8px]">
                <AvatarFallback className="text-xs bg-gray-200">
                  {user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
            {userCount > 3 && (
              <div className="h-6 w-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs">
                +{userCount - 3}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarFallback className="text-xs bg-gray-200">
              {users[0].email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs truncate max-w-[150px]">{users[0].email}</span>
          {users[0].count > 1 && (
            <Badge variant="outline" className="ml-2 text-xs">
              {users[0].count} usages
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDisplay;
