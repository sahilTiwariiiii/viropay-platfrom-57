
import React from 'react';
import { useLocation } from 'react-router-dom';
import SidebarItem, { SidebarItemProps } from './SidebarItem';

interface MenuCategory {
  title: string;
  items: Omit<SidebarItemProps, 'isActive'>[];
  filterFn: (item: Omit<SidebarItemProps, 'isActive'>, searchTerm: string) => boolean;
}

interface SidebarMenuProps {
  categories: MenuCategory[];
  searchTerm: string;
  onHelpClick: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ 
  categories, 
  searchTerm, 
  onHelpClick 
}) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="mt-4 px-3 space-y-1">
      {categories.map((category, categoryIndex) => {
        const filteredItems = category.items.filter(item => 
          category.filterFn(item, searchTerm)
        );

        if (filteredItems.length === 0) return null;

        return (
          <div key={`category-${categoryIndex}`} className="mb-4">
            <div className="mt-2 mb-2">
              <p className="text-xs font-semibold text-gray-500 px-0 uppercase tracking-wider whitespace-nowrap">
                {category.title}
              </p>
            </div>
            
            <div className="space-y-1">
              {filteredItems.map((item, itemIndex) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname.startsWith(item.href));
                  
                return (
                  <SidebarItem 
                    key={`${category.title}-${itemIndex}`}
                    icon={item.icon} 
                    label={item.label} 
                    href={item.href} 
                    isActive={isActive}
                    hasSubmenu={item.hasSubmenu}
                    submenuItems={item.submenuItems}
                    onClick={item.label === "Help & Support" ? onHelpClick : item.onClick}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarMenu;
