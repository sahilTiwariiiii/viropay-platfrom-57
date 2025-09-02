
import { useState } from 'react';
import { Box, FileText } from 'lucide-react';

export const useGlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [globalSearchResults, setGlobalSearchResults] = useState<{
    label: string;
    href: string;
    category: string;
    icon?: React.ReactNode;
  }[]>([]);

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    
    if (searchValue.length >= 2) {
      setSearchDialogOpen(true);
      
      // Search applications
      import('@/features/applications/data/applicationsData').then(({ applicationsData }) => {
        const applicationResults = applicationsData
          .filter(app => 
            app.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            app.category.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map(app => ({
            label: app.name,
            href: `/application/${app.id}`,
            category: 'Applications',
            icon: <Box className="w-4 h-4" />
          }));
          
        // Search contracts  
        import('@/features/procurement/data/contractsData').then(({ contractsData }) => {
          const contractResults = contractsData
            .filter(contract => 
              contract.app.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              contract.vendor.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map(contract => ({
              label: `${contract.app.name} Contract`,
              href: '/procurement',
              category: 'Procurement',
              icon: <FileText className="w-4 h-4" />
            }));
            
          setGlobalSearchResults([...applicationResults, ...contractResults]);
        });
      });
    } else {
      setSearchDialogOpen(false);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    searchDialogOpen,
    setSearchDialogOpen,
    globalSearchResults,
    handleSearch
  };
};
