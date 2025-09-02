
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, ChevronsRight, TrendingUp, TrendingDown } from 'lucide-react';
import { RenewalData } from '../types';
import ApplicationLogo from '@/features/applications/components/ApplicationLogo';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface MonthCardProps {
  monthData: RenewalData;
  isCurrentMonth: boolean;
  onClick: () => void;
}

const MonthCard: React.FC<MonthCardProps> = ({ monthData, isCurrentMonth, onClick }) => {
  const { month, renewals, amount } = monthData;
  
  // Only show the first 5 applications, and indicate if there are more
  const displayedRenewals = renewals.slice(0, 5);
  const hasMoreRenewals = renewals.length > 5;
  
  // Calculate distribution of billing frequencies
  const billingDistribution = renewals.reduce(
    (acc, renewal) => {
      acc[renewal.billingFrequency] = (acc[renewal.billingFrequency] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  
  
  return (
    <Card 
      className={`hover:shadow-md transition-all cursor-pointer 
        ${isCurrentMonth ? 'border-blue-300 bg-blue-50' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold ${isCurrentMonth ? 'text-blue-700' : ''}`}>{month}</h3>
          {isCurrentMonth && (
            <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">
              Current
            </span>
          )}
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">Renewals</div>
          <div className="flex flex-wrap gap-2 mb-1">
            {displayedRenewals.map((renewal) => (
              <div key={renewal.id} className="relative group">
                <ApplicationLogo 
                  name={renewal.name}
                  logoUrl={renewal.logoUrl}
                  logo={renewal.logo}
                  size="sm"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link 
                    to={`/demo/application/${renewal.id}`}
                    className="absolute inset-0 z-10"
                    onClick={(e) => e.stopPropagation()}
                  ></Link>
                </div>
              </div>
            ))}
            {hasMoreRenewals && (
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-700">
                +{renewals.length - 5}
              </div>
            )}
          </div>
          <div className="text-sm text-gray-700">{renewals.length} total</div>
          
          {/* Billing frequency distribution */}
          <div className="flex gap-1 mt-2">
            {Object.entries(billingDistribution).map(([frequency, count]) => (
              <Badge key={frequency} variant="outline" className="text-xs">
                {frequency}: {count}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">Total Amount</div>
          <div className="text-2xl font-semibold">
            {amount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </div>
        </div>
        
        {renewals.length > 0 && (
          <div className="flex items-center justify-between pt-2 mt-4 border-t text-sm text-blue-600">
            <span>View applications</span>
            <ChevronsRight className="h-4 w-4" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthCard;
