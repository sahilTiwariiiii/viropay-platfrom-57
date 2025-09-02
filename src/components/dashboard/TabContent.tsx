
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import OverviewTab from './tabs/OverviewTab';
import UsageTab from './tabs/UsageTab';
import BillingTab from './tabs/BillingTab';
import { Application } from '@/features/applications/types';

interface TabContentProps {
  applicationData?: Application;
}

const TabContent: React.FC<TabContentProps> = ({ applicationData }) => {
  // Store the application data in state to persist it across tab changes
  const [appData, setAppData] = useState<Application | undefined>(applicationData);
  
  // Update the state when applicationData changes (from parent)
  useEffect(() => {
    if (applicationData) {
      setAppData(applicationData);
    }
  }, [applicationData]);

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="usage">Usage</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-0">
        <OverviewTab applicationData={appData} />
      </TabsContent>
      
      <TabsContent value="usage" className="mt-0">
        <UsageTab applicationData={appData} />
      </TabsContent>
      
      <TabsContent value="billing" className="mt-0">
        <BillingTab applicationData={appData} />
      </TabsContent>
    </Tabs>
  );
};

export default TabContent;
