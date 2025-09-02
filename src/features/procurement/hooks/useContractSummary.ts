
// This file contains hook for calculating contract summary stats
import { useMemo } from 'react';
import { Contract, ContractSummary } from '../types';

export const useContractSummary = (contracts: Contract[]): ContractSummary => {
  // Calculate contract summary stats
  return useMemo(() => {
    // Sum all contract values
    const totalValue = contracts.reduce((sum, contract) => {
      const value = parseInt(contract.value.replace(/[^0-9]/g, ''));
      return sum + value;
    }, 0);
    
    // Calculate potential savings as 15-25% of total (randomized but consistent)
    const savingsPercentage = 0.15 + (Math.sin(totalValue * 0.1) * 0.05 + 0.05);
    const potentialSavings = Math.round(totalValue * savingsPercentage);
    
    // Count active contracts
    const liveContracts = contracts.filter(c => c.status === 'active').length;
    
    return {
      totalAnnualCost: `€${totalValue.toLocaleString()}`,
      potentialSavings: `€${potentialSavings.toLocaleString()}`,
      liveContracts
    };
  }, [contracts]);
};
