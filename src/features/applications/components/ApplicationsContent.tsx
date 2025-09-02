
import React from 'react';
import { useApplications } from '../context/ApplicationsContext';
import ApplicationsTable from './ApplicationsTable';
import ApplicationsPagination from './ApplicationsPagination';

const ApplicationsContent: React.FC = () => {
  const { 
    applications, 
    activeTab, 
    searchQuery, 
    currentPage, 
    itemsPerPage,
    handleOwnerChange, 
    handleStatusChange, 
    handleNextPaymentChange,
    handlePageChange 
  } = useApplications();

  // Filter applications based on active tab and search query
  const filteredApplications = applications.filter(app => 
    app.status === activeTab && 
    (searchQuery === '' || app.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Get paginated data
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <ApplicationsTable 
        applications={paginatedApplications} 
        onOwnerChange={handleOwnerChange}
        onStatusChange={handleStatusChange}
        onNextPaymentChange={handleNextPaymentChange}
      />
      
      <ApplicationsPagination 
        currentPage={currentPage}
        totalPages={Math.ceil(filteredApplications.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ApplicationsContent;
