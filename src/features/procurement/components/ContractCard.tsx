
import React from 'react';
import { Contract } from '@/features/procurement/types';
import { Calendar, Clock, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ApplicationLogo from '@/features/applications/components/ApplicationLogo';
import { Button } from '@/components/ui/button';

interface ContractCardProps {
  contract: Contract;
  onCardClick: (contract: Contract) => void;
}

const ContractCard: React.FC<ContractCardProps> = ({ contract, onCardClick }) => {
  const getDaysRemainingClass = (daysToRenewal: number | undefined) => {
    if (!daysToRenewal) return 'text-gray-500';
    if (daysToRenewal < 0) return 'text-red-600';
    if (daysToRenewal <= 30) return 'text-red-500';
    if (daysToRenewal <= 60) return 'text-orange-500';
    return 'text-green-500';
  };
  
  const getDaysRemainingText = (daysToRenewal: number | undefined) => {
    if (!daysToRenewal) return 'No date';
    if (daysToRenewal < 0) return `${Math.abs(daysToRenewal)} days overdue`;
    if (daysToRenewal === 0) return 'Today';
    if (daysToRenewal === 1) return 'Tomorrow';
    return `${daysToRenewal} days`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onCardClick(contract)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <ApplicationLogo name={contract.app.name} logoUrl={contract.app.logoUrl} size="sm" />
            <div>
              <h3 className="font-medium">{contract.app.name}</h3>
              <span className="text-xs text-gray-500">{contract.app.category}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="px-2">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Value</span>
            <span className="font-medium">{contract.value}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Status</span>
            <span className={`text-sm ${contract.status === 'active' ? 'text-green-500' : 'text-gray-500'}`}>
              {contract.status === 'active' ? 'Active' : 'Expired'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3.5 w-3.5" />
              <span>Renewal</span>
            </div>
            <span className="text-sm">{contract.renewalDate}</span>
          </div>
          
          <div className="flex justify-between items-center pt-1">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              <span>Remaining</span>
            </div>
            <span className={`text-sm ${getDaysRemainingClass(contract.daysToRenewal)}`}>
              {getDaysRemainingText(contract.daysToRenewal)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractCard;
