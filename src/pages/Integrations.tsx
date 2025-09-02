import React, { useState } from 'react';
import { Box, Globe, PlusCircle, Package, Mail, Database, Shield, CreditCard } from 'lucide-react';
import Header from '@/components/layout/Header';
import IntegrationCard from '@/components/integrations/IntegrationCard';
import IntegrationDetails from '@/components/integrations/IntegrationDetails';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Sample integration data with proper icons
const integrationData = [
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    description: 'Import existing applications seamlessly from Google Workspace.',
    longDescription: 'Google Workspace (formerly G Suite) is a collection of cloud computing, productivity and collaboration tools, software and products developed and marketed by Google. Connect your Google Workspace account to automatically import your organization\'s applications and users.',
    icon: <Mail className="w-5 h-5 text-red-500" />,
    enabled: true,
    category: 'productivity',
    features: [
      {
        title: 'User Synchronization',
        description: 'Automatically import and update users from your Google Workspace directory.'
      },
      {
        title: 'SSO Integration',
        description: 'Enable single sign-on using Google accounts for seamless authentication.'
      },
      {
        title: 'Document Integration',
        description: 'Link and access Google Docs, Sheets, and Slides directly within the platform.'
      },
      {
        title: 'Calendar Sync',
        description: 'View and manage Google Calendar events and appointments.'
      }
    ]
  },
  {
    id: 'exact-accounting',
    name: 'Exact Accounting',
    description: 'Import existing applications seamlessly. Just a few clicks away from managing all your operations.',
    longDescription: 'Exact Accounting is a comprehensive financial management solution designed for businesses of all sizes. This integration allows you to connect your accounting data with your application management system for streamlined operations.',
    icon: <Database className="w-5 h-5 text-blue-600" />,
    enabled: true,
    category: 'finance',
    features: [
      {
        title: 'Financial Data Sync',
        description: 'Automatically import financial data related to your applications and subscriptions.'
      },
      {
        title: 'Expense Tracking',
        description: 'Track and categorize expenses for each application in your portfolio.'
      },
      {
        title: 'Invoice Generation',
        description: 'Create and manage invoices directly from the platform.'
      },
      {
        title: 'Budget Allocation',
        description: 'Assign and monitor budgets for your applications and departments.'
      }
    ]
  },
  {
    id: 'microsoft-entra',
    name: 'Microsoft Entra',
    description: 'Just a few clicks away from managing all your operations with Entra.',
    longDescription: 'Microsoft Entra (formerly Azure Active Directory) provides identity and access management solutions. This integration enables secure user authentication and access control for your applications.',
    icon: <Shield className="w-5 h-5 text-blue-700" />,
    enabled: false,
    category: 'identity',
    features: [
      {
        title: 'Identity Management',
        description: 'Centrally manage user identities and access across all your applications.'
      },
      {
        title: 'Conditional Access',
        description: 'Set up security policies based on user, location, device, and application status.'
      },
      {
        title: 'MFA Support',
        description: 'Enable multi-factor authentication for enhanced security.'
      },
      {
        title: 'Automated Provisioning',
        description: 'Automatically provision and deprovision user accounts across applications.'
      }
    ]
  },
  {
    id: 'viropay-extension',
    name: 'Viropay Extension',
    description: 'Viropay extension puts all your operations within reach.',
    longDescription: 'Viropay is a comprehensive payment processing solution that simplifies financial transactions. This extension integrates Viropay\'s powerful payment capabilities directly into your application management system.',
    icon: <CreditCard className="w-5 h-5 text-purple-600" />,
    enabled: true,
    category: 'payments',
    features: [
      {
        title: 'Secure Payments',
        description: 'Process payments securely with industry-standard encryption and compliance.'
      },
      {
        title: 'Subscription Management',
        description: 'Easily manage recurring payments for your SaaS applications.'
      },
      {
        title: 'Payment Analytics',
        description: 'Get detailed insights into your payment flows and financial metrics.'
      },
      {
        title: 'Multi-currency Support',
        description: 'Handle transactions in multiple currencies with automatic conversion.'
      }
    ]
  },
  {
    id: 'moneybird',
    name: 'Moneybird',
    description: 'Import existing applications seamlessly. Just a few clicks away from managing all your operations.',
    longDescription: 'Moneybird is a user-friendly online accounting software designed for freelancers and small businesses. This integration connects your financial data with your application management for comprehensive oversight.',
    icon: <Database className="w-5 h-5 text-green-600" />,
    enabled: false,
    category: 'finance',
    comingSoon: true,
    features: [
      {
        title: 'Invoice Synchronization',
        description: 'Automatically sync invoices between Moneybird and your application management.'
      },
      {
        title: 'Expense Tracking',
        description: 'Monitor and categorize all application-related expenses in one place.'
      },
      {
        title: 'Financial Reporting',
        description: 'Generate comprehensive financial reports for your application portfolio.'
      },
      {
        title: 'Tax Management',
        description: 'Simplify tax calculations and reporting for your application expenses.'
      }
    ]
  },
  {
    id: 'gmail-sync',
    name: 'Gmail Email Sync',
    description: 'Search invoices and financial documents in Gmail to enrich application data.',
    longDescription: 'Gmail Email Sync automatically scans your Gmail inbox for invoices, receipts, and financial documents related to your applications. This integration enriches your application data with financial information and helps track expenses.',
    icon: <Mail className="w-5 h-5 text-red-500" />,
    enabled: false,
    category: 'email',
    features: [
      {
        title: 'Invoice Detection',
        description: 'Automatically detect and parse invoices from your Gmail inbox.'
      },
      {
        title: 'Financial Data Enrichment',
        description: 'Enrich application profiles with expense data from email invoices.'
      },
      {
        title: 'Automated Categorization',
        description: 'Automatically categorize expenses by application and department.'
      },
      {
        title: 'Receipt Processing',
        description: 'Extract key information from receipts and expense documents.'
      }
    ]
  },
  {
    id: 'outlook-sync',
    name: 'Outlook Email Sync',
    description: 'Search invoices and financial documents in Outlook to enrich application data.',
    longDescription: 'Outlook Email Sync provides comprehensive scanning of your Outlook inbox for financial documents and invoices. This integration automatically links expenses to applications and provides detailed financial insights.',
    icon: <Mail className="w-5 h-5 text-blue-600" />,
    enabled: false,
    category: 'email',
    features: [
      {
        title: 'Invoice Detection',
        description: 'Automatically detect and parse invoices from your Outlook inbox.'
      },
      {
        title: 'Financial Data Enrichment',
        description: 'Enrich application profiles with expense data from email invoices.'
      },
      {
        title: 'Automated Categorization',
        description: 'Automatically categorize expenses by application and department.'
      },
      {
        title: 'Receipt Processing',
        description: 'Extract key information from receipts and expense documents.'
      }
    ]
  }
];

