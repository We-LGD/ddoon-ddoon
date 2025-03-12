import { create } from 'zustand';
import axios from 'axios';
import { ChallengeState } from '@shared/interface/storeType';

const useChallengeStore = create<ChallengeState>((set) => ({
  challengeList: [],
  getChallengeList: async (token) => {
    if (!token) return;

    try {
      const response = await axios.get('http://localhost:3000/challenge', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ challengeList: response.data });
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  },
}));

export default useChallengeStore;
