
// This file handles contract sorting and filtering
import { useMemo } from 'react';
import { Contract } from '../types';

export const useContractSorting = (
  contracts: Contract[],
  searchTerm: string,
  sortField: string | null,
  sortDirection: 'asc' | 'desc'
) => {
  return useMemo(() => {
    let result = [...contracts];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(contract => 
        contract.app.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortField) {
      result.sort((a, b) => {
        let aValue, bValue;
        
        switch (sortField) {
          case 'application':
            aValue = a.app.name;
            bValue = b.app.name;
            break;
          case 'renewal':
            aValue = new Date(a.renewalDate).getTime();
            bValue = new Date(b.renewalDate).getTime();
            break;
          case 'cost':
            aValue = parseInt(a.value.replace(/[^0-9]/g, ''));
            bValue = parseInt(b.value.replace(/[^0-9]/g, ''));
            break;
          case 'users':
            aValue = a.users?.total || 0;
            bValue = b.users?.total || 0;
            break;
          case 'term':
            aValue = a.term || '';
            bValue = b.term || '';
            break;
          default:
            aValue = a.app.name;
            bValue = b.app.name;
        }
        
        if (sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }
    
    return result;
  }, [contracts, searchTerm, sortField, sortDirection]);
};
