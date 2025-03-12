import { create } from 'zustand';
import { MobileState } from '@/shared/interface/storeType';

export const useMobileStore = create<MobileState>((set) => ({
  isMobile: window.innerWidth < 768,
  setIsMobile: (value) => set({ isMobile: value }),
  checkMobile: () => {
    const isMobile = window.innerWidth < 768;
    set({ isMobile });
  },
}));
