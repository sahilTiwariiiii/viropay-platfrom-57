import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { ChevronLeft, ChevronRight, Filter, Download, Search, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MonthCard from '@/features/calendar/components/MonthCard';
import UpcomingRenewal from '@/features/calendar/components/UpcomingRenewal';
import MonthDetailsModal from '@/features/calendar/components/MonthDetailsModal';
import { monthsData, getNextUpcomingRenewal, getCurrentMonthName } from '@/features/calendar/data/renewalsData';
import { RenewalData } from '@/features/calendar/types';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const CalendarView = () => {
  const [year, setYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState<RenewalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState<string>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  const upcomingRenewal = getNextUpcomingRenewal();
  const currentMonth = getCurrentMonthName();
  
  const filteredMonths = monthsData.map(month => {
    const filteredRenewals = month.renewals.filter(renewal => {
      const matchesSearch = searchTerm 
        ? renewal.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        : true;
      const matchesFrequency = frequencyFilter !== 'all' 
        ? renewal.billingFrequency.toLowerCase() === frequencyFilter.toLowerCase() 
        : true;
      
      return matchesSearch && matchesFrequency;
    });
    
    return {
      ...month,
      renewals: filteredRenewals,
      amount: filteredRenewals.reduce((sum, renewal) => {
        const amountStr = renewal.amount.replace('€', '').replace('.', '').replace(',', '.').trim();
        return sum + parseFloat(amountStr || '0');
      }, 0)
    };
  });
  
  const totalAnnualAmount = filteredMonths.reduce((sum, month) => sum + month.amount, 0);
  
  const highestMonth = [...filteredMonths].sort((a, b) => b.amount - a.amount)[0];
  
  const handleExport = () => {
    toast.success("Calendar data exported", {
      description: "Your renewal calendar data has been exported successfully."
    });
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const monthIndex = date.getMonth();
      const monthName = new Date(0, monthIndex).toLocaleString('default', { month: 'long' });
      const monthData = monthsData.find(m => m.month === monthName);
      
      if (monthData) {
        setSelectedMonth(monthData);
        setIsModalOpen(true);
      }
      
      setCalendarOpen(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Header
        title="Renewal Calendar"
        subtitle="Track and manage your upcoming renewals"
        showBackButton={false}
      />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Renewal Calendar</h1>
            <div className="flex items-center ml-4 space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setYear(prev => prev - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium">{year}</span>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setYear(prev => prev + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Tabs defaultValue="grid" value={view} onValueChange={(v) => setView(v as 'grid' | 'list')}>
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Jump to Date
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row mb-6 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search renewals..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Frequencies</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        

        {upcomingRenewal && <UpcomingRenewal renewal={upcomingRenewal} />}

        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredMonths.map((monthData) => (
              <MonthCard 
                key={monthData.month}
                monthData={monthData}
                isCurrentMonth={monthData.month === currentMonth}
                onClick={() => {
                  setSelectedMonth(monthData);
                  setIsModalOpen(true);
                }}
              />
            ))}
            
            {filteredMonths.every(month => month.renewals.length === 0) && (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No renewals match your filter criteria</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchTerm('');
                    setFrequencyFilter('all');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Month</th>
                    <th className="text-left p-4">Renewals</th>
                    <th className="text-left p-4">Frequencies</th>
                    <th className="text-right p-4">Amount</th>
                    <th className="text-center p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMonths.map((month) => (
                    <tr key={month.month} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => {
                      setSelectedMonth(month);
                      setIsModalOpen(true);
                    }}>
                      <td className="p-4 font-medium">{month.month}</td>
                      <td className="p-4">{month.renewals.length}</td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(month.renewals.reduce((acc, r) => {
                            acc[r.billingFrequency] = (acc[r.billingFrequency] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)).map(([freq, count]) => (
                            <Badge key={freq} variant="outline" className="text-xs">
                              {freq}: {count}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-right font-medium">
                        {month.amount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                      </td>
                      <td className="p-4 text-center">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredMonths.every(month => month.renewals.length === 0) && (
                    <tr>
                      <td colSpan={5} className="text-center py-10">
                        <p className="text-gray-500">No renewals match your filter criteria</p>
                        <Button 
                          variant="link" 
                          onClick={() => {
                            setSearchTerm('');
                            setFrequencyFilter('all');
                          }}
                        >
                          Clear filters
                        </Button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </main>

      <MonthDetailsModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen}
        selectedMonth={selectedMonth}
        year={year}
      />
    </div>
  );
};

export default CalendarView;
