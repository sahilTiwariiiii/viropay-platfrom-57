
import React from 'react';
import { Contract } from '../types';
import { ArrowUpDown, ChevronUp, ChevronDown, Star } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ApplicationLogo from '@/features/applications/components/ApplicationLogo';

interface ProcurementTableProps {
  contracts: Contract[];
  currentPage: number;
  itemsPerPage: number;
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
  onRowClick: (contract: Contract) => void;
}

const ProcurementTable: React.FC<ProcurementTableProps> = ({
  contracts,
  currentPage,
  itemsPerPage,
  sortField,
  sortDirection,
  onSort,
  onRowClick,
}) => {
  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 ml-1" />;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />;
  };

  const renderRenewalStatus = (daysToRenewal: number) => {
    if (daysToRenewal < 0) {
      return <span className="text-red-500">Overdue by {Math.abs(daysToRenewal)} days</span>;
    } else if (daysToRenewal <= 30) {
      return <span className="text-red-500">in {daysToRenewal} days</span>;
    } else if (daysToRenewal <= 60) {
      return <span className="text-orange-500">in {daysToRenewal} days</span>;
    } else {
      return <span className="text-gray-500">in {daysToRenewal} days</span>;
    }
  };

  return (
    <div className="border rounded-lg bg-white overflow-hidden shadow-subtle mb-4">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-10 text-center">#</TableHead>
            <TableHead>
              <button 
                className="flex items-center font-medium" 
                onClick={() => onSort('application')}
              >
                APPLICATION {getSortIcon('application')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                className="flex items-center font-medium" 
                onClick={() => onSort('renewal')}
              >
                RENEWAL {getSortIcon('renewal')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                className="flex items-center font-medium" 
                onClick={() => onSort('cost')}
              >
                ANNUAL COST {getSortIcon('cost')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                className="flex items-center font-medium" 
                onClick={() => onSort('users')}
              >
                USERS {getSortIcon('users')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                className="flex items-center font-medium" 
                onClick={() => onSort('term')}
              >
                CONTRACT TERM {getSortIcon('term')}
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.map((contract, index) => (
            <TableRow 
              key={contract.id} 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onRowClick(contract)}
            >
              <TableCell className="text-center text-gray-500">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <ApplicationLogo 
                    name={contract.app.name}
                    logoUrl={contract.app.logoUrl}
                    size="sm"
                  />
                  <span className="font-medium">{contract.app.name}</span>
                  {contract.isFavorite && (
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{contract.renewalDate}</div>
                  <div className="text-xs">
                    {renderRenewalStatus(contract.daysToRenewal || 0)}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{contract.annualCost || contract.value}</div>
                  <div className="text-xs text-gray-500">{contract.monthlyCost || '-'} / month</div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{contract.users?.total.toString() || '-'}</div>
                  <div className="text-xs text-gray-500">{contract.users?.active.toString() || '-'} active</div>
                </div>
              </TableCell>
              <TableCell>{contract.term || '-'}</TableCell>
            </TableRow>
          ))}
          
          {contracts.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                <p className="text-gray-500">No contracts found</p>
                <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProcurementTable;
