
import { useState, useMemo, useEffect } from 'react';
import { discoveryData } from '@/features/procurement/data/discoveryData';
import { Discovery } from '@/features/procurement/types';
import { toast } from '@/hooks/use-toast';

export const useDiscoveryState = () => {
  const [activeTab, setActiveTab] = useState<'awaiting' | 'ignored'>('awaiting');
  const [currentPage, setCurrentPage] = useState(1);
  const [ignoredApps, setIgnoredApps] = useState<string[]>([]);
  const [selectedApp, setSelectedApp] = useState<Discovery | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const itemsPerPage = 15;
  
  // Filter data based on active tab
  const filteredData = useMemo(() => {
    return discoveryData.filter(app => 
      activeTab === 'awaiting' 
        ? !ignoredApps.includes(app.id)
        : ignoredApps.includes(app.id)
    );
  }, [activeTab, ignoredApps]);
  
  const totalDiscoveries = filteredData.length;
  const awaitingCount = discoveryData.length - ignoredApps.length;
  const ignoredCount = ignoredApps.length;
  
  // Count sources
  const sourceStats = useMemo(() => {
    const counts = {
      'Google Workspace': 0,
      'Microsoft': 0,
      'Chrome Extension': 0
    };
    
    discoveryData.forEach(app => {
      app.sourceIcons.forEach(source => {
        if (counts[source as keyof typeof counts] !== undefined) {
          counts[source as keyof typeof counts]++;
        }
      });
    });
    
    return counts;
  }, []);
  
  const currentDiscoveries = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [currentPage, filteredData, itemsPerPage]);
  
  const totalPages = Math.ceil(totalDiscoveries / itemsPerPage);
  
  const handleApprove = (id: string, name: string) => {
    toast({
      title: "Application approved",
      description: `${name} has been approved.`,
    });
  };
  
  const handleIgnore = (id: string, name: string) => {
    if (!ignoredApps.includes(id)) {
      setIgnoredApps(prev => [...prev, id]);
      toast({
        title: "Application ignored",
        description: `${name} has been added to ignored list.`,
      });
    }
  };
  
  const handleRestore = (id: string, name: string) => {
    setIgnoredApps(prev => prev.filter(appId => appId !== id));
    toast({
      title: "Application restored",
      description: `${name} has been moved back to awaiting approval.`,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewUsers = (discovery: Discovery) => {
    setSelectedApp(discovery);
    setIsUserDialogOpen(true);
  };

  const handleCloseUserDialog = () => {
    setIsUserDialogOpen(false);
  };

  // Reset to page 1 when switching tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  return {
    activeTab,
    setActiveTab,
    currentPage,
    ignoredApps,
    selectedApp,
    isUserDialogOpen,
    totalDiscoveries: discoveryData.length,
    sourceStats,
    awaitingCount,
    ignoredCount,
    currentDiscoveries,
    totalPages,
    handleApprove,
    handleIgnore,
    handleRestore,
    handlePageChange,
    handleViewUsers,
    handleCloseUserDialog
  };
};
