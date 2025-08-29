import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "./Pagination.scss";

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

const Pagination = ({ page, pageSize, total, onPageChange, onPageSizeChange }: Props) => {
  const [showPageSizeDropdown, setShowPageSizeDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPageSizeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalPages = Math.ceil(total / pageSize);
  const pageSizeOptions = [10, 50, 100];
  
  if (totalPages <= 1 && total <= Math.min(...pageSizeOptions)) return null;

  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  const handlePageSizeChange = (newPageSize: number) => {
    onPageSizeChange(newPageSize);
    onPageChange(1);
    setShowPageSizeDropdown(false);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3);
        if (totalPages > 4) {
          pages.push('...');
          pages.push(totalPages);
        }
      } else if (page >= totalPages - 2) {
        pages.push(1);
        if (totalPages > 4) {
          pages.push('...');
        }
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      <div className="pagination__info">
        Showing{" "}
        <div className="pagination__page-size-selector" ref={dropdownRef}>
          <button
            className="pagination__page-size-button"
            onClick={() => setShowPageSizeDropdown(!showPageSizeDropdown)}
          >
            <span className="pagination__highlight">{pageSize}</span>
            <ChevronDown 
              size={14} 
              className={showPageSizeDropdown ? 'pagination__chevron--up' : ''}
            />
          </button>
          
          {showPageSizeDropdown && (
            <div className="pagination__page-size-dropdown">
              {pageSizeOptions.map((option) => (
                <button
                  key={option}
                  className={`pagination__page-size-option ${
                    option === pageSize ? 'pagination__page-size-option--active' : ''
                  }`}
                  onClick={() => handlePageSizeChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
        {" "}out of {total}
      </div>
      
      <div className="pagination__controls">
        <button
          className="pagination__nav"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft size={16} />
        </button>
        
        <div className="pagination__pages">
          {pageNumbers.map((pageNum, index) => (
            <span key={index}>
              {pageNum === '...' ? (
                <span className="pagination__ellipsis">...</span>
              ) : (
                <button
                  className={`pagination__page ${
                    pageNum === page ? 'pagination__page--active' : ''
                  }`}
                  onClick={() => onPageChange(pageNum as number)}
                >
                  {pageNum}
                </button>
              )}
            </span>
          ))}
        </div>
        
        <button
          className="pagination__nav"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;