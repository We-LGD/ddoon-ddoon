import { useLocation } from 'react-router-dom';
import { TiFlowMerge, TiMap } from 'react-icons/ti';
import { PiMedalBold } from 'react-icons/pi';
import NavItem from '@/shared/components/atoms/NavItem';

function NavBar() {
  const location = useLocation();

  const navItemList = [
    { icon: <PiMedalBold />, label: '챌린지', path: '/challenge' },
    { icon: <TiFlowMerge />, label: '뚠뚠굴', path: '/ddoon-ddoon-gool' },
    { icon: <TiMap />, label: '뚠뚠여행', path: '/ddoon-ddoon-trip' },
  ];

  return (
    <nav className="z-10 fixed bottom-0 horizontal-center max-w-[40rem] w-full h-[3.375rem] bg-white border-t flex justify-around items-center">
      {navItemList.map((item) => (
        <NavItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          path={item.path}
          isSelected={location.pathname === item.path}
        />
      ))}
    </nav>
  );
}

export default NavBar;
