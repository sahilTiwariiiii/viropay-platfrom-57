
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, Package } from 'lucide-react';
import { Application } from '../types';

interface StatisticsCardsProps {
  applications: Application[];
  totalMonthlySpend?: number;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ applications, totalMonthlySpend }) => {
  // Calculate stats for the header cards
  const totalApplications = applications.length;
  const activeApplications = applications.filter(app => app.status === 'active').length;
  const archivedApplications = applications.filter(app => app.status === 'archived').length;
  
  // If totalMonthlySpend is not provided, calculate it
  const calculatedTotalSpend = totalMonthlySpend || applications.reduce((sum, app) => {
    if (app.status === 'active') {
      const amount = app.amount.includes('€') ? 
        parseFloat(app.amount.replace('€', '').replace(' / mo', '')) : 0;
      return sum + amount;
    }
    return sum;
  }, 0);
  
  // Calculate annual spend from monthly
  const annualSpend = calculatedTotalSpend * 12;
  
  // Calculate potential savings (15-25% of annual spend)
  // Using a consistent random number based on the number of applications
  const savingsPercent = 0.15 + ((applications.length % 10) / 100);
  const potentialSavings = Math.round(annualSpend * savingsPercent);
  
  const totalLicenses = applications.reduce((sum, app) => sum + app.users, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Total Applications Card */}
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <rect width="16" height="16" x="4" y="4" rx="2" />
                <rect width="6" height="6" x="9" y="9" rx="1" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Applications</p>
              <h3 className="text-2xl font-semibold">{totalApplications}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Monthly Spend Card */}
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
                <path d="M12 18V6" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Monthly Spend</p>
              <h3 className="text-2xl font-semibold">€{calculatedTotalSpend.toLocaleString()}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Total Licenses Card */}
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Licenses</p>
              <h3 className="text-2xl font-semibold">{totalLicenses}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCards;
