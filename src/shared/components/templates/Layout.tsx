import { useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import NavBar from '@/shared/components/organisms/NavBar';
import { LayoutProps } from '@/shared/interface/templatesType';

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const excludeNavBarPaths = ['/ddoon-ddoon-gool', '/challenge', '/ddoon-ddoon-trip'];

  const shouldHideNavBar = excludeNavBarPaths.includes(location.pathname);

  return (
    <div className="flex-center min-h-screen bg-gray-200">
      <div
        className={`relative ${isMobile && location.pathname === '/' ? `w-[100vw] p-4` : 'w-[40rem]'} h-screen bg-white box-border`}
      >
        {children}
        {shouldHideNavBar && <NavBar />}
      </div>
    </div>
  );
}

export default Layout;
