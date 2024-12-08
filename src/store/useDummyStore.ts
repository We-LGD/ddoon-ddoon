import { create } from 'zustand';
import { DummyProps } from '@/shared/interface/atomsType';

//TODO - 서버 연결 시 삭제하기
const useDummyStore = create<DummyProps>((set) => ({
  dummy: [
    { title: '매일매일 코드치기', memo: '취업하장!!', day: 30 },
    { title: '매일 하루 30분 걷기', memo: '다이어트', day: 100 },
    { title: '퇴근하고 자지않기', memo: '생체리듬 돌리쟈 :)', day: 50 },
  ],
  setDummy: (challenge) => {
    set((state) => ({
      dummy: [...state.dummy, challenge]
    }));
  },
  deleteDummy: (index) => {
    set((state) => ({
      dummy: state.dummy.filter((_, i) => i !== index)
    }));
  }
}));

export default useDummyStore;
