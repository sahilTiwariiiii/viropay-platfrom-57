
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  DollarSign, 
  Download, 
  Filter, 
  Package, 
  Search, 
  Users, 
  ArrowUpRight
} from 'lucide-react';
import ApplicationLogo from '@/features/applications/components/ApplicationLogo';
import { contractsData } from '@/features/procurement/data/contractsData';
import { Contract } from '@/features/procurement/types';

const ActionsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Process contract data
  const processedContracts = contractsData.map(contract => {
    const renewalDate = new Date(contract.renewalDate);
    const today = new Date();
    const diffTime = renewalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      ...contract,
      daysToRenewal: diffDays,
    };
  });

  // Get upcoming renewals (next 30 days)
  const upcomingRenewals = processedContracts
    .filter(contract => contract.daysToRenewal > 0 && contract.daysToRenewal <= 30)
    .sort((a, b) => a.daysToRenewal - b.daysToRenewal);

  // Mock data for underutilized apps and unassigned licenses
  const underutilizedApps = [
    {
      id: '1',
      name: 'Adobe Creative Cloud',
      logoUrl: '/app-logos/adobe-logo.png',
      utilization: '32%',
      monthlyCost: '€450',
      potentialSavings: '€306'
    },
    {
      id: '2',
      name: 'Zoom',
      logoUrl: '/app-logos/zoom-logo.png',
      utilization: '45%',
      monthlyCost: '€375',
      potentialSavings: '€206'
    },
    {
      id: '3',
      name: 'Slack',
      logoUrl: '/app-logos/slack-logo.png',
      utilization: '51%',
      monthlyCost: '€233',
      potentialSavings: '€114'
    }
  ];

  const unassignedLicenses = [
    {
      id: '1',
      name: 'Microsoft 365',
      logoUrl: '/app-logos/microsoft-logo.png',
      unassigned: 12,
      totalLicenses: 85,
      monthlyCost: '€1,266',
      potentialSavings: '€180'
    },
    {
      id: '2',
      name: 'Salesforce',
      logoUrl: '/app-logos/salesforce-logo.png',
      unassigned: 5,
      totalLicenses: 25,
      monthlyCost: '€833',
      potentialSavings: '€166'
    },
    {
      id: '3',
      name: 'HubSpot',
      logoUrl: '/app-logos/hubspot-logo.png',
      unassigned: 3,
      totalLicenses: 18,
      monthlyCost: '€700',
      potentialSavings: '€117'
    }
  ];

  // Get filtered items based on search term
  const filterItems = (items: any[], searchTerm: string) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredRenewals = filterItems(upcomingRenewals, searchTerm);
  const filteredUnderutilized = filterItems(underutilizedApps, searchTerm);
  const filteredUnassigned = filterItems(unassignedLicenses, searchTerm);

  // Get total potential savings
  const getTotalSavings = () => {
    const underutilizedSavings = filteredUnderutilized.reduce(
      (sum, app) => sum + parseInt(app.potentialSavings.replace(/[^0-9]/g, '')), 
      0
    );
    
    const unassignedSavings = filteredUnassigned.reduce(
      (sum, app) => sum + parseInt(app.potentialSavings.replace(/[^0-9]/g, '')), 
      0
    );
    
    return `€${(underutilizedSavings + unassignedSavings).toLocaleString()}`;
  };

  const renderRenewalStatus = (daysToRenewal: number) => {
    if (daysToRenewal <= 7) {
      return <span className="text-red-500 font-medium">Critical: {daysToRenewal} days</span>;
    } else if (daysToRenewal <= 14) {
      return <span className="text-orange-500 font-medium">Urgent: {daysToRenewal} days</span>;
    } else {
      return <span className="text-yellow-600 font-medium">Soon: {daysToRenewal} days</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Header
        title="Actions Required"
        subtitle="Review and address important SaaS management tasks"
        showBackButton={false}
      />
      
      <main className="flex-1 overflow-y-auto p-6">
        {/* Action Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <span>Upcoming Renewals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{upcomingRenewals.length}</div>
              <p className="text-sm text-gray-500">Contracts renewing in next 30 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Underutilized Apps</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{underutilizedApps.length}</div>
              <p className="text-sm text-gray-500">Applications with low usage rates</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <span>Potential Savings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{getTotalSavings()}</div>
              <p className="text-sm text-gray-500">Annual savings opportunity</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-lg font-semibold">Required Actions</div>
          
          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="search" 
                placeholder="Search actions..." 
                className="pl-9 pr-4 py-2 w-full border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tabs for Different Action Types */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Actions</TabsTrigger>
            <TabsTrigger value="renewals">Renewals</TabsTrigger>
            <TabsTrigger value="underutilized">Underutilized</TabsTrigger>
            <TabsTrigger value="unassigned">Unassigned Licenses</TabsTrigger>
          </TabsList>
          
          {/* All Actions Tab */}
          <TabsContent value="all">
            <div className="space-y-6">
              {/* Upcoming Renewals Section */}
              {filteredRenewals.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-500" />
                    Upcoming Renewals
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRenewals.slice(0, 3).map((contract: Contract) => (
                      <Card key={contract.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <ApplicationLogo 
                              logoUrl={contract.app.logoUrl} 
                              name={contract.app.name} 
                              size="md"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-base">{contract.app.name}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                <Clock className="h-4 w-4 text-gray-400" />
                                {renderRenewalStatus(contract.daysToRenewal || 0)}
                              </div>
                              <div className="mt-2 text-sm text-gray-600">Renewal: {contract.renewalDate}</div>
                              <div className="mt-3 pt-3 border-t flex justify-between items-center">
                                <span className="text-sm font-medium">Value: {contract.value}</span>
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                  Details
                                  <ArrowUpRight className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Underutilized Apps Section */}
              {filteredUnderutilized.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Underutilized Applications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUnderutilized.slice(0, 3).map((app) => (
                      <Card key={app.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <ApplicationLogo 
                              logoUrl={app.logoUrl} 
                              name={app.name} 
                              size="md"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-base">{app.name}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                <Package className="h-4 w-4 text-gray-400" />
                                <span className="text-red-500 font-medium">Utilization: {app.utilization}</span>
                              </div>
                              <div className="mt-2 text-sm text-gray-600">Monthly cost: {app.monthlyCost}</div>
                              <div className="mt-3 pt-3 border-t flex justify-between items-center">
                                <span className="text-sm font-medium text-green-600">Savings: {app.potentialSavings}</span>
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                  Optimize
                                  <ArrowUpRight className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Unassigned Licenses Section */}
              {filteredUnassigned.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Unassigned Licenses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUnassigned.slice(0, 3).map((app) => (
                      <Card key={app.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <ApplicationLogo 
                              logoUrl={app.logoUrl} 
                              name={app.name} 
                              size="md"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-base">{app.name}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span className="text-blue-500 font-medium">{app.unassigned} / {app.totalLicenses} unused</span>
                              </div>
                              <div className="mt-2 text-sm text-gray-600">Monthly cost: {app.monthlyCost}</div>
                              <div className="mt-3 pt-3 border-t flex justify-between items-center">
                                <span className="text-sm font-medium text-green-600">Savings: {app.potentialSavings}</span>
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                  Manage
                                  <ArrowUpRight className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Show when no actions are found */}
              {filteredRenewals.length === 0 && filteredUnderutilized.length === 0 && filteredUnassigned.length === 0 && (
                <div className="py-12 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No actions found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Renewals Tab */}
          <TabsContent value="renewals">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRenewals.length > 0 ? filteredRenewals.map((contract: Contract) => (
                <Card key={contract.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <ApplicationLogo 
                        logoUrl={contract.app.logoUrl} 
                        name={contract.app.name} 
                        size="md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-base">{contract.app.name}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          {renderRenewalStatus(contract.daysToRenewal || 0)}
                        </div>
                        <div className="mt-2 text-sm text-gray-600">Renewal: {contract.renewalDate}</div>
                        <div className="mt-3 pt-3 border-t flex justify-between items-center">
                          <span className="text-sm font-medium">Value: {contract.value}</span>
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            Details
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <div className="col-span-full py-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No upcoming renewals found</h3>
                  <p className="text-gray-500">Great! All your contracts are renewed for at least 30 days</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Underutilized Tab */}
          <TabsContent value="underutilized">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUnderutilized.length > 0 ? filteredUnderutilized.map((app) => (
                <Card key={app.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <ApplicationLogo 
                        logoUrl={app.logoUrl} 
                        name={app.name} 
                        size="md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-base">{app.name}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span className="text-red-500 font-medium">Utilization: {app.utilization}</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">Monthly cost: {app.monthlyCost}</div>
                        <div className="mt-3 pt-3 border-t flex justify-between items-center">
                          <span className="text-sm font-medium text-green-600">Savings: {app.potentialSavings}</span>
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            Optimize
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <div className="col-span-full py-12 text-center">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No underutilized applications found</h3>
                  <p className="text-gray-500">All your applications are being used efficiently</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Unassigned Licenses Tab */}
          <TabsContent value="unassigned">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUnassigned.length > 0 ? filteredUnassigned.map((app) => (
                <Card key={app.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <ApplicationLogo 
                        logoUrl={app.logoUrl} 
                        name={app.name} 
                        size="md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-base">{app.name}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-blue-500 font-medium">{app.unassigned} / {app.totalLicenses} unused</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">Monthly cost: {app.monthlyCost}</div>
                        <div className="mt-3 pt-3 border-t flex justify-between items-center">
                          <span className="text-sm font-medium text-green-600">Savings: {app.potentialSavings}</span>
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            Manage
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <div className="col-span-full py-12 text-center">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No unassigned licenses found</h3>
                  <p className="text-gray-500">All your licenses are currently assigned to users</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ActionsPage;
