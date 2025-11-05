import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
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
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const activeIndex = navItems.findIndex(item => item.id === activeView);
    const activeItem = itemRefs.current[activeIndex];
    
    if (activeItem && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        setIndicatorStyle({
            width: itemRect.width,
            height: itemRect.height,
            transform: `translateX(${itemRect.left - navRect.left}px)`
        });
    }
  }, [activeView]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-lg z-50">
        <div ref={navRef} className="relative bg-surface/80 backdrop-blur-xl rounded-full shadow-2xl shadow-primary/10 border border-border-color p-2">
            <div 
              className="absolute top-2 h-16 bg-primary rounded-full shadow-lg shadow-primary/40 transition-all duration-500 ease-in-out"
              style={indicatorStyle}
            ></div>
            <div className="flex justify-around items-center">
                {navItems.map((item, index) => {
                    const isActive = activeView === item.id;
                    return (
                        <button
                            key={item.id}
                            ref={el => itemRefs.current[index] = el}
                            onClick={() => setActiveView(item.id)}
                            className={`group flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-full transition-colors duration-300 transform relative focus:outline-none ${isActive ? 'text-white' : 'text-text-secondary hover:text-primary'}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
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