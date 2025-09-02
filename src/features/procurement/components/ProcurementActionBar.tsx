
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  UploadCloud, 
  Download
} from 'lucide-react';

interface ProcurementActionBarProps {
  totalContracts: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onUploadClick: () => void;
}

const ProcurementActionBar: React.FC<ProcurementActionBarProps> = ({
  totalContracts,
  searchTerm,
  onSearchChange,
  onUploadClick
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <div className="flex items-center w-full md:w-auto">
        <div className="text-lg font-semibold">SaaS Contracts</div>
        <div className="ml-2 text-sm text-gray-500">{totalContracts} Active Contracts</div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="search" 
            placeholder="Search contracts..." 
            className="pl-9 pr-4"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
          
          <Button 
            className="flex items-center gap-2 bg-saas-blue"
            onClick={onUploadClick}
          >
            <UploadCloud className="h-4 w-4" />
            Upload Contracts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProcurementActionBar;
