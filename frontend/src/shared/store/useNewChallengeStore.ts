import { create } from 'zustand';
import { NewChallengeStore } from '@/shared/store/storeType';

const useNewChallengeStore = create<NewChallengeStore>((set) => ({
  newChallenge: {
    title: '',
    memo: '',
    day: 0,
    result: 'progress',
    successCheck: false,
  },
  setNewChallenge: (fields) => {
    set((state) => ({
      newChallenge: { ...state.newChallenge, ...fields },
    }));
  },
}));

export default useNewChallengeStore;
