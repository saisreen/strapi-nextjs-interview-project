import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        style={{
          padding: "0.5rem",
          marginRight: "0.5rem",
          backgroundColor: currentPage === 1 ? "#ccc" : "#0070f3",
          color: "#fff",
          border: "none",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        Previous
      </button>
      <span style={{ padding: "0.5rem" }}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        style={{
          padding: "0.5rem",
          marginLeft: "0.5rem",
          backgroundColor: currentPage === totalPages ? "#ccc" : "#0070f3",
          color: "#fff",
          border: "none",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
