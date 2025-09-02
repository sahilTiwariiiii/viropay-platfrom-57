
import React, { createContext, useContext, useState } from 'react';
import { Application } from '../types';

interface ApplicationsContextType {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  activeTab: 'active' | 'archived';
  setActiveTab: React.Dispatch<React.SetStateAction<'active' | 'archived'>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  handleOwnerChange: (appId: string, owner: string) => void;
  handleStatusChange: (appId: string, status: 'active' | 'archived') => void;
  handleNextPaymentChange: (appId: string, date: Date) => void;
  handlePageChange: (page: number) => void;
}

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

interface ApplicationsProviderProps {
  children: React.ReactNode;
  initialApplications: Application[];
}

export const ApplicationsProvider: React.FC<ApplicationsProviderProps> = ({ 
  children, 
  initialApplications 
}) => {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleOwnerChange = (appId: string, owner: string) => {
    setApplications(apps => 
      apps.map(app => {
        if (app.id === appId) {
          return {
            ...app,
            owner,
            ownerInitials: owner.split(' ').map(part => part[0]).join(''),
            ownerStatus: 'assigned' as const
          };
        }
        return app;
      })
    );
  };
  
  const handleStatusChange = (appId: string, status: 'active' | 'archived') => {
    setApplications(apps => 
      apps.map(app => {
        if (app.id === appId) {
          return {
            ...app,
            status
          };
        }
        return app;
      })
    );
  };
  
  const handleNextPaymentChange = (appId: string, date: Date) => {
    setApplications(apps => 
      apps.map(app => {
        if (app.id === appId) {
          return {
            ...app,
            nextPayment: date.toLocaleDateString()
          };
        }
        return app;
      })
    );
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const value = {
    applications,
    setApplications,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    handleOwnerChange,
    handleStatusChange,
    handleNextPaymentChange,
    handlePageChange,
  };

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplications = (): ApplicationsContextType => {
  const context = useContext(ApplicationsContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return context;
};
