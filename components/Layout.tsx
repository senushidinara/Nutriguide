import React from 'react';
import MainNavigation from './MainNavigation';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  return (
    <div className="w-full max-w-7xl mx-auto pb-28">
      <div className="p-4 sm:p-6 lg:p-8">
        {children}
      </div>
      <MainNavigation activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
};

export default Layout;
