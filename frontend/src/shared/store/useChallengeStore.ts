import axiosInstance from '@shared/utils/axios';
import { create } from 'zustand';
import { ChallengeState } from '@shared/interface/storeType';

const useChallengeStore = create<ChallengeState>((set) => ({
  challengeList: [],
  selectedChallengeIdx: null,
  getChallengeList: async () => {
    try {
      const response = await axiosInstance.get('http://localhost:3000/challenge');
      set({ challengeList: response.data });
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  },
  setSelectedChallengeIdx: (idx: number | null) => set({ selectedChallengeIdx: idx }),
}));

export default useChallengeStore;
