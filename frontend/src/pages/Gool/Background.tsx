import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Images } from '@/shared/assets/images';
import { LayoutProps } from '@/shared/interface/templatesType';
import { auth, db } from '@/shared/utils/firebase';

export default function Background({ children }: LayoutProps) {
  const [width, setWidth] = useState(0);
  const [nickname, setNickname] = useState<string>('');

  useEffect(() => {
    const getNickname = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setNickname(userSnap.data().nickname || '갓생뚠뚠');
        }
      }
    };

    getNickname();

    const aspectRatio = 640 / 1283;

    const calculateWidth = () => {
      const parentHeight = window.innerHeight - 54;
      setWidth(parentHeight * aspectRatio);
    };

    calculateWidth();

    window.addEventListener('resize', calculateWidth);

    return () => {
      window.removeEventListener('resize', calculateWidth);
    };
  }, []);

  return (
    <div className="relative h-[calc(100vh-54px)] flex-center">
      <div
        className="absolute top-0 horizontal-center w-[16.5625rem] h-[6rem] z-30 flex-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Images.뚠뚠굴_팻말})`,
          backgroundSize: 'contain',
        }}
      >
        <p className="wood-sign">{nickname}굴</p>
      </div>

      <div
        className="bg-image bg-cover"
        style={{
          backgroundImage: `url(${Images.뚠뚠굴_배경})`,
          backgroundSize: 'auto 100%',
        }}
      ></div>

      <div
        className="bg-image bg-cover"
        style={{
          backgroundImage: `url(${Images.뚠뚠굴})`,
          backgroundSize: 'contain',
        }}
      ></div>

      <div
        className="relative h-full"
        style={{
          width: `${width}px`,
        }}
      >
        <div
          className="bg-image z-10"
          style={{
            backgroundImage: `url(${Images.뚠뚠굴_빈굴})`,
            backgroundSize: 'contain',
          }}
        ></div>

        {children}
      </div>
    </div>
  );
}
