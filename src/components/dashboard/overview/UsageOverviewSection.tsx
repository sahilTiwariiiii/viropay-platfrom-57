
import React from 'react';
import { Users, Banknote } from 'lucide-react';
import UsageProgress from '../UsageProgress';
import { format, subMonths } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';

interface UsageOverviewSectionProps {
  users: number;
  activeUsers: number;
  moderateUsers: number;
  inactiveUsers: number;
  unassignedUsers?: number;  // Add optional unassigned users prop
  applicationCost: number;
  yearlySpend: number;
}

const UsageOverviewSection: React.FC<UsageOverviewSectionProps> = ({
  users,
  activeUsers,
  moderateUsers,
  inactiveUsers,
  unassignedUsers = 0,  // Default to 0 if not provided
  applicationCost,
  yearlySpend
}) => {
  // Calculate the cost per license
  const costPerLicense = users > 0 ? applicationCost / users : 0;
  
  return (
    <Card className="shadow-sm bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-medium text-lg">Usage Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border p-4 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Total Users</div>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-semibold">{users}</div>
            <div className="mt-2 text-xs text-muted-foreground">Licenses provisioned</div>
          </div>
          
          <div className="bg-white rounded-lg border p-4 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Active Users</div>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-semibold">{activeUsers}</div>
            <div className="mt-2 text-xs text-muted-foreground">{users ? Math.round((activeUsers / users) * 100) : 0}% of total users</div>
          </div>
          
          <div className="bg-white rounded-lg border p-4 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Moderate Users</div>
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-orange-500" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-semibold">{moderateUsers}</div>
            <div className="mt-2 text-xs text-muted-foreground">{users ? Math.round((moderateUsers / users) * 100) : 0}% of total users</div>
          </div>
          
          <div className="bg-white rounded-lg border p-4 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Inactive & Unassigned</div>
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-red-500" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-semibold">{inactiveUsers + unassignedUsers}</div>
            <div className="mt-2 text-xs text-muted-foreground">{users ? Math.round(((inactiveUsers + unassignedUsers) / users) * 100) : 0}% of total users</div>
          </div>
        </div>
        
        <UsageProgress 
          segments={[
            { value: activeUsers, label: 'Active', color: 'bg-green-500' },
            { value: moderateUsers, label: 'Moderate', color: 'bg-orange-500' },
            { value: inactiveUsers, label: 'Inactive', color: 'bg-red-500' },
            { value: unassignedUsers, label: 'Unassigned', color: 'bg-gray-500' }
          ]}
          className="mb-4"
        />
      </CardContent>
    </Card>
  );
};

export default UsageOverviewSection;
