import { useState } from 'react';

function Slide() {
  const totalPages = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = ({ page }: { page: number }) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center items-center gap-6">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => goToPage({ page: index + 1 })}
          className={`w-[1rem] h-[1rem] rounded-full ${currentPage === index + 1 ? 'bg-main' : 'bg-gray-200'} hover:bg-main`}
        />
      ))}
    </div>
  );
}

export default Slide;
