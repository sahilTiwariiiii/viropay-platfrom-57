
import { 
  LayoutDashboard, 
  Search, 
  Settings,
  HelpCircle,
  Box,
  Plug,
  Calendar,
  FileText,
} from 'lucide-react';
import { SidebarItemProps } from './SidebarItem';

export type SidebarMenuItem = Omit<SidebarItemProps, 'isActive'> & { 
  category: string 
};

export const getSidebarMenuItems = (): SidebarMenuItem[] => {
  return [
    // { 
    //   icon: <LayoutDashboard className="w-5 h-5" />, 
    //   label: "Dashboard", 
    //   href: "/demo/dashboard", 
    //   category: "modules" 
    // },
    // { 
    //   icon: <Search className="w-5 h-5" />, 
    //   label: "Discovery", 
    //   href: "/demo/discovery", 
    //   category: "modules" 
    // },
    { 
      icon: <Box className="w-5 h-5" />, 
      label: "Categories", 
      href: "/categories", 
      hasSubmenu: true,
      submenuItems: [
        { label: "View All", href: "/category" },
        { label: "Add New", href: "/category/add" }
      ],
      category: "modules" 
    },
    // { 
    //   icon: <Calendar className="w-5 h-5" />, 
    //   label: "Sub Category", 
    //   href: "/subcategories", 
    //   hasSubmenu: true,
    //   submenuItems: [
    //     { label: "View All", href: "/subcategories" },
    //     { label: "Add New", href: "/subcategories/add" }
    //   ],
    //   category: "modules" 
    // },
    // { 
    //   icon: <FileText className="w-5 h-5" />, 
    //   label: "Fields", 
    //   href: "/fields", 
    //   category: "modules" 
    // },
    { 
      icon: <Plug className="w-5 h-5" />, 
      label: "Manage Clients", 
      href: "/demo/integrations", 
      category: "modules" 
    },
     { 
      icon: <Settings className="w-5 h-5" />, 
      label: "Leads", 
      href: "/demo/settings", 
      category: "system" 
    },
    { 
      icon: <HelpCircle className="w-5 h-5" />, 
      label: "Lead Clients Manage", 
      href: "/demo/help", 
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
