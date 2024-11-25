import React from 'react';
import NavBar from '@/shared/components/organisms/NavBar';
import { LayoutProps } from '@/shared/interface/templatesType';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="relative w-[40rem] h-screen bg-white p-4 pb-16 box-border">
        {children}
        <NavBar />
      </div>
    </div>
  );
};

export default Layout;
