import { create } from 'zustand';
import { NewChallengeStore } from '@store/storeType';

const useNewChallengeStore = create<NewChallengeStore>((set) => ({
  newChallenge: { title: '', memo: '', day: 0 },
  setNewChallenge: (fields) => {
    set((state) => ({
      newChallenge: { ...state.newChallenge, ...fields }
    }));
  }
}));

export default useNewChallengeStore;
