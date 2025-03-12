import useSelectDayStore from '@/shared/store/useSelectDayStore';

export default function SelectDay() {
  const { select, setSelect } = useSelectDayStore();

  const handleSelectDay = (v: string) => {
    setSelect(Number(v.slice(0, -1)));
  };

  return (
    <div className="w-full flex justify-between items-center">
      {['30일', '50일', '100일'].map((v, i) => {
        return (
          <button
            key={i}
            type="button"
            onClick={() => handleSelectDay(v)}
            className={`w-full max-w-[5.75rem] h-[3.125rem] rounded-[0.25rem] ${
              select === Number(v.slice(0, -1)) ? 'bg-black text-white' : 'text-input bg-white border border-input'
            }`}
          >
            {v}
          </button>
        );
      })}
    </div>
  );
}
