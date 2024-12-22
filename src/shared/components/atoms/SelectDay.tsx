import useNewChallengeStore from '@/store/useNewChallengeStore';
import useSelectDayStore from '@/store/useSelectDayStore';
import useToolTipStore from '@/store/useTooltipStore';

function SelectDay() {
  const { setNewChallenge } = useNewChallengeStore();
  const { select, setSelect } = useSelectDayStore();
  const { setToolTip } = useToolTipStore();

  const handleSelectDay = (v: string) => {
    setSelect(v);
    setToolTip(false);
    setNewChallenge({ day: Number(v.slice(0, -1)) });
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
              select === v ? 'bg-black text-white' : 'text-input bg-white border border-input'
            }`}
          >
            {v}
          </button>
        );
      })}
    </div>
  );
}

export default SelectDay;
