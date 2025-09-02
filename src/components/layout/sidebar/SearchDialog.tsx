
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';

interface SearchResult {
  label: string;
  href: string;
  category: string;
  icon?: React.ReactNode;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchTerm: string;
  searchResults: SearchResult[];
}

const SearchDialog: React.FC<SearchDialogProps> = ({ 
  open, 
  onOpenChange, 
  searchTerm, 
  searchResults 
}) => {
  const navigate = useNavigate();

  const handleSearchResultClick = (href: string) => {
    onOpenChange(false);
    navigate(href);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search Results</DialogTitle>
          <DialogDescription>
            Results for "{searchTerm}"
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {['Applications', 'Procurement'].map(category => {
                const categoryResults = searchResults.filter(result => 
                  result.category === category
                );
                
                if (categoryResults.length === 0) return null;
                
                return (
                  <div key={category} className="space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground">{category}</h3>
                    <div className="space-y-1">
                      {categoryResults.map((result, idx) => (
                        <button
                          key={idx}
                          className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-md text-left"
                          onClick={() => handleSearchResultClick(result.href)}
                        >
                          {result.icon}
                          <span>{result.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No results found</p>
              <p className="text-sm text-gray-400">Try a different search term</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
