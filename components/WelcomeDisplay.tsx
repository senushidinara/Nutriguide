import React from 'react';
import { UserProfile } from '../types';
import { AtomIcon } from './icons';

interface WelcomeDisplayProps {
    userProfile: UserProfile;
}

const WelcomeDisplay: React.FC<WelcomeDisplayProps> = ({ userProfile }) => {
    return (
        <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-brand-surface rounded-2xl p-8 border border-brand-primary/20 text-center animate-fade-in">
            <div className="relative w-24 h-24 mb-6">
                <AtomIcon className="w-24 h-24 text-brand-primary animate-pulse-fast" />
                <div className="absolute inset-0 bg-brand-primary/20 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-3xl font-bold text-brand-secondary">Ready to Predict Your Energy?</h2>
            <p className="text-brand-text-muted mt-2 max-w-md">
                Compose your meal from the food list, then press the "Simulate Meal" button to generate your personalized energy forecast.
            </p>
            <p className="text-sm text-brand-text-muted mt-6 bg-brand-bg px-4 py-2 rounded-full border border-brand-primary/20">
                Current Goal: <span className="font-semibold text-brand-secondary capitalize">{userProfile.goal.replace(/_/g, ' ')}</span>
            </p>
        </div>
    );
};

export default WelcomeDisplay;
