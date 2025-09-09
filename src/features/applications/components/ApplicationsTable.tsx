
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Pencil, Trash, ExternalLink } from 'lucide-react';
import { Application } from '../types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

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
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gray-50">
                    {app.category}
                  </Badge>
                  <button
                    type="button"
                    className="ml-1 p-1 rounded hover:bg-gray-100"
                    title="View all subcategories"
                    onClick={() => window.open(`/demo/categories?category=${encodeURIComponent(app.category)}`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 text-saas-blue" />
                  </button>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-700">
                  {app.description || 'No description available'}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">
                  {app.lastUpdated ? new Date(app.lastUpdated).toLocaleDateString() : 'N/A'}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="h-4 w-4 mr-2" />
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 focus:text-red-600">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
