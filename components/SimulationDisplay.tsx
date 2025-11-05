import React from 'react';
import { SimulationResult } from '../types';
import EnergyChart from './EnergyChart';
import BodyMap from './BodyMap';
import AiInsights from './AiInsights';
import AnimatedScore from './AnimatedScore';
import { ChatIcon, SaveIcon, AlertTriangle } from './icons';

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
    metabolic_forecast_weekly,
    energy_crash_prediction,
  } = result;

  const scoreColor = energy_optimization_score > 75 ? 'text-primary' : energy_optimization_score > 50 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="relative space-y-8 animate-fade-in">

      <div className="absolute top-0 right-0 z-10 flex items-center gap-2">
         <button
            onClick={onSaveMeal}
            className="flex items-center gap-2 bg-surface/80 backdrop-blur-sm hover:bg-background text-text-primary font-bold py-2 px-4 rounded-full transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50 border border-border-color"
            aria-label="Save meal"
          >
            <SaveIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Save Meal</span>
          </button>
        <button
          onClick={onOpenChat}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-full transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50"
          aria-label="Chat about results"
        >
          <ChatIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Chat with AI</span>
        </button>
      </div>


       <div className="relative overflow-hidden bg-surface rounded-2xl p-6 border border-border-color shadow-lg shadow-slate-200/50">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-secondary mb-4">Simulation Overview</h2>
          <div className="flex flex-col items-center md:flex-row md:items-center justify-center md:justify-start gap-6 bg-background p-6 rounded-xl border border-border-color">
             <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="10" className="text-slate-200" fill="transparent" />
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
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                  </defs>
                </svg>
                <div className={`absolute text-4xl font-extrabold ${scoreColor}`}>
                  <AnimatedScore value={energy_optimization_score} />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-secondary">Wellness Score</h3>
                  <p className="text-text-secondary mt-1">This score reflects how well your meal aligns with your body blueprint and goals.</p>
              </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        <div className="xl:col-span-3 bg-surface rounded-2xl p-6 border border-border-color shadow-lg shadow-slate-200/50">
          <EnergyChart data={simulation_timeline} />
        </div>
        <div className="xl:col-span-2 bg-surface rounded-2xl p-6 border border-border-color shadow-lg shadow-slate-200/50">
          <BodyMap data={energy_distribution} />
        </div>
      </div>
       {energy_crash_prediction && (
        <div className="relative bg-yellow-50 rounded-2xl p-6 border border-yellow-300 shadow-lg shadow-yellow-100">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-yellow-500"/>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-yellow-800">Energy Crash Prediction: {energy_crash_prediction.time_of_dip}</h3>
                    <p className="text-yellow-700 mt-1">{energy_crash_prediction.reason}</p>
                    <div className="mt-3 pt-3 border-t border-yellow-200">
                        <p className="text-sm text-yellow-900"><span className="font-semibold">Mitigation Tip:</span> {energy_crash_prediction.suggestion}</p>
                    </div>
                </div>
            </div>
        </div>
      )}
      <div>
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
