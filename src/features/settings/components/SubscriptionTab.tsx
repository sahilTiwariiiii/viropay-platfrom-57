
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, CreditCard, FileText } from 'lucide-react';
import { SubscriptionPlan } from '../types';

const SubscriptionTab = () => {
  const [subscription, setSubscription] = React.useState<SubscriptionPlan>({
    name: 'Smart Savings Model',
    isActive: true,
    model: '15-25% fee on savings',
    fee: '15-25%',
    totalSavings: '€15,780.42',
    contractPeriod: 'June 15, 2023 - June 15, 2024',
    feeAmount: '€3,156.084',
    netSavings: '€12,624.336'
  });

  return (
    <div className="space-y-8">
      {/* Active Plan */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-1">Active Plan</h2>
          <p className="text-gray-500">Details of your current subscription.</p>
        </div>

        <h3 className="text-xl font-semibold mb-2">{subscription.name}</h3>
        <div className="flex items-center mb-4">
          <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-600">Active plan</span>
        </div>

        <div className="space-y-2 mb-6">
          <p className="text-gray-600">Your subscription model: {subscription.model}</p>
          <p className="text-gray-600">Total savings so far: {subscription.totalSavings}</p>
          <p className="text-gray-600">Contract period: {subscription.contractPeriod}</p>
        </div>

        <div className="flex flex-col space-y-3">
          <Button variant="outline" className="justify-between w-full">
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Edit Billing Information
            </div>
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="justify-between w-full">
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              View Contract
            </div>
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline">
            View Subscription Details
          </Button>
        </div>
      </div>

      {/* Savings Overview */}
      <div className="bg-blue-50 rounded-lg border border-blue-100 p-6">
        <div className="flex items-center mb-2 text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <circle cx="12" cy="12" r="10" />
            <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
            <path d="M12 18V6" />
          </svg>
          <h2 className="text-xl font-semibold">Savings Overview</h2>
        </div>
        <p className="text-gray-600 mb-6">Your total savings identified through our service.</p>

        <div className="mb-6">
          <div className="text-gray-600 mb-1">Total savings</div>
          <div className="text-4xl font-bold text-blue-600">{subscription.totalSavings}</div>
        </div>

        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full mb-6">
          {subscription.fee} fee
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Your fee amount</span>
            <span className="text-blue-600 font-semibold">{subscription.feeAmount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Your net savings</span>
            <span className="text-blue-600 font-semibold">{subscription.netSavings}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTab;
