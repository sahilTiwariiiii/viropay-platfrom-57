
export interface Application {
  id: string;
  name: string;
  description: string;
  logo: string;
  logoUrl?: string;
  category: string;
  owner: string | null;
  ownerInitials?: string;
  ownerStatus?: 'assigned' | 'not-assigned';
  ownerName?: string;
  ownerEmail?: string;
  users: number;
  amount: string;
  cost: number;
  yearlySpend?: number;
  status: 'active' | 'archived';
  nextPayment: string;
  renewalDate: Date;
  lastUpdated: Date;
  usageLastMonth?: number;
}

export const OWNER_OPTIONS = [
  "Jerry van der Horst",
  "Ruben Attena",
  "Sarah Williams",
  "Michael Chen",
  "Priya Patel"
];