const Integrations = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('all');
  const [integrations, setIntegrations] = useState(integrationData);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  // Filter integrations based on search and category
  const filteredIntegrations = integrations.filter(integration => {
    const matchesFilter = integration.name.toLowerCase().includes(filter.toLowerCase()) || 
                          integration.description.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = category === 'all' || integration.category === category;
    return matchesFilter && matchesCategory;
  });

  const handleToggle = (id: string, enabled: boolean) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id ? { ...integration, enabled } : integration
      )
    );
    
    toast({
      title: enabled ? "Integration Enabled" : "Integration Disabled",
      description: `${integrations.find(i => i.id === id)?.name} has been ${enabled ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleIntegrationClick = (id: string) => {
    setSelectedIntegration(id);
  };

  const handleCloseDetails = () => {
    setSelectedIntegration(null);
  };

  const selectedIntegrationData = integrations.find(i => i.id === selectedIntegration);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header 
        title="Integrations" 
        subtitle="Connect and manage your external services and applications"
      />
      
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="w-full md:w-1/3">
              <Input 
                placeholder="Search integrations..." 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Tabs defaultValue="all" value={category} onValueChange={setCategory} className="w-full">
                <TabsList className="grid grid-cols-6 w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="productivity">Productivity</TabsTrigger>
                  <TabsTrigger value="finance">Finance</TabsTrigger>
                  <TabsTrigger value="identity">Identity</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button className="whitespace-nowrap">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Integration
              </Button>
            </div>
          </div>
          
          <div className="mt-4">
            <h2 className="text-xl font-display font-semibold mb-2">All Integrations</h2>
            <p className="text-muted-foreground mb-6">{filteredIntegrations.length} total integrations</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIntegrations.map((integration) => (
                <IntegrationCard
                  key={integration.id}
                  id={integration.id}
                  name={integration.name}
                  description={integration.description}
                  icon={integration.icon}
                  enabled={integration.enabled}
                  onToggle={handleToggle}
                  onClick={handleIntegrationClick}
                  comingSoon={integration.comingSoon}
                />
              ))}
            </div>
            
            {filteredIntegrations.length === 0 && (
              <div className="text-center py-12 border rounded-lg bg-slate-50">
                <div className="flex justify-center mb-4">
                  <Globe className="w-12 h-12 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium mb-2">No integrations found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {selectedIntegrationData && (
        <IntegrationDetails
          id={selectedIntegrationData.id}
          name={selectedIntegrationData.name}
          description={selectedIntegrationData.description}
          longDescription={selectedIntegrationData.longDescription}
          icon={selectedIntegrationData.icon}
          enabled={selectedIntegrationData.enabled}
          features={selectedIntegrationData.features}
          open={!!selectedIntegration}
          onClose={handleCloseDetails}
          onToggle={handleToggle}
        />
      )}
    </div>
  );
};

export default Integrations;
