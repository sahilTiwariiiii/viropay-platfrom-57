
// This file contains the utility function to expand contracts data
import { Contract } from '../types';
import { contractsData } from '../data/contractsData';

// Expand contracts data to have 34 total contracts with valid dates and terms
export const expandContractsData = (): Contract[] => {
  // Start with original contracts and ensure valid dates
  const expanded = [...contractsData].map(contract => {
    // Add contract terms if missing
    const termOptions = ['Annual', 'Monthly', '2-Year', '3-Year', 'Quarterly'];
    const term = contract.term || termOptions[Math.floor(Math.random() * termOptions.length)];
    
    // Ensure renewal dates are not overdue
    let renewalDate = new Date(contract.renewalDate);
    const today = new Date();
    
    // If renewal date is in the past, set it to a future date (30-360 days from now)
    if (renewalDate < today) {
      const daysToAdd = Math.floor(Math.random() * 330) + 30; // Between 30 and 360 days
      renewalDate = new Date(today);
      renewalDate.setDate(today.getDate() + daysToAdd);
    }
    
    return {
      ...contract,
      term,
      renewalDate: renewalDate.toISOString().split('T')[0] // Format as YYYY-MM-DD
    };
  });
  
  // Add more contracts to reach 34 total
  while (expanded.length < 34) {
    const originalContract = contractsData[expanded.length % contractsData.length];
    const newId = (expanded.length + 1).toString();
    
    // Generate future renewal date (30-360 days from now)
    const today = new Date();
    const daysToAdd = Math.floor(Math.random() * 330) + 30;
    const renewalDate = new Date(today);
    renewalDate.setDate(today.getDate() + daysToAdd);
    
    // Assign a random term
    const termOptions = ['Annual', 'Monthly', '2-Year', '3-Year', 'Quarterly'];
    const term = termOptions[Math.floor(Math.random() * termOptions.length)];
    
    expanded.push({
      ...originalContract,
      id: newId,
      term,
      renewalDate: renewalDate.toISOString().split('T')[0],
      app: {
        ...originalContract.app,
        id: newId
      }
    });
  }
  
  return expanded;
};
