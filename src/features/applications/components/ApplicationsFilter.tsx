
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Download, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApplications } from '../context/ApplicationsContext';

interface ApplicationsFilterProps {
  activeCount: number;
  archivedCount: number;
}

const ApplicationsFilter: React.FC<ApplicationsFilterProps> = ({
  activeCount,
  archivedCount
}) => {
  const navigate = useNavigate();
  const { activeTab, setActiveTab, searchQuery, setSearchQuery } = useApplications();
  
  const handleAddApplication = () => {
    navigate('/demo/applications/add');
  };

  return (
    <div className="p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as 'active' | 'archived')}
        className="w-full sm:w-auto"
      >
        <TabsList>
          <TabsTrigger value="active" className="flex gap-2">
            Active <Badge variant="outline" className="ml-1">{activeCount}</Badge>
          </TabsTrigger>
          <TabsTrigger value="archived" className="flex gap-2">
            Archived <Badge variant="outline" className="ml-1">{archivedCount}</Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex w-full sm:w-auto gap-2">
        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search applications..." 
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
        <Button 
          className="bg-saas-blue hover:bg-saas-blue/90 text-white flex items-center gap-2"
          onClick={handleAddApplication}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Application</span>
        </Button>
      </div>
    </div>
  );
};

export default ApplicationsFilter;
