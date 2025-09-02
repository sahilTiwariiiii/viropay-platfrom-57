
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ApplicationLogo from '@/features/applications/components/ApplicationLogo';
import { Discovery } from '@/features/procurement/types';
import UserDisplay from './UserDisplay';

interface DiscoveryTableProps {
  currentDiscoveries: Discovery[];
  currentPage: number;
  itemsPerPage: number;
  activeTab: 'awaiting' | 'ignored';
  onApprove: (id: string, name: string) => void;
  onIgnore: (id: string, name: string) => void;
  onRestore: (id: string, name: string) => void;
  onViewUsers: (discovery: Discovery) => void;
}

const DiscoveryTable: React.FC<DiscoveryTableProps> = ({
  currentDiscoveries,
  currentPage,
  itemsPerPage,
  activeTab,
  onApprove,
  onIgnore,
  onRestore,
  onViewUsers
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50 hover:bg-gray-50">
          <TableHead className="w-12">#</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Users</TableHead>
          <TableHead>Last Used</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentDiscoveries.length > 0 ? (
          currentDiscoveries.map((discovery, index) => (
            <TableRow key={discovery.id} className="h-[70px]">
              <TableCell className="font-medium">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <ApplicationLogo 
                    name={discovery.name}
                    logoUrl={discovery.logoUrl || ''}
                    logo={discovery.logo}
                    className="flex-shrink-0"
                    size="sm"
                  />
                  <div className="ml-3">
                    <span className="font-medium">{discovery.name}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-1.5">
                  {discovery.sourceIcons.includes('Google Workspace') && (
                    <div className="w-7 h-7 rounded flex items-center justify-center bg-red-100 text-red-600">
                      G
                    </div>
                  )}
                  {discovery.sourceIcons.includes('Microsoft') && (
                    <div className="w-7 h-7 rounded flex items-center justify-center bg-blue-100 text-blue-600">
                      M
                    </div>
                  )}
                  {discovery.sourceIcons.includes('Chrome Extension') && (
                    <div className="w-7 h-7 rounded flex items-center justify-center bg-green-100 text-green-600">
                      C
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <UserDisplay 
                  discovery={discovery} 
                  onViewAll={() => onViewUsers(discovery)} 
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-3 w-3 mr-1" />
                  {discovery.lastUsed}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {activeTab === 'awaiting' ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onApprove(discovery.id, discovery.name)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-500"
                        onClick={() => onIgnore(discovery.id, discovery.name)}
                      >
                        Ignore
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRestore(discovery.id, discovery.name)}
                    >
                      Restore
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-[200px] text-center text-muted-foreground">
              {activeTab === 'awaiting' 
                ? "No applications awaiting approval"
                : "No ignored applications"}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DiscoveryTable;
