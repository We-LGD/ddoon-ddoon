import axiosInstance from '@shared/utils/axios';
import { create } from 'zustand';
import { ChallengeState } from '@shared/interface/storeType';

const useChallengeStore = create<ChallengeState>((set) => ({
  challengeList: [],
  getChallengeList: async () => {
    try {
      const response = await axiosInstance.get('/challenge');
      set({ challengeList: response.data });
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  },
}));

export default useChallengeStore;
