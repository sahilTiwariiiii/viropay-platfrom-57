
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Application } from '@/features/applications/types';
import UserStatusFilterTabs from './user-activity/UserStatusFilterTabs';
import UserActivityTable, { UserData } from './user-activity/UserActivityTable';
import TimePeriodFilter from './user-activity/TimePeriodFilter';
import { 
  generateUsers, 
  getStatusCounts, 
  filterUsersByTimePeriod,
  TimePeriod,
  GeneratedUser,
  UserStatus
} from './user-activity/userGenerationUtils';

interface UsageTabProps {
  applicationData?: Application;
}

const UsageTab: React.FC<UsageTabProps> = ({ applicationData }) => {
  const appName = applicationData?.name || 'Unknown Application';
  const appId = applicationData?.id || '0';
  const totalUsers = applicationData?.users || 0;
  
  // Use the application ID to create a consistent seed
  const seed = appId.charCodeAt(0) + (appId.charCodeAt(1) || 0);
  
  // Generate the exact same users with the same counts as in OverviewTab
  const [allUsers, setAllUsers] = useState<GeneratedUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<GeneratedUser[]>([]);
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('all');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;
  
  useEffect(() => {
    // Generate exactly the number of users specified in application data
    const generatedUsers = generateUsers(appName, totalUsers, seed);
    setAllUsers(generatedUsers);
    setFilteredUsers(generatedUsers);
    
    // Log to verify the totals match with what's shown in Overview tab
    const counts = getStatusCounts(generatedUsers);
    console.log(`UsageTab - App ${appName}: Total users: ${totalUsers}`);
    console.log(`Active: ${counts.active}, Moderate: ${counts.moderate}, Inactive: ${counts.inactive}, Unassigned: ${counts.unassigned}`);
    console.log(`Sum: ${counts.active + counts.moderate + counts.inactive + counts.unassigned}`);
  }, [appName, totalUsers, appId, seed]);
  
  useEffect(() => {
    // First, filter by time period
    const timeFilteredUsers = filterUsersByTimePeriod(allUsers, timePeriod);
    
    // Then apply status filter
    if (statusFilter === 'all') {
      setFilteredUsers(timeFilteredUsers);
    } else {
      setFilteredUsers(timeFilteredUsers.filter(user => user.status === statusFilter));
    }
    
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [statusFilter, timePeriod, allUsers]);
  
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );
  
  const statusCount = getStatusCounts(allUsers);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-medium">User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <UserStatusFilterTabs 
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              statusCount={statusCount}
            />
            
            <TimePeriodFilter 
              timePeriod={timePeriod}
              setTimePeriod={setTimePeriod}
            />
          </div>
          
          {/* User activity table */}
          <UserActivityTable
            displayedUsers={displayedUsers}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageTab;
