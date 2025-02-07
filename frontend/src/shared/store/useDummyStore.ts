import { create } from 'zustand';
import { DummyProps } from '@/pages/interface';

//TODO - 서버 연결 시 삭제하기
const useDummyStore = create<DummyProps>((set) => ({
  dummy: [
    { idx: 1, title: '매일매일 코드치기', memo: '취업하장!!', day: 30, result: 'progress', successCheck: false },
    { idx: 2, title: '매일 하루 30분 걷기', memo: '다이어트', day: 100, result: 'progress', successCheck: false },
    { idx: 3, title: '하루 두끼만 먹기', memo: '먹는 양 줄이자', day: 100, result: 'success', successCheck: false },
    { idx: 4, title: '퇴근하고 자지않기', memo: '생체리듬 돌리쟈 :)', day: 50, result: 'fail', successCheck: false },
  ],
  setDummy: (challenge) => {
    set((state) => ({
      dummy: [
        ...state.dummy,
        {
          ...challenge,
          result: 'progress',
          successCheck: false,
        },
      ],
    }));
  },
  deleteDummy: (index) => {
    set((state) => ({
      dummy: state.dummy.filter((v) => v.idx !== index),
    }));
  },
  updateDummy: (index: number, result?: 'progress' | 'success' | 'fail', successCheck?: boolean) => {
    set((state) => ({
      dummy: state.dummy.map((v, i) =>
        i === index ? { ...v, result: result ?? v.result, successCheck: successCheck ?? v.successCheck } : v,
      ),
    }));
  },
}));

export default useDummyStore;
