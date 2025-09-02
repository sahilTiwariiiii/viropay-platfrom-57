
import React, { useState } from 'react';
import ViropayLogo from './ViropayLogo';
import SidebarMenu from './sidebar/SidebarMenu';
import UserProfile from './sidebar/UserProfile';
import SearchDialog from './sidebar/SearchDialog';
import HelpDialog from './sidebar/HelpDialog';
import { useGlobalSearch } from './sidebar/useGlobalSearch';
import { getSidebarMenuItems, getMenuCategories } from './sidebar/SidebarData';
import { ScrollArea } from '@/components/ui/scroll-area';

const Sidebar = () => {
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  
  const {
    searchTerm,
    setSearchTerm,
    searchDialogOpen,
    setSearchDialogOpen,
    globalSearchResults,
    handleSearch
  } = useGlobalSearch();

  const menuItems = getSidebarMenuItems();
  const menuCategories = getMenuCategories(menuItems);
  
  return (
    <div className="w-64 h-screen border-r border-border bg-white flex flex-col overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex justify-center">
        <span className="font-display text-xl font-semibold text-gray-900">
          viropay
        </span>
      </div>

      <ScrollArea className="flex-1">
        <SidebarMenu 
          categories={menuCategories}
          searchTerm={searchTerm}
          onHelpClick={() => setIsHelpDialogOpen(true)}
        />
      </ScrollArea>

      <UserProfile />

      <SearchDialog 
        open={searchDialogOpen}
        onOpenChange={setSearchDialogOpen}
        searchTerm={searchTerm}
        searchResults={globalSearchResults}
      />

      <HelpDialog 
        open={isHelpDialogOpen}
        onOpenChange={setIsHelpDialogOpen}
      />
    </div>
  );
};

export default Sidebar;
