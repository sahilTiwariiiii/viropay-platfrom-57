
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProcurementPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  currentItems: number;
  onPageChange: (page: number) => void;
}

const ProcurementPagination: React.FC<ProcurementPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  currentItems,
  onPageChange
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Showing {currentItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
      </div>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
            let pageNum = i + 1;
            if (totalPages > 5 && currentPage > 3) {
              pageNum = currentPage - 3 + i;
              if (pageNum > totalPages) pageNum = totalPages - (4 - i);
            }
            
            if (pageNum <= 0 || pageNum > totalPages) return null;
            
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink 
                  isActive={currentPage === pageNum}
                  onClick={() => onPageChange(pageNum)}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProcurementPagination;
