import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "../ui/input";

interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const [itemsInput, setItemsInput] = useState(itemsPerPage.toString());

  const handleItemsPerPageChange = () => {
    const value = parseInt(itemsInput, 10);
    if (!isNaN(value) && value > 0) {
      onItemsPerPageChange(value);
    }
  };

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 5; // Adjust the number of visible pages here
    const startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <div className=" relative h-[3.5rem] flex items-center ">
      <Pagination>
        <PaginationContent className=" border rounded-full   ">
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              className=" rounded-l-full mr-[1rem] hover:bg-gray-200 "
            />
          </PaginationItem>

          {/* Page Numbers */}
          {getVisiblePages().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
                className={` ${
                  page === currentPage ? " bg-primary/20  text-primary" : ""
                } hover:bg-primary/20 hover:text-primary duration-300 rounded-full `}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Ellipsis for Skipped Pages */}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <PaginationItem>
              <span>...</span>
            </PaginationItem>
          )}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                onPageChange(Math.min(currentPage + 1, totalPages))
              }
              className=" rounded-r-full ml-[1rem] hover:bg-gray-200 "
            />
          </PaginationItem>
        </PaginationContent>

        {/* Items Per Page Input */}
        <div className="flex absolute right-0 items-center ">
          <span className="mr-2 font-openSans text-gray-800 text-[.9rem] ">
            Items per page:
          </span>
          <Input
            type="number"
            value={itemsInput}
            onChange={(e) => setItemsInput(e.target.value)}
            onBlur={handleItemsPerPageChange}
            className="border rounded px-2 py-1 w-16"
          />
        </div>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
