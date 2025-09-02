
export interface User {
  name: string;
  email: string;
  role: 'Admin' | 'Member' | 'Viewer';
  status: 'Active' | 'Pending';
}

export interface CompanyInfo {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  companyType: string;
  industry: string;
  employeeCount: string;
  annualRevenue: string;
}

export interface SubscriptionPlan {
  name: string;
  isActive: boolean;
  model: string;
  fee: string;
  totalSavings: string;
  contractPeriod: string;
  feeAmount: string;
  netSavings: string;
}
