
import React from 'react';
import Header from '@/components/layout/Header';
import StatisticsCards from '@/features/applications/components/StatisticsCards';
import ApplicationsFilter from '@/features/applications/components/ApplicationsFilter';
import ApplicationsContent from '@/features/applications/components/ApplicationsContent';
import { ApplicationsProvider } from '@/features/applications/context/ApplicationsContext';
import { generateExtendedApplications } from '@/features/applications/utils/generateApplicationsData';

const Applications = () => {
  const initialApplications = generateExtendedApplications();
  
  // Calculate stats for the header cards - only include active applications
  const activeApps = initialApplications.filter(app => app.status === 'active');
  const archivedApps = initialApplications.filter(app => app.status === 'archived');
  
  // Make sure we're using the correct total monthly spend
  const totalMonthlySpend = activeApps.reduce((sum, app) => sum + app.cost, 0);
  
  // Calculate stats for the filter tabs
  const activeApplications = activeApps.length;
  const archivedApplications = archivedApps.length;
  
  console.log(`Active applications: ${activeApplications}, Archived applications: ${archivedApplications}`);
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Header
        title="Applications"
        subtitle="Manage and monitor your SaaS applications"
        showBackButton={false}
      />
      
      <main className="flex-1 overflow-y-auto p-6">
        <ApplicationsProvider initialApplications={initialApplications}>
          <StatisticsCards 
            applications={activeApps} 
            totalMonthlySpend={totalMonthlySpend} 
          />
          
          <ApplicationsFilter 
            activeCount={activeApplications}
            archivedCount={archivedApplications}
          />
          
          <ApplicationsContent />
        </ApplicationsProvider>
      </main>
    </div>
  );
};

export default Applications;
