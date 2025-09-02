
import React from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { BarChart3, Users, Calendar as CalendarIcon, Edit, Banknote } from 'lucide-react';
import { format } from 'date-fns';
import { Application } from '@/features/applications/types';

interface StatCardsSectionProps {
  application: Application;
  renewalDate: Date | undefined;
  setRenewalDate: (date: Date | undefined) => void;
  calendarOpen: boolean;
  setCalendarOpen: (open: boolean) => void;
  potentialSavings?: number;
}

const StatCardsSection: React.FC<StatCardsSectionProps> = ({
  application,
  renewalDate,
  setRenewalDate,
  calendarOpen,
  setCalendarOpen,
  potentialSavings = 0
}) => {
  // Calculate values from application data
  const yearlySpend = application.yearlySpend || (application.cost * 12);
  const users = application.users || 0;
  
  // Calculate potential savings between 15-25% of yearly spend if not provided
  const calculatedSavings = potentialSavings || (() => {
    // Use app ID to create a consistent calculation that's between 15-25%
    const appIdValue = application.id ? application.id.charCodeAt(0) : 0;
    const savingPercent = 0.15 + ((appIdValue % 10) / 100);
    return Math.round(yearlySpend * savingPercent);
  })();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Annual Spending</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{`€${yearlySpend}`}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid Licenses</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{`${users}`}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
          <Banknote className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{`€${calculatedSavings}`}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Renewal</CardTitle>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={renewalDate}
                onSelect={(date) => {
                  setRenewalDate(date);
                  setCalendarOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {renewalDate ? format(renewalDate, 'MMM dd, yyyy') : 'Not set'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCardsSection;
