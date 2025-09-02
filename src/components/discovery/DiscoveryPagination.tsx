
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

interface DiscoveryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DiscoveryPagination: React.FC<DiscoveryPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 0) {
    return null;
  }

  return (
    <div className="mt-6 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
            // Calculate page numbers to show
            let pageNum;
            if (totalPages <= 5) {
              // Show all pages if 5 or fewer
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              // Show first 5 pages
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              // Show last 5 pages
              pageNum = totalPages - 4 + i;
            } else {
              // Show current page and 2 on each side
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <PaginationItem key={i}>
                <PaginationLink 
                  onClick={() => onPageChange(pageNum)}
                  isActive={currentPage === pageNum}
                  className="cursor-pointer"
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DiscoveryPagination;
