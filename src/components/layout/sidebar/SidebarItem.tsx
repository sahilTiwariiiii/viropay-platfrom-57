
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
  submenuItems?: { label: string; href: string }[];
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
          "flex items-center justify-between w-full px-4 py-2.5 text-sm rounded-lg transition-colors",
          isActive && !hasSubmenu
            ? "bg-blue-100 text-blue-700 font-medium" 
            : "text-gray-700 hover:bg-gray-100"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 text-gray-600">{icon}</div>
          <span className="font-medium">{label}</span>
        </div>
        {hasSubmenu && (
          isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        )}
      </Link>
      
      {hasSubmenu && isOpen && (
        <div className="ml-9 mt-1 space-y-1 border-l border-gray-200 pl-3">
          {submenuItems.map((item, index) => (
            <Link 
              key={index}
              to={item.href}
              className="block py-2 px-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
