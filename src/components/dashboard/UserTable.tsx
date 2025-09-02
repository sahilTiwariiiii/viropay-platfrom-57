
import React, { useState } from 'react';
import { Clock, Mail } from 'lucide-react';
import UserStatusBadge from './UserStatusBadge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface User {
  id: string;
  email: string;
  status: 'active' | 'moderate' | 'inactive';
  logins: number;
  timeSpent: {
    value: number;
    unit: 'minutes' | 'seconds';
  };
}

interface UserTableProps {
  users: User[];
  isLoading?: boolean;
  itemsPerPage?: number;
}

const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  isLoading = false,
  itemsPerPage = 15
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / itemsPerPage);
  
  const displayedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="divide-y">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="px-6 py-4 flex items-center">
              <div className="flex-1 flex gap-3">
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse ml-4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-subtle transition-all hover:shadow-elevation-1">
      <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
        <h3 className="font-medium">User Activity</h3>
        <div className="text-sm text-muted-foreground">
          Showing {displayedUsers.length} of {users.length} users
        </div>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Logins</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Time Spent</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayedUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <div className="text-sm font-medium text-gray-900">{user.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <UserStatusBadge status={user.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {user.logins}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span>
                    {user.timeSpent.value} {user.timeSpent.unit}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
