
// This file processes contract data and adds calculated fields
import { useMemo } from 'react';
import { Contract } from '../types';

export const useContractProcessing = (contracts: Contract[]) => {
  return useMemo(() => {
    return contracts.map(contract => {
      const renewalDate = new Date(contract.renewalDate);
      const today = new Date();
      const diffTime = renewalDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Create monthly cost from the annual value (for display purposes)
      const valueNum = parseInt(contract.value.replace(/[^0-9]/g, ''));
      const monthlyCost = `€${Math.round(valueNum / 12).toLocaleString()}`;
      
      return {
        ...contract,
        daysToRenewal: diffDays,
        annualCost: contract.value,
        monthlyCost,
        users: {
          total: Math.floor(Math.random() * 300) + 20, // Random data for demo
          active: Math.floor(Math.random() * 250) + 20 // Random data for demo
        },
        isFavorite: contract.id === '1' || contract.id === '6' || contract.id === '12' // Demo favorites
      };
    });
  }, [contracts]);
};
