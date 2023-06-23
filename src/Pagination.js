import React from 'react'

export default function Pagination({filteredData, handlePageChange, itemsPerPage, currentPage}) {
  return (
    <div>
      {filteredData.length > itemsPerPage && (
        <div>
          {Array(Math.ceil(filteredData.length / itemsPerPage))
            .fill()
            .map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
