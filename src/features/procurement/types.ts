export type ContractStatus = 'active' | 'pending' | 'expired' | 'cancelled';

export interface AppInfo {
  id: string;
  name: string;
  logoUrl: string;
  logo?: React.ReactNode;
  category: string;
}

export interface Contract {
  id: string;
  app: AppInfo;
  vendor: string;
  status: ContractStatus;
  type: string;
  startDate: string;
  endDate: string;
  renewalDate: string;
  renewalType: 'auto' | 'manual';
  value: string;
  paymentFrequency: string;
  owner: string;
  notes: string;
  term?: string;
  lastUpdated?: string;
  daysToRenewal?: number;
  annualCost?: string;
  monthlyCost?: string;
  users?: {
    total: number;
    active: number;
  };
  isFavorite?: boolean;
}

export interface ContractSummary {
  totalAnnualCost: string;
  potentialSavings: string;
  liveContracts: number;
}

export interface User {
  email: string;
  count: number;
}

export interface Discovery {
  id: string;
  name: string;
  logo?: string;
  logoUrl?: string;
  users: User[];
  source: string;
  lastUsed: string;
  sourceIcons: string[];
}
