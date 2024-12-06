import { SlideProps } from '@/shared/interface/atomsType';

function Slide({ page }: SlideProps) {
  const totalPages = 7;

  return (
    <div className="absolute bottom-0 left-0 w-full mb-4 flex justify-center items-center gap-6 p-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`w-[1rem] h-[1rem] rounded-full ${page === index + 1 ? 'bg-main' : 'bg-gray-200'} hover:bg-main`}
        />
      ))}
    </div>
  );
}

export default Slide;
