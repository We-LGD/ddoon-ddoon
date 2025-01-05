import { create } from 'zustand';
import { SelectDayProps } from './storeType';

const useSelectDayStore = create<SelectDayProps>((set) => ({
  select: null,
  setSelect: (day) => {
    set(() => ({
      select: day
    }));
  }
}));

export default useSelectDayStore;
