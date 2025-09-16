
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
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
  const [open, setOpen] = useState(false);
  // Detect user role (assume 'admin' if not client)
  const role = localStorage.getItem('role');

  // For admin: use current sidebar
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

  // For client: show only My Leads
  if (role === 'client') {
    return (
      <>
        <button
          className="fixed top-4 left-4 z-50 bg-white border rounded-md p-2 shadow-md sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div
          className={`w-64 h-screen border-r border-border bg-white flex flex-col overflow-hidden fixed top-0 left-0 z-40 transition-transform duration-300 sm:relative sm:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}
        >
          <div className="p-5 border-b border-gray-100 flex justify-center">
            <img src="/applogo.png" alt="App Logo" className="h-10 w-auto" />
          </div>
          <nav className="flex-1 px-4 py-8">
            <a
              href="/my-leads"
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-primary bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 transition-all"
            >
              <Menu className="h-5 w-5 text-primary" />
              My Leads
            </a>
          </nav>
        </div>
        {open && <div className="fixed inset-0 bg-black/30 z-30 sm:hidden" onClick={() => setOpen(false)} />}
      </>
    );
  }

  // Default: admin sidebar
  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 bg-white border rounded-md p-2 shadow-md sm:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>
      <div
        className={`w-64 h-screen border-r border-border bg-white flex flex-col overflow-hidden fixed top-0 left-0 z-40 transition-transform duration-300 sm:relative sm:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}
      >
        <div className="p-5 border-b border-gray-100 flex justify-center">
          <img src="/applogo.png" alt="App Logo" className="h-10 w-auto" />
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
      {open && <div className="fixed inset-0 bg-black/30 z-30 sm:hidden" onClick={() => setOpen(false)} />}
    </>
  );
};

export default Sidebar;
