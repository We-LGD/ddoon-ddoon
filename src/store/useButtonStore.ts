import { create } from 'zustand';
import { ButtonStore } from '@store/storeType';


const useButtonStore = create<ButtonStore>((set) => ({
  click: false,
  setClick: () => set((state) => ({
    click: !state.click
  }))
}));

export default useButtonStore;
