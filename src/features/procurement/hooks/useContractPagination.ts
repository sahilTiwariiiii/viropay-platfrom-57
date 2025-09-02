
// This file handles contract pagination
import { useMemo } from 'react';
import { Contract } from '../types';

export const useContractPagination = (
  contracts: Contract[],
  currentPage: number,
  itemsPerPage: number
) => {
  const paginatedContracts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return contracts.slice(startIndex, startIndex + itemsPerPage);
  }, [contracts, currentPage, itemsPerPage]);
  
  const totalPages = Math.ceil(contracts.length / itemsPerPage);
  
  return { paginatedContracts, totalPages };
};
