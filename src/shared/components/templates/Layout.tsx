import { useLocation } from 'react-router-dom';
import NavBar from '@/shared/components/organisms/NavBar';
import { LayoutProps } from '@/shared/interface/templatesType';

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const excludeNavBarPaths = ['/login', '/nickname-setup', '/tutorial'];

  const shouldHideNavBar = excludeNavBarPaths.includes(location.pathname);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="relative w-[40rem] h-screen bg-white p-4 pb-16 box-border">
        {children}
        {!shouldHideNavBar && <NavBar />}
      </div>
    </div>
  );
}

export default Layout;
