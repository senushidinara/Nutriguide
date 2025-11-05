import React from 'react';
import { AppView } from '../types';
import { LayoutGrid, Beaker, Dna, Users, Settings } from './icons';

interface MainNavigationProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'simulator', label: 'Simulator', icon: Beaker },
  { id: 'genetics', label: 'Genetics', icon: Dna },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const;


const MainNavigation: React.FC<MainNavigationProps> = ({ activeView, setActiveView }) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-lg z-50">
        <div className="relative bg-surface/80 backdrop-blur-xl rounded-full shadow-2xl shadow-slate-300/60 border border-border-color p-2">
            <div className="flex justify-around items-center">
                {navItems.map((item) => {
                    const isActive = activeView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
                            className={`group flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-full transition-all duration-300 transform relative ${isActive ? 'text-white' : 'text-text-secondary hover:text-primary'}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {isActive && <div className="absolute inset-0 rounded-full bg-primary shadow-lg shadow-primary/40 animate-fade-in"></div>}
                            <item.icon className="w-6 h-6 z-10 transition-transform duration-200 group-hover:scale-110" />
                            <span className="text-xs font-bold z-10">{item.label}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    </div>
  );
};

export default MainNavigation;