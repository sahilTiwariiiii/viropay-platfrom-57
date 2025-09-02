
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, BarChart3 } from 'lucide-react';
import {
  Tabs,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Application } from '@/features/applications/types';
import MonthlySpendChart from '../overview/MonthlySpendChart';

interface BillingTabProps {
  applicationData?: Application;
}

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
}

const invoices: Invoice[] = [
  { id: 'INV-001', date: 'Aug 15, 2023', amount: '€572', status: 'paid' },
  { id: 'INV-002', date: 'Jul 15, 2023', amount: '€572', status: 'paid' },
  { id: 'INV-003', date: 'Jun 15, 2023', amount: '€572', status: 'paid' },
  { id: 'INV-004', date: 'May 15, 2023', amount: '€572', status: 'paid' },
];

// Add the applicationData prop to the component
const BillingTab: React.FC<BillingTabProps> = ({ applicationData }) => {
  const [timeframe, setTimeframe] = useState<'monthly' | 'yearly' | 'all'>('monthly');

  // Use applicationData.amount if available, otherwise use default values
  const monthlyAmount = applicationData?.amount || '€572';
  const yearlyAmount = applicationData?.yearlySpend 
    ? `€${applicationData.yearlySpend}` 
    : '€6,864';

  const spendingData = {
    monthly: monthlyAmount,
    yearly: yearlyAmount,
    all: '€14,300'
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Monthly Spending</h3>
              <div className="p-2 rounded-full bg-blue-100">
                <BarChart3 className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-semibold">{monthlyAmount}</div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Yearly Spending</h3>
              <div className="p-2 rounded-full bg-green-100">
                <BarChart3 className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-semibold">{yearlyAmount}</div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">All-time Spending</h3>
              <div className="p-2 rounded-full bg-purple-100">
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-semibold">€14,300</div>
          </CardContent>
        </Card>
      </div>

      {/* Use MonthlySpendChart component for more consistent visuals */}
      {applicationData && (
        <MonthlySpendChart 
          applicationCost={applicationData.cost}
          yearlySpend={applicationData.yearlySpend || applicationData.cost * 12}
        />
      )}
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-medium">Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left font-medium text-muted-foreground">Invoice</th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">Date</th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">Amount</th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b hover:bg-muted/50">
                    <td className="py-4 font-medium">{invoice.id}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm">{invoice.date}</span>
                      </div>
                    </td>
                    <td className="py-4 font-medium">{invoice.amount}</td>
                    <td className="py-4">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        invoice.status === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : invoice.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </div>
                    </td>
                    <td className="py-4">
                      <button className="text-sm text-blue-600 hover:underline">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingTab;
