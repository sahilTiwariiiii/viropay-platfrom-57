
import React, { useState, useEffect } from 'react';
import { Application } from '@/features/applications/types';
import { toast } from 'sonner';
import { format } from 'date-fns';
import StatCardsSection from '../overview/StatCardsSection';
import UsageOverviewSection from '../overview/UsageOverviewSection';
import ApplicationDetailsSection from '../overview/ApplicationDetailsSection';
import MonthlySpendChart from '../overview/MonthlySpendChart';
import { generateUsers, getStatusCounts } from './user-activity/userGenerationUtils';

interface OverviewTabProps {
  applicationData?: Application;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ applicationData }) => {
  const [application, setApplication] = useState<Application | null>(null);
  const [renewalDate, setRenewalDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    owner: '',
    category: '',
    price: '',
    lastUpdated: '',
    renewalDate: ''
  });

  useEffect(() => {
    if (applicationData) {
      setApplication(applicationData);
      setRenewalDate(applicationData.renewalDate);
      setEditedDetails({
        owner: applicationData.owner || 'Unassigned',
        category: applicationData.category || 'Uncategorized',
        price: applicationData.amount || '€0 / mo',
        lastUpdated: applicationData.lastUpdated 
          ? format(new Date(applicationData.lastUpdated), 'MMM dd, yyyy') 
          : 'Not available',
        renewalDate: applicationData.renewalDate
          ? format(new Date(applicationData.renewalDate), 'MMM dd, yyyy')
          : 'Not set'
      });
    }
  }, [applicationData]);

  if (!application) {
    return <div>Loading application data...</div>;
  }

  // Generate users in a consistent way - make sure we use a stable seed
  const appName = application.name || 'Unknown Application';
  const appId = application.id || '0';
  
  // Use the application ID to create a consistent seed
  const seed = appId.charCodeAt(0) + (appId.charCodeAt(1) || 0);
  const userCount = application.users || 0;
  
  // Generate the exact number of users specified in the application data
  const generatedUsers = generateUsers(appName, userCount, seed);
  
  // Get user counts by status
  const statusCounts = getStatusCounts(generatedUsers);
  const activeUsers = statusCounts.active;
  const moderateUsers = statusCounts.moderate;
  const inactiveUsers = statusCounts.inactive;
  const unassignedUsers = statusCounts.unassigned;

  // Verify total matches the application's user count
  const totalGeneratedUsers = activeUsers + moderateUsers + inactiveUsers + unassignedUsers;
  
  // Log to verify the totals match
  console.log(`App ${appName}: Total users from application: ${userCount}, Generated: ${totalGeneratedUsers}`);
  console.log(`Active: ${activeUsers}, Moderate: ${moderateUsers}, Inactive: ${inactiveUsers}, Unassigned: ${unassignedUsers}`);
  
  // Calculate yearly spend
  const yearlySpend = application.yearlySpend || (application.cost * 12);
  
  // Calculate potential savings between 15-25% of annual spend
  // Using app ID to create deterministic but varied savings percentage
  const savingsPercent = 0.15 + ((appId.charCodeAt(0) % 10) / 100);
  const potentialSavings = Math.round(yearlySpend * savingsPercent);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      toast.success("Application details updated successfully");
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <StatCardsSection 
        application={application}
        renewalDate={renewalDate}
        setRenewalDate={setRenewalDate}
        calendarOpen={calendarOpen}
        setCalendarOpen={setCalendarOpen}
        potentialSavings={potentialSavings}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsageOverviewSection 
          users={userCount}
          activeUsers={activeUsers}
          moderateUsers={moderateUsers}
          inactiveUsers={inactiveUsers}
          unassignedUsers={unassignedUsers}
          applicationCost={application.cost}
          yearlySpend={application.yearlySpend || (application.cost * 12)}
        />
        
        <ApplicationDetailsSection 
          editedDetails={editedDetails}
          isEditing={isEditing}
          renewalDate={renewalDate}
          handleEditToggle={handleEditToggle}
          handleInputChange={handleInputChange}
          setIsEditing={setIsEditing}
          setRenewalDate={setRenewalDate}
          setEditedDetails={setEditedDetails}
        />
      </div>
      
      <MonthlySpendChart 
        applicationCost={application.cost}
        yearlySpend={application.yearlySpend || (application.cost * 12)}
        applicationId={application.id}
      />
    </div>
  );
};

export default OverviewTab;
