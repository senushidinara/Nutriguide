import React, { useState, useEffect } from 'react';

const loadingTexts = [
    "Analyzing macronutrient synergy...",
    "Simulating digestive absorption rates...",
    "Mapping cognitive energy pathways...",
    "Calculating circadian rhythm impact...",
    "Cross-referencing your body blueprint...",
    "Predicting metabolic ripple effects...",
    "Calibrating Aura resonance...",
];

const LoadingSimulation: React.FC = () => {
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex(prevIndex => (prevIndex + 1) % loadingTexts.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-brand-surface/60 backdrop-blur-xl border border-brand-primary/20 rounded-2xl p-8 text-center animate-fade-in">
            <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-brand-primary/10 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full border-2 border-brand-primary/30"></div>
                <div className="absolute inset-4 rounded-full bg-brand-bg"></div>
                <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-brand-accent to-transparent animate-spin" style={{animationDuration: '3s'}}></div>
                <svg viewBox="0 0 100 100" className="w-24 h-24 text-brand-accent">
                    <path d="M 50,5 A 45,45 0 1 1 5,50" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-brand-secondary">Analyzing Aura...</h2>
            <div className="h-6 mt-4">
                 <p key={textIndex} className="text-brand-text-muted animate-fade-in">
                    {loadingTexts[textIndex]}
                </p>
            </div>
        </div>
    );
};

export default LoadingSimulation;