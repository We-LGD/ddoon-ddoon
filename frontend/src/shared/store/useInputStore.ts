import { create } from 'zustand';
import { InputStore } from '@/shared/store/storeType';

const useInputStore = create<InputStore>((set) => ({
  inputs: {},
  setInput: (name, value) =>
    set((state) => ({
      inputs: { ...state.inputs, [name]: value },
    })),
  resetInputs: () => set({ inputs: {} }),
}));

export default useInputStore;
