
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Contract } from '@/features/procurement/types';
import ContractDetailsModal from '@/features/procurement/components/ContractDetailsModal';
import BulkUploadDialog from '@/features/procurement/components/BulkUploadDialog';
import ProcurementStatsSection from '@/features/procurement/components/ProcurementStatsSection';
import ProcurementActionBar from '@/features/procurement/components/ProcurementActionBar';
import ProcurementTable from '@/features/procurement/components/ProcurementTable';
import ProcurementPagination from '@/features/procurement/components/ProcurementPagination';
import useContractsData from '@/features/procurement/hooks/useContractsData';

const Procurement = () => {
  const {
    searchTerm,
    setSearchTerm,
    sortField,
    sortDirection,
    currentPage,
    itemsPerPage,
    totalPages,
    contractSummary,
    sortedAndFilteredContracts,
    paginatedContracts,
    handleSort,
    handlePageChange,
    updateContract
  } = useContractsData();

  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  
  const handleRowClick = (contract: Contract) => {
    setSelectedContract(contract);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedContract(null);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Header
        title="Procurement"
        subtitle="Manage SaaS contracts and renewals"
        showBackButton={false}
      />
      
      <main className="flex-1 overflow-y-auto p-6">
        {/* Summary Cards */}
        <ProcurementStatsSection summary={contractSummary} />
        
        {/* Action Bar */}
        <ProcurementActionBar 
          totalContracts={sortedAndFilteredContracts.length}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onUploadClick={() => setIsUploadDialogOpen(true)}
        />
        
        {/* Contracts Table */}
        <ProcurementTable 
          contracts={paginatedContracts}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onRowClick={handleRowClick}
        />
        
        {/* Pagination */}
        <ProcurementPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sortedAndFilteredContracts.length}
          itemsPerPage={itemsPerPage}
          currentItems={paginatedContracts.length}
          onPageChange={handlePageChange}
        />
      </main>
      
      <ContractDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        contract={selectedContract}
      />
      
      <BulkUploadDialog 
        isOpen={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
      />
    </div>
  );
};

export default Procurement;
