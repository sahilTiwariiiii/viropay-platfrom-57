
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { OWNER_OPTIONS } from '../types';

interface OwnerSelectionProps {
  owner: string | null;
  ownerInitials?: string;
  appId: string;
  onOwnerChange: (appId: string, owner: string) => void;
}

const OwnerSelection: React.FC<OwnerSelectionProps> = ({ 
  owner, 
  ownerInitials, 
  appId, 
  onOwnerChange 
}) => {
  return (
    <>
      {owner ? (
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
              {ownerInitials}
            </AvatarFallback>
          </Avatar>
          <span className="ml-2 text-sm">{owner}</span>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 text-xs flex items-center gap-1 border-dashed">
              <UserPlus className="h-3.5 w-3.5" />
              Assign owner
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0">
            <div className="py-2">
              <div className="px-3 py-2 text-sm font-medium text-gray-900">
                Select Owner
              </div>
              <div className="mt-1 max-h-60 overflow-auto">
                {OWNER_OPTIONS.map((option) => (
                  <button 
                    key={option}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
                    onClick={() => onOwnerChange(appId, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default OwnerSelection;
