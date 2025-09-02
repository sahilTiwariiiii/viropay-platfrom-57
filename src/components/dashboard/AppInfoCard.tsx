
import React, { useState } from 'react';
import { Check, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import ApplicationLogo from '@/features/applications/components/ApplicationLogo';

interface AppInfoCardProps {
  name: string;
  logo?: string | React.ReactNode;
  logoUrl?: string;
  isActive?: boolean;
  className?: string;
  owner?: string | null;
  onOwnerChange?: (owner: string) => void;
}

const OWNER_OPTIONS = [
  "Jerry van der Horst",
  "Ruben Attena",
  "Sarah Williams",
  "Michael Chen",
  "Priya Patel"
];

const AppInfoCard: React.FC<AppInfoCardProps> = ({ 
  name, 
  logo, 
  logoUrl,
  isActive = false,
  className,
  owner = null,
  onOwnerChange
}) => {
  const [open, setOpen] = useState(false);

  const handleOwnerSelect = (selectedOwner: string) => {
    if (onOwnerChange) {
      onOwnerChange(selectedOwner);
    }
    setOpen(false);
  };

  return (
    <div className={cn(
      "p-4 flex items-center space-x-4 rounded-lg border border-border transition-all",
      "hover:shadow-elevation-1 bg-white",
      className
    )}>
      <div className="flex-shrink-0">
        {React.isValidElement(logo) ? (
          logo
        ) : (
          <ApplicationLogo 
            name={name}
            logoUrl={logoUrl}
            logo={typeof logo === 'string' ? logo : undefined}
            size="md"
          />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{name}</p>
        <div className="flex items-center mt-1">
          {isActive ? (
            <span className="inline-flex items-center text-xs text-saas-green">
              <Check className="w-3 h-3 mr-1" />
              Active
            </span>
          ) : (
            <span className="text-xs text-gray-500">Inactive</span>
          )}
          
          {onOwnerChange && (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button className="ml-4 text-xs flex items-center text-blue-600 hover:text-blue-800">
                  {owner ? owner : (
                    <>
                      <UserPlus className="w-3 h-3 mr-1" />
                      Assign owner
                    </>
                  )}
                </button>
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
                        className={cn(
                          "w-full px-3 py-2 text-sm text-left hover:bg-gray-100",
                          owner === option && "bg-blue-50 text-blue-700"
                        )}
                        onClick={() => handleOwnerSelect(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppInfoCard;
