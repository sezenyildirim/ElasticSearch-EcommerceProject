import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
   onPageChange: (page: number) => void; 
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages,  onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6 select-none">
      {}
      <button
         onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className={`p-2 rounded-full border transition-colors duration-200 ${currentPage === 1 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white hover:bg-blue-50 text-blue-600 border-gray-200'}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      {}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)} 
          className={`px-3 py-1 rounded-full font-medium text-sm transition-colors duration-200 ${
            page === currentPage
              ? 'bg-blue-600 text-white shadow'
              : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
          }`}
        >
          {page}
        </button>
      ))}
      {}
      <button
         onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full border transition-colors duration-200 ${currentPage === totalPages ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white hover:bg-blue-50 text-blue-600 border-gray-200'}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

export default Pagination; 