import ChellengeAddBtn from '@/shared/components/atoms/ChellengeAddBtn';
import ChallengeBox from '@/shared/components/organisms/ChallengeBox';

const dummy = [
  { title: '매일매일 코드치기', memo: '취업하장', day: 30 },
  { title: '매일 하루 30분 걷기', memo: '다이어트', day: 100 },
  { title: '퇴근하고 자지않기', memo: '생체리듬 돌리쟈 :)', day: 50 },
];

function Challenge() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg font-bold my-7">뚠뚠 챌린지</h1>
      <section className="flex flex-col gap-3 mb-1">
        <p className="text-right text-base">{dummy.length + 1} / 10</p>
        {dummy.map((v) => {
          return <ChallengeBox title={v.title} memo={v.memo} day={v.day} />;
        })}
      </section>
      <ChellengeAddBtn />
    </div>
  );
}

export default Challenge;
