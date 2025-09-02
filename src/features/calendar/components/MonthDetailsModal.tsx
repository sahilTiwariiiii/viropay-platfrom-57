
import React, { useState, useMemo } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, ChevronDown, ChevronUp, Download, ExternalLink, Search, Filter } from 'lucide-react';
import ApplicationLogo from '@/features/applications/components/ApplicationLogo';
import { Link } from 'react-router-dom';
import { RenewalData, Renewal } from '../types';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface MonthDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMonth: RenewalData | null;
  year: number;
}

const MonthDetailsModal: React.FC<MonthDetailsModalProps> = ({ 
  isOpen, 
  onOpenChange, 
  selectedMonth, 
  year 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [frequencyFilter, setFrequencyFilter] = useState<string>('all');
  
  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort renewals
  const processedRenewals = useMemo(() => {
    if (!selectedMonth) return [];
    
    // Filter renewals
    let result = selectedMonth.renewals.filter(renewal => {
      const matchesSearch = searchTerm
        ? renewal.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
        
      const matchesFrequency = frequencyFilter !== 'all'
        ? renewal.billingFrequency.toLowerCase() === frequencyFilter.toLowerCase()
        : true;
        
      return matchesSearch && matchesFrequency;
    });
    
    // Sort renewals
    result.sort((a, b) => {
      let compareValueA: string | number;
      let compareValueB: string | number;
      
      switch (sortField) {
        case 'name':
          compareValueA = a.name.toLowerCase();
          compareValueB = b.name.toLowerCase();
          break;
        case 'date':
          compareValueA = new Date(a.date).getTime();
          compareValueB = new Date(b.date).getTime();
          break;
        case 'price':
          compareValueA = parseFloat(a.amount.replace(/[^0-9.,]/g, '').replace(',', '.'));
          compareValueB = parseFloat(b.amount.replace(/[^0-9.,]/g, '').replace(',', '.'));
          break;
        case 'billingFrequency':
          compareValueA = a.billingFrequency;
          compareValueB = b.billingFrequency;
          break;
        case 'unassigned':
          compareValueA = a.unassigned;
          compareValueB = b.unassigned;
          break;
        default:
          compareValueA = new Date(a.date).getTime();
          compareValueB = new Date(b.date).getTime();
      }
      
      const compareResult = typeof compareValueA === 'string'
        ? compareValueA.localeCompare(compareValueB as string)
        : compareValueA - (compareValueB as number);
        
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });
    
    return result;
  }, [selectedMonth, searchTerm, sortField, sortDirection, frequencyFilter]);

  // Calculate totals
  const totalAmount = useMemo(() => {
    if (!processedRenewals.length) return 0;
    
    return processedRenewals.reduce((sum, renewal) => {
      const amount = parseFloat(renewal.amount.replace(/[^0-9.,]/g, '').replace(',', '.'));
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  }, [processedRenewals]);

  const handleExport = () => {
    toast.success("Exported successfully", {
      description: `${selectedMonth?.month} ${year} renewals data has been exported.`,
    });
  };

  // Render sort indicator for table headers
  const renderSortIndicator = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-3 w-3 inline ml-1" />
    ) : (
      <ChevronDown className="h-3 w-3 inline ml-1" />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center justify-between">
            <span>{selectedMonth?.month} {year} Renewals</span>
            <DialogClose className="hidden" />
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-2">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search by name..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
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
              
              <Button variant="outline" onClick={handleExport} className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    Application {renderSortIndicator('name')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('billingFrequency')}
                  >
                    Billing Frequency {renderSortIndicator('billingFrequency')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    Renewal Date {renderSortIndicator('date')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('usage')}
                  >
                    Usage % {renderSortIndicator('usage')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('unassigned')}
                  >
                    Unassigned {renderSortIndicator('unassigned')}
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer"
                    onClick={() => handleSort('price')}
                  >
                    Price {renderSortIndicator('price')}
                  </TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedRenewals.length > 0 ? (
                  processedRenewals.map((renewal) => (
                    <TableRow key={renewal.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>
                        <Link to={`/demo/application/${renewal.id}`} className="flex items-center group">
                          <ApplicationLogo 
                            name={renewal.name}
                            logoUrl={renewal.logoUrl}
                            logo={renewal.logo}
                            size="sm"
                          />
                          <span className="ml-2 font-medium group-hover:text-blue-600 transition-colors">{renewal.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`
                            ${renewal.billingFrequency === 'Annual' ? 'bg-blue-100 text-blue-800' : 
                              renewal.billingFrequency === 'Quarterly' ? 'bg-purple-100 text-purple-800' : 
                              'bg-green-100 text-green-800'
                            }
                          `}
                        >
                          {renewal.billingFrequency}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarIcon className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                          {renewal.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              renewal.usage > 80 ? 'bg-green-500' : 
                              renewal.usage > 60 ? 'bg-blue-500' : 
                              renewal.usage > 40 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} 
                            style={{ width: `${renewal.usage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{renewal.usage}%</div>
                      </TableCell>
                      <TableCell>
                        {renewal.unassigned > 0 ? (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                            {renewal.unassigned}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                            0
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-medium">{renewal.amount}</TableCell>
                      <TableCell>
                        <Link to={`/demo/application/${renewal.id}`}>
                          <Button variant="ghost" size="icon" title="View Application">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      <p className="text-gray-500">No renewals match your search criteria</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center mt-4 text-sm">
            <div>Total: {processedRenewals.length} renewals</div>
            <div className="font-medium">
              Total amount: {totalAmount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MonthDetailsModal;
