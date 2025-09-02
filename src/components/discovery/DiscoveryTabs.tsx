
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface DiscoveryTabsProps {
  activeTab: 'awaiting' | 'ignored';
  onTabChange: (tab: 'awaiting' | 'ignored') => void;
  awaitingCount?: number;
  ignoredCount?: number;
}

const DiscoveryTabs: React.FC<DiscoveryTabsProps> = ({ 
  activeTab, 
  onTabChange,
  awaitingCount = 0,
  ignoredCount = 0
}) => {
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={(value) => onTabChange(value as 'awaiting' | 'ignored')}
      className="mb-6"
    >
      <TabsList className="w-full sm:w-auto">
        <TabsTrigger value="awaiting" className="flex gap-2 flex-1 sm:flex-initial">
          Awaiting Approval
          {awaitingCount > 0 && (
            <Badge variant="outline" className="ml-1">{awaitingCount}</Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="ignored" className="flex gap-2 flex-1 sm:flex-initial">
          Ignored
          {ignoredCount > 0 && (
            <Badge variant="outline" className="ml-1">{ignoredCount}</Badge>
          )}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default DiscoveryTabs;
