import React from 'react';
import { EnergyDistribution } from '../types';
import { Brain, Dumbbell, GutIcon, Shield } from './icons';

interface BodyMapProps {
  data: EnergyDistribution;
}

const BodyMap: React.FC<BodyMapProps> = ({ data }) => {
  
  const StatItem = ({ icon: Icon, label, value }: { icon: React.ComponentType<{className?: string}>, label: string, value: number}) => (
    <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex-shrink-0 bg-brand-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-brand-accent"/>
        </div>
        <div>
            <span className="text-sm text-brand-text-muted">{label}</span>
            <p className="font-bold text-brand-text text-lg">{value}/100</p>
        </div>
        <div className="ml-auto w-1/4 h-2 bg-brand-primary/10 rounded-full">
            <div 
                className="h-2 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full transition-all duration-1000"
                style={{width: `${value}%`}}
            ></div>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-xl font-bold text-brand-secondary mb-4">Aura Distribution Map</h3>
      <div className="relative flex-grow flex items-center justify-center my-4">
        <svg viewBox="0 0 200 300" className="w-auto h-64">
          <defs>
            <filter id="aura-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.5 0" result="glow" />
              <feComposite in="glow" in2="SourceGraphic" operator="over" />
            </filter>
             <radialGradient id="brain-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#A69EFF" />
                <stop offset="100%" stopColor="#6A5AF9" />
            </radialGradient>
            <radialGradient id="muscle-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00F5D4" />
                <stop offset="100%" stopColor="#00b8a2" />
            </radialGradient>
            <radialGradient id="gut-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f5d400" />
                <stop offset="100%" stopColor="#f5a600" />
            </radialGradient>
          </defs>
          
          {/* Base Abstract Body Shape */}
          <path 
            d="M 100,50 C 70,50 60,70 60,100 L 60,200 C 60,250 70,290 100,290 C 130,290 140,250 140,200 L 140,100 C 140,70 130,50 100,50 Z" 
            fill="none" 
            stroke="#6A5AF9" 
            strokeOpacity="0.1" 
            strokeWidth="2"
          />
          <circle cx="100" cy="40" r="25" fill="none" stroke="#6A5AF9" strokeOpacity="0.1" strokeWidth="2" />

          {/* Glowing Aura Parts */}
          <g filter="url(#aura-glow)">
              <circle cx="100" cy="40" r="25" fill="url(#brain-gradient)" className="transition-opacity duration-1000" style={{ opacity: data.brain / 150 }} />
              <ellipse cx="75" cy="160" rx="15" ry="60" fill="url(#muscle-gradient)" className="transition-opacity duration-1000" style={{ opacity: data.muscles / 150 }}/>
              <ellipse cx="125" cy="160" rx="15" ry="60" fill="url(#muscle-gradient)" className="transition-opacity duration-1000" style={{ opacity: data.muscles / 150 }}/>
              <ellipse cx="100" cy="150" rx="25" ry="35" fill="url(#gut-gradient)" className="transition-opacity duration-1000" style={{ opacity: data.digestive_system / 150 }}/>
              <path 
                d="M 100,50 C 70,50 60,70 60,100 L 60,200 C 60,250 70,290 100,290 C 130,290 140,250 140,200 L 140,100 C 140,70 130,50 100,50 Z" 
                fill="#00F5D4" 
                fillOpacity="0.1"
                 className="transition-opacity duration-1000"
                 style={{ opacity: data.immune_system / 200 }}
              />
          </g>

        </svg>
      </div>
      <div className="space-y-4">
        <StatItem icon={Brain} label="Brain (Cognition)" value={data.brain} />
        <StatItem icon={Dumbbell} label="Muscles (Physical)" value={data.muscles} />
        <StatItem icon={GutIcon} label="Digestion" value={data.digestive_system} />
        <StatItem icon={Shield} label="Immune System" value={data.immune_system} />
      </div>
    </div>
  );
};

export default BodyMap;