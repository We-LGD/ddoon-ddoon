import { create } from 'zustand';
import { SelectDayProps } from '@/shared/store/storeType';

const useSelectDayStore = create<SelectDayProps>((set) => ({
  select: null,
  setSelect: (day) => {
    set(() => ({
      select: day,
    }));
  },
}));

export default useSelectDayStore;
