
import { useState } from 'react';
import { Contract } from '../types';
import { expandContractsData } from './useContractsExpandedData';
import { useContractSummary } from './useContractSummary';
import { useContractProcessing } from './useContractProcessing';
import { useContractSorting } from './useContractSorting';
import { useContractPagination } from './useContractPagination';

export const useContractsData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [contracts, setContracts] = useState(expandContractsData());
  const itemsPerPage = 15;

  // Process contract data to include days to renewal
  const processedContracts = useContractProcessing(contracts);
  
  // Calculate contract summary stats
  const contractSummary = useContractSummary(contracts);
  
  // Apply sorting and filtering
  const sortedAndFilteredContracts = useContractSorting(
    processedContracts, 
    searchTerm, 
    sortField, 
    sortDirection
  );
  
  // Paginate the results
  const { paginatedContracts, totalPages } = useContractPagination(
    sortedAndFilteredContracts,
    currentPage,
    itemsPerPage
  );
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Function to update a contract
  const updateContract = (updatedContract: Contract) => {
    setContracts(prevContracts => 
      prevContracts.map(contract => 
        contract.id === updatedContract.id ? {
          ...contract,
          ...updatedContract,
          // Ensure term is always present as it's required in the contracts state
          term: updatedContract.term || contract.term || 'Annual',
        } : contract
      )
    );
  };

  return {
    searchTerm,
    setSearchTerm,
    sortField,
    sortDirection,
    currentPage,
    itemsPerPage,
    totalPages,
    contractSummary,
    processedContracts,
    sortedAndFilteredContracts,
    paginatedContracts,
    handleSort,
    handlePageChange,
    updateContract
  };
};

export default useContractsData;
