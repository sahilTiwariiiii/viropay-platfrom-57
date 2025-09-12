
import { 
  LayoutDashboard, 
  Search, 
  Settings,
  HelpCircle,
  Box,
  Plug,
  Calendar,
  FileText,
  Users,
  List,
  PlusCircle
} from 'lucide-react';

import { SidebarItemProps } from './SidebarItem';

export type SidebarMenuItem = Omit<SidebarItemProps, 'isActive'> & { 
  category: string 
};

export const getSidebarMenuItems = (): SidebarMenuItem[] => {
  return [
   
    { 
      icon: <Box className="w-5 h-5" />, 
      label: "Categories", 
      href: "/categories", 
      hasSubmenu: true,
      submenuItems: [
        { label: "View All", href: "/category", icon: <List className="w-4 h-4 mr-2" /> },
        { label: "Add New", href: "/category/add", icon: <PlusCircle className="w-4 h-4 mr-2" /> }
      ],
      category: "modules" 
    },
   
    
   
    { 
      icon: <Users className="w-5 h-5" />, 
      label: "Clients Manage", 
      href: "/client-manage", 
      category: "system"
    }
   
  ];
};

export const getMenuCategories = (menuItems: SidebarMenuItem[]) => {
  return [
    {
      title: "Modules",
      items: menuItems.filter(item => item.category === "modules"),
      filterFn: (item: SidebarMenuItem, searchTerm: string) => 
        item.category === "modules" && 
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    },
    {
      title: "System",
      items: menuItems.filter(item => item.category === "system"),
      filterFn: (item: SidebarMenuItem, searchTerm: string) => 
        item.category === "system" && 
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    }
  ];
};
