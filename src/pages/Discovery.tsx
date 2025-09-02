
import React from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { useDiscoveryState } from '@/hooks/useDiscoveryState';
import UserListDialog from '@/components/discovery/UserListDialog';
import DiscoveryTabs from '@/components/discovery/DiscoveryTabs';
import DiscoveryStatsCards from '@/components/discovery/DiscoveryStatsCards';
import DiscoveryTable from '@/components/discovery/DiscoveryTable';
import DiscoveryPagination from '@/components/discovery/DiscoveryPagination';

const DiscoveryPage = () => {
  const {
    activeTab,
    setActiveTab,
    currentPage,
    awaitingCount,
    ignoredCount,
    selectedApp,
    isUserDialogOpen,
    totalDiscoveries,
    sourceStats,
    currentDiscoveries,
    totalPages,
    handleApprove,
    handleIgnore,
    handleRestore,
    handlePageChange,
    handleViewUsers,
    handleCloseUserDialog
  } = useDiscoveryState();

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Header
        title="SaaS Discovery"
        subtitle="Track and manage new applications in your organization"
        showBackButton={false}
      />
      
      <main className="flex-1 overflow-y-auto p-6">
        <DiscoveryStatsCards 
          totalDiscoveries={totalDiscoveries}
          sourceStats={sourceStats}
        />
        
        <DiscoveryTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          awaitingCount={awaitingCount}
          ignoredCount={ignoredCount}
        />
        
        <Card className="mb-6">
          <CardContent className="p-0">
            <DiscoveryTable 
              currentDiscoveries={currentDiscoveries}
              currentPage={currentPage}
              itemsPerPage={15}
              activeTab={activeTab}
              onApprove={handleApprove}
              onIgnore={handleIgnore}
              onRestore={handleRestore}
              onViewUsers={handleViewUsers}
            />
          </CardContent>
        </Card>
        
        <DiscoveryPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      
      {selectedApp && (
        <UserListDialog 
          isOpen={isUserDialogOpen}
          onClose={handleCloseUserDialog}
          users={selectedApp.users}
          appName={selectedApp.name}
        />
      )}
    </div>
  );
};

export default DiscoveryPage;
