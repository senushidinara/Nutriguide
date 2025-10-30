import React from 'react';
import { SimulationResult } from '../types';
import EnergyChart from './EnergyChart';
import BodyMap from './BodyMap';
import AiInsights from './AiInsights';
import AnimatedScore from './AnimatedScore';
import { ChatIcon, SaveIcon } from './icons';

interface SimulationDisplayProps {
  result: SimulationResult;
  onOpenChat: () => void;
  onSaveMeal: () => void;
}

const SimulationDisplay: React.FC<SimulationDisplayProps> = ({ result, onOpenChat, onSaveMeal }) => {
  const { 
    simulation_timeline, 
    energy_distribution, 
    energy_optimization_score, 
    insights,
    meal_alchemy_suggestion,
    metabolic_forecast_weekly
  } = result;

  const scoreColor = energy_optimization_score > 75 ? 'text-brand-accent' : energy_optimization_score > 50 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="relative space-y-8">

      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
         <button
            onClick={onSaveMeal}
            className="flex items-center gap-2 bg-brand-surface/80 backdrop-blur-sm hover:bg-brand-bg text-brand-text font-bold py-2 px-4 rounded-full transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-primary/50 border border-brand-primary/20"
            aria-label="Save meal"
          >
            <SaveIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Save Meal</span>
          </button>
        <button
          onClick={onOpenChat}
          className="flex items-center gap-2 bg-brand-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
          aria-label="Chat about results"
        >
          <ChatIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Chat with AI</span>
        </button>
      </div>


       <div className="relative overflow-hidden bg-brand-surface/70 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/20 animate-stagger opacity-0" style={{ animationFillMode: 'forwards' }}>
        <div className="absolute inset-0 bg-[linear-gradient(110deg,theme(colors.brand.bg),50%,theme(colors.brand.surface),55%,theme(colors.brand.bg))] bg-[length:200%_100%] animate-background-pan opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-brand-secondary mb-4">Simulation Overview</h2>
          <div className="flex items-center justify-center md:justify-start gap-6 bg-brand-bg/80 p-6 rounded-xl">
             <div className="relative flex items-center justify-center animate-glow">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="10" className="text-brand-primary/20" fill="transparent" />
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    stroke="url(#scoreGradient)"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 54}
                    strokeDashoffset={2 * Math.PI * 54 * (1 - energy_optimization_score / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                    style={{ transitionProperty: 'stroke-dashoffset' }}
                  />
                  <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#00F5D4" />
                          <stop offset="100%" stopColor="#6A5AF9" />
                      </linearGradient>
                  </defs>
                </svg>
                <div className={`absolute text-4xl font-extrabold ${scoreColor}`}>
                  <AnimatedScore value={energy_optimization_score} />
                </div>
              </div>
              <div className="flex-1">
                  <h3 className="text-xl font-bold text-brand-secondary">Energy Optimization Score</h3>
                  <p className="text-brand-text-muted mt-1">This score reflects how well your meal aligns with your body blueprint and goals.</p>
              </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        <div className="xl:col-span-3 bg-brand-surface/70 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/20 animate-stagger opacity-0" style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
          <EnergyChart data={simulation_timeline} />
        </div>
        <div className="xl:col-span-2 bg-brand-surface/70 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/20 animate-stagger opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
          <BodyMap data={energy_distribution} />
        </div>
      </div>
      <div className="animate-stagger opacity-0" style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}>
        <AiInsights
          insights={insights}
          suggestion={meal_alchemy_suggestion}
          forecast={metabolic_forecast_weekly}
        />
      </div>
    </div>
  );
};

export default SimulationDisplay;