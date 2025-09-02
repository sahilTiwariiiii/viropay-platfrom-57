
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, Archive, CalendarPlus } from 'lucide-react';
import { Application } from '../types';
import ApplicationLogo from './ApplicationLogo';
import OwnerSelection from './OwnerSelection';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

interface ApplicationsTableProps {
  applications: Application[];
  onOwnerChange: (appId: string, owner: string) => void;
  onStatusChange: (appId: string, status: 'active' | 'archived') => void;
  onNextPaymentChange: (appId: string, date: Date) => void;
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ 
  applications, 
  onOwnerChange,
  onStatusChange,
  onNextPaymentChange
}) => {
  const [openDatePicker, setOpenDatePicker] = useState<string | null>(null);

  const handleDateSelect = (appId: string, date: Date | undefined) => {
    if (date) {
      onNextPaymentChange(appId, date);
      setOpenDatePicker(null);
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Users</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Next Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} className="hover:bg-gray-50">
              <TableCell>
                <Link to={`/demo/application/${app.id}`} className="flex items-center group">
                  <ApplicationLogo 
                    logoUrl={app.logoUrl} 
                    name={app.name} 
                    logo={app.logo}
                  />
                  <span className="ml-3 font-medium group-hover:text-blue-600 transition-colors">
                    {app.name}
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-gray-50">
                  {app.category}
                </Badge>
              </TableCell>
              <TableCell>
                <OwnerSelection 
                  owner={app.owner} 
                  ownerInitials={app.ownerInitials} 
                  appId={app.id} 
                  onOwnerChange={onOwnerChange} 
                />
              </TableCell>
              <TableCell>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {app.users}
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {app.amount}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Badge 
                      className={
                        app.status === 'active' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer'
                      }
                    >
                      {app.status === 'active' ? (
                        <><CheckCircle className="h-3.5 w-3.5 mr-1" />Active</>
                      ) : (
                        <><Archive className="h-3.5 w-3.5 mr-1" />Archived</>
                      )}
                    </Badge>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => onStatusChange(app.id, app.status === 'active' ? 'archived' : 'active')}>
                      {app.status === 'active' ? 'Archive application' : 'Activate application'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>
                {app.nextPayment ? (
                  <div className="flex items-center text-sm">
                    <Clock className="h-3.5 w-3.5 text-gray-400 mr-1.5" />
                    {app.nextPayment}
                  </div>
                ) : (
                  <Popover open={openDatePicker === app.id} onOpenChange={(open) => {
                    if (open) setOpenDatePicker(app.id);
                    else setOpenDatePicker(null);
                  }}>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600 hover:text-blue-800 px-2 py-1 h-auto flex items-center text-xs"
                      >
                        <CalendarPlus className="h-3.5 w-3.5 mr-1" />
                        Add date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={undefined}
                        onSelect={(date) => handleDateSelect(app.id, date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </TableCell>
            </TableRow>
          ))}
          
          {applications.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10">
                <p className="text-gray-500">No applications found</p>
                <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationsTable;
