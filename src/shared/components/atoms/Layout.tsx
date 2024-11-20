import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-[640px] h-screen bg-white" style={{ boxSizing: 'border-box' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
