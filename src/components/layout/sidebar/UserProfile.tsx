
import React from 'react';

const UserProfile: React.FC = () => {
  return (
    <div className="p-4 mx-3 mb-6 rounded-lg bg-gray-50 border border-gray-100">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
          RA
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm">Ruben Attena</p>
          <p className="text-xs text-gray-500 truncate">ruben@viropay.com</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
