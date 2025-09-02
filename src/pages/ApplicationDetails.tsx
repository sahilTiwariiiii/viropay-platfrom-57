
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import TabContent from '@/components/dashboard/TabContent';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateExtendedApplications } from '@/features/applications/utils/generateApplicationsData';
import { Application } from '@/features/applications/types';
import ApplicationLogo from '@/features/applications/components/ApplicationLogo';

const ApplicationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    // This simulates fetching application data
    const fetchApplication = () => {
      const applications = generateExtendedApplications();
      const foundApp = applications.find(app => app.id === id);
      
      if (foundApp) {
        setApplication(foundApp);
      } else {
        // Fallback with the unknown application that includes all required fields
        setApplication({
          id: id || '0',
          name: 'Unknown Application',
          status: 'active',
          description: 'No description available',
          logo: '',
          logoUrl: '',
          category: 'Unknown',
          owner: '',
          ownerInitials: '',
          ownerStatus: 'not-assigned',
          users: 0,
          amount: '€0 / mo',
          cost: 0,
          yearlySpend: 0,
          nextPayment: 'Not set',
          renewalDate: new Date(),
          lastUpdated: new Date()
        });
      }
      
      setIsLoading(false);
    };
    
    fetchApplication();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!application) {
    return <div className="flex-1 flex items-center justify-center">Application not found</div>;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Header
        title={application.name}
        subtitle="Application Details"
        showBackButton={true}
      />
      
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="mb-6">
          <CardContent className="p-6 flex items-start justify-between">
            <div className="flex items-center">
              <div className="mr-4">
                <ApplicationLogo 
                  logoUrl={application.logoUrl}
                  name={application.name}
                  logo={application.logo}
                  size="lg"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">{application.name}</h2>
                {application.description && (
                  <p className="text-muted-foreground mb-2">{application.description}</p>
                )}
                {application.category && (
                  <div className="text-sm flex items-center">
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{application.category}</span>
                  </div>
                )}
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </CardContent>
        </Card>
        
        <TabContent applicationData={application} />
      </main>
    </div>
  );
};

export default ApplicationDetails;
