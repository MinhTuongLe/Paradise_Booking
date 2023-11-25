"use client";
import React from "react";
import Link from "next/link";
import { FcPrevious, FcNext } from "react-icons/fc";

const PaginationComponent = ({ page, total, limit }) => {
  const totalPages = Math.ceil(total / limit);

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(
        1,
        Math.min(
          page - Math.floor(maxPagesToShow / 2),
          totalPages - maxPagesToShow + 1
        )
      );
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="w-full flex justify-center items-center space-x-6 mt-6">
      {page > 1 && (
        <Link legacyBehavior href={`/?page=${page - 1}&limit=${limit}`}>
          {/* <a className="border px-4 py-2 rounded">Previous</a> */}
          <FcPrevious className="text-[24px]" />
        </Link>
      )}

      {getPageNumbers().map((pageNumber) => (
        <Link
          legacyBehavior
          key={pageNumber}
          href={`/?page=${pageNumber}&limit=${limit}`}
        >
          <a
            className={`border px-4 py-2 rounded ${
              page === pageNumber ? "bg-rose-500 text-white" : ""
            }`}
          >
            {pageNumber}
          </a>
        </Link>
      ))}

      {page < totalPages && (
        <Link legacyBehavior href={`/?page=${page + 1}&limit=${limit}`}>
          {/* <a className="border px-4 py-2 rounded">Next</a> */}
          <FcNext className="text-[24px]" />
        </Link>
      )}
    </div>
  );
};

export default PaginationComponent;
