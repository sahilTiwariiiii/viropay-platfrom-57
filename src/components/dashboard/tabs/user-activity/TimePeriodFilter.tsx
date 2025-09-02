
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from "lucide-react";
import { TimePeriod } from './userGenerationUtils';

interface TimePeriodFilterProps {
  timePeriod: TimePeriod;
  setTimePeriod: (period: TimePeriod) => void;
}

const TimePeriodFilter: React.FC<TimePeriodFilterProps> = ({ 
  timePeriod, 
  setTimePeriod 
}) => {
  const periodLabels = {
    'week': 'Past Week',
    'month': 'Past Month',
    '6months': 'Past 6 Months',
    'year': 'Past Year',
    'all': 'All Time'
  };

  return (
    <div className="flex items-center mb-4">
      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
      <div className="text-sm mr-2">View data for:</div>
      <Select value={timePeriod} onValueChange={(value: TimePeriod) => setTimePeriod(value)}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Select time period" />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(periodLabels) as TimePeriod[]).map((period) => (
            <SelectItem key={period} value={period}>
              {periodLabels[period]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimePeriodFilter;
