
import React from 'react';
import { Clock, Mail, Globe, MinusCircle } from 'lucide-react';
import UserStatusBadge from '../../UserStatusBadge';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import ApplicationsPagination from '@/features/applications/components/ApplicationsPagination';
import { GeneratedUser } from './userGenerationUtils';

// Replace the UserData interface with GeneratedUser type
export type UserData = GeneratedUser;

interface UserActivityTableProps {
  displayedUsers: UserData[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const UserActivityTable: React.FC<UserActivityTableProps> = ({
  displayedUsers,
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Logins</TableHead>
              <TableHead>Time Spent</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead>Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedUsers.map((user) => (
              <TableRow key={user.id} className={user.status === 'unassigned' ? 'bg-gray-50' : ''}>
                <TableCell>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className={`font-medium ${user.status === 'unassigned' ? 'text-gray-500' : ''}`}>
                      {user.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <UserStatusBadge status={user.status} />
                </TableCell>
                <TableCell>
                  {user.status === 'unassigned' ? (
                    <div className="text-gray-500">—</div>
                  ) : (
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted">
                      {user.logins}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {user.status === 'unassigned' ? (
                    <div className="text-gray-500">—</div>
                  ) : (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>
                        {user.timeSpent.value} {user.timeSpent.unit}
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {user.status === 'unassigned' ? (
                    <span className="text-gray-500">Never</span>
                  ) : (
                    user.lastSeen
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {user.status === 'unassigned' ? (
                      <>
                        <MinusCircle className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{user.source}</span>
                      </>
                    ) : (
                      <>
                        <Globe className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm">{user.source}</span>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-4">
          <ApplicationsPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
};

export default UserActivityTable;
