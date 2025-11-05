
import React from 'react';
import { Achievement } from '../types';
import { X, Share2 } from './icons';

interface AchievementDetailModalProps {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementDetailModal: React.FC<AchievementDetailModalProps> = ({ achievement, onClose }) => {
    const { icon: Icon, title, description, progress, goal, reward } = achievement;
    const isCompleted = progress >= goal;
    const progressPercent = Math.min((progress / goal) * 100, 100);

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
        
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 ${isCompleted ? 'bg-primary text-white border-emerald-200' : 'bg-accent/50 text-primary border-emerald-200'}`}>
            <Icon className="w-10 h-10" />
        </div>
        
        <h1 className="text-2xl font-bold text-secondary mb-1">{title}</h1>
        <p className="text-text-secondary mb-4">{description}</p>
        
        <div className="my-6">
            <div className="flex justify-between items-baseline text-sm mb-1">
                <span className="font-medium text-text-secondary">Progress</span>
                <span className="font-bold text-primary">{progress} / {goal}</span>
            </div>
            <div className="w-full h-2.5 bg-background rounded-full">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progressPercent}%`}}></div>
            </div>
        </div>

        <div className="bg-background p-4 rounded-lg text-left">
            <h3 className="font-bold text-secondary mb-1">Reward</h3>
            <p className="text-text-secondary text-sm">{reward}</p>
        </div>

        <button
            // In a real app, this would trigger a share sheet
            onClick={() => alert('Sharing to social media!')}
            disabled={!isCompleted}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Share2 className="w-5 h-5"/>
            Share Achievement
        </button>

      </div>
    </div>
    );
};

export default AchievementDetailModal;
