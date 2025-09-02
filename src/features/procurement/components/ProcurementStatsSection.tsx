
import React from 'react';
import { DollarSign, LightbulbIcon, FileText } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { ContractSummary } from '../types';

interface ProcurementStatsProps {
  summary: ContractSummary;
}

const ProcurementStatsSection: React.FC<ProcurementStatsProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <StatCard
        title="Total Annual Cost"
        value={summary.totalAnnualCost}
        icon={<DollarSign className="h-5 w-5" />}
        color="blue"
      />
      <StatCard
        title="Potential Savings"
        value={summary.potentialSavings}
        icon={<LightbulbIcon className="h-5 w-5" />}
        color="green"
      />
      <StatCard
        title="Live Contracts"
        value={summary.liveContracts.toString()}
        icon={<FileText className="h-5 w-5" />}
        color="orange"
      />
    </div>
  );
};

export default ProcurementStatsSection;
