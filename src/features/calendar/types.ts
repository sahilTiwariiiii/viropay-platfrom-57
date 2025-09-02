
export interface Renewal {
  id: string;
  name: string;
  logo?: string;
  logoUrl?: string;
  date: string;
  amount: string;
  billingFrequency: 'Monthly' | 'Quarterly' | 'Annual';
  usage: number;
  unassigned: number;
}

export interface RenewalData {
  month: string;
  renewals: Renewal[];
  amount: number;
}

export interface UpcomingRenewal extends Renewal {
  daysLeft: number;
}
