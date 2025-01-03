import { useLocation } from 'react-router-dom';
import NavBar from '@/shared/components/organisms/NavBar';
import { LayoutProps } from '@/shared/interface/templatesType';

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const excludeNavBarPaths = ['/', '/nickname-setup', '/tutorial'];

  const shouldHideNavBar = excludeNavBarPaths.includes(location.pathname);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="relative w-[40rem] min-h-screen bg-white box-border">
        {children}
        {!shouldHideNavBar && <NavBar />}
      </div>
    </div>
  );
}

export default Layout;
