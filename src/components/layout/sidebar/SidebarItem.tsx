
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  submenuItems?: { label: string; href: string; icon?: React.ReactNode }[];
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  href, 
  isActive = false,
  hasSubmenu = false,
  submenuItems = [],
  onClick
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const toggleSubmenu = (e: React.MouseEvent) => {
    if (hasSubmenu) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };
  
  return (
    <div className="w-full">
      <Link 
        to={hasSubmenu ? '#' : href}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick();
          } else if (hasSubmenu) {
            toggleSubmenu(e);
          }
        }}
        className={cn(
          "flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors",
          isActive && !hasSubmenu
            ? "bg-primary text-white font-medium" 
            : "text-gray-600 hover:bg-gray-50"
        )}
      >
        <div className="flex items-center gap-2.5">
          <div className={cn("w-4 h-4", isActive && !hasSubmenu ? "text-white" : "text-gray-500")}>{icon}</div>
          <span className={cn("font-normal", isActive && !hasSubmenu ? "font-medium" : "")}>{label}</span>
        </div>
        {hasSubmenu && (
          isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        )}
      </Link>
      
      {hasSubmenu && isOpen && (
        <div className="ml-7 mt-1 space-y-1 border-l border-gray-100 pl-2">
          {submenuItems.map((item, index) => (
            <Link 
              key={index}
              to={item.href}
              className="flex items-center py-1.5 px-2 text-sm text-gray-500 hover:text-blue-600"
            >
              {item.icon && <span className="mr-1.5">{item.icon}</span>}
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
