import React, { useState } from 'react';
import { LayoutGrid, Beaker, Settings, X } from './icons';

interface OnboardingTourProps {
  onClose: () => void;
}

const steps = [
  {
    icon: LayoutGrid,
    title: 'Welcome to Your Dashboard',
    description: 'This is your daily command center. After each simulation, your Wellness Score and Macro Tracker will update here automatically.',
  },
  {
    icon: Beaker,
    title: 'The Meal Simulator',
    description: 'This is where the magic happens! Build a meal, and our AI will predict its impact on your energy, focus, and mood.',
  },
  {
    icon: Settings,
    title: 'Customize Your Experience',
    description: 'Head to the settings to update your Body Blueprint, connect health data, and choose from stunning themes to personalize the app.',
  },
];

const OnboardingTour: React.FC<OnboardingTourProps> = ({ onClose }) => {
  const [stepIndex, setStepIndex] = useState(0);

  const isLastStep = stepIndex === steps.length - 1;
  const currentStep = steps[stepIndex];
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
    } else {
      setStepIndex(prev => prev + 1);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-fade-in"
    >
      <div 
        className="bg-surface rounded-2xl shadow-2xl shadow-slate-300/60 border border-border-color w-full max-w-md relative p-8 text-center"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-background">
          <X className="w-5 h-5 text-text-muted" />
        </button>

        <div className="w-20 h-20 bg-accent/50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-emerald-200">
            <Icon className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-2xl font-bold text-secondary mb-2">{currentStep.title}</h1>
        <p className="text-text-secondary mb-6 min-h-[72px]">
          {currentStep.description}
        </p>
        
        <div className="flex justify-center gap-2 my-4">
            {steps.map((_, index) => (
                <div key={index} className={`w-2 h-2 rounded-full transition-colors ${index === stepIndex ? 'bg-primary' : 'bg-border-color'}`} />
            ))}
        </div>

        <button 
            onClick={handleNext}
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50"
        >
            {isLastStep ? "Let's Get Started!" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default OnboardingTour;
