
import React from 'react';
import { LeaderboardUser } from '../types';
import { X, Trophy, Zap, ArrowUp, ArrowDown } from './icons';

interface CommunityProfileModalProps {
  user: LeaderboardUser;
  onClose: () => void;
}

const CommunityProfileModal: React.FC<CommunityProfileModalProps> = ({ user, onClose }) => {
    const isYou = user.name === "You";
    
    const TrendIcon = () => {
        if (user.trend === 'up') return <ArrowUp className="w-4 h-4 text-green-500" />;
        if (user.trend === 'down') return <ArrowDown className="w-4 h-4 text-red-500" />;
        return <span className="w-4 h-4 text-gray-400 font-bold">-</span>;
    };

  return (
    <div 
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-surface rounded-2xl shadow-2xl shadow-slate-300/60 border border-border-color w-full max-w-md relative p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-background">
          <X className="w-5 h-5 text-text-muted" />
        </button>

        <div className={`relative w-24 h-24 rounded-full flex items-center justify-center font-bold text-white text-4xl ${isYou ? 'bg-primary' : 'bg-slate-400'} mx-auto mb-4 border-4 border-surface shadow-lg`}>
            {user.avatar}
        </div>

        <h1 className="text-3xl font-bold text-secondary mb-1">{user.name}</h1>
        <p className="text-text-secondary">Weekly Wellness Score: <span className="font-bold text-primary">{user.score} pts</span></p>

        <div className="my-6 grid grid-cols-3 divide-x divide-border-color bg-background p-4 rounded-lg">
            <StatItem label="Rank" value={`#${user.rank}`} icon={Trophy} />
            <StatItem label="Trend" value={<TrendIcon />} icon={null} />
            <StatItem label="Last Meal" value={user.lastMealScore} icon={Zap} />
        </div>
        
        <p className="text-sm text-text-muted">Member since January 2024</p>
        
        <button
            onClick={() => alert(`Adding ${user.name} as a friend!`)}
            disabled={isYou}
            className="mt-6 w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
           {isYou ? "This is you!" : "Add Friend"}
        </button>
      </div>
    </div>
  );
};

const StatItem = ({ label, value, icon: Icon }: { label: string, value: React.ReactNode, icon: React.FC<{className?:string}> | null }) => (
    <div className="flex flex-col items-center justify-center">
        <p className="text-xs text-text-secondary">{label}</p>
        <div className="text-2xl font-bold text-text-primary mt-1 flex items-center gap-1">
           {Icon && <Icon className="w-5 h-5 text-primary"/>}
           <span>{value}</span>
        </div>
    </div>
);


export default CommunityProfileModal;
