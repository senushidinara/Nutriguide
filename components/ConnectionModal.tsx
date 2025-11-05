
import React, { useState, useEffect } from 'react';
import { X, Loader, CheckCircle, Dna, Beaker, Zap } from './icons';

interface ConnectionModalProps {
  type: 'genetics' | 'microbiome' | 'wearables';
  onClose: () => void;
  onSuccess: () => void;
}

const connectionDetails = {
  genetics: {
    title: 'Connect Genetic Data',
    icon: Dna,
    steps: ['Authenticating with 23&Me...', 'Syncing Genetic Markers...', 'Analyzing Metabolic SNPs...'],
  },
  microbiome: {
    title: 'Connect Microbiome Data',
    icon: Beaker,
    steps: ['Authenticating with Viome...', 'Importing Gut Flora Analysis...', 'Calibrating Digestive Models...'],
  },
  wearables: {
    title: 'Connect Wearable Data',
    icon: Zap,
    steps: ['Authenticating with Apple Health...', 'Syncing Activity & Sleep Data...', 'Integrating Real-time Metrics...'],
  },
};

const ConnectionModal: React.FC<ConnectionModalProps> = ({ type, onClose, onSuccess }) => {
  const [step, setStep] = useState(0);
  const details = connectionDetails[type];

  useEffect(() => {
    if (step < details.steps.length) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (step === details.steps.length) {
      const successTimer = setTimeout(() => {
        onSuccess();
      }, 1000);
      return () => clearTimeout(successTimer);
    }
  }, [step, details.steps.length, onSuccess]);

  const isComplete = step === details.steps.length;
  const Icon = details.icon;

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

        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 ${isComplete ? 'bg-green-100 border-green-200' : 'bg-accent/50 border-emerald-200'}`}>
           {isComplete ? <CheckCircle className="w-8 h-8 text-green-500"/> : <Icon className="w-8 h-8 text-primary" />}
        </div>
        
        <h1 className="text-2xl font-bold text-secondary mb-2">{isComplete ? "Connection Successful!" : details.title}</h1>
        <p className="text-text-secondary mb-8">
            {isComplete ? "Your data has been securely synced." : "Please follow the steps to link your account."}
        </p>
        
        <div className="space-y-3 text-left">
            {details.steps.map((stepText, index) => (
                <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                        {step > index ? (
                            <CheckCircle className="w-6 h-6 text-primary"/>
                        ) : step === index ? (
                            <Loader className="w-6 h-6 text-primary animate-spin"/>
                        ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-border-color bg-background"/>
                        )}
                    </div>
                    <span className={`transition-colors ${step >= index ? 'text-text-primary font-medium' : 'text-text-muted'}`}>
                        {stepText}
                    </span>
                </div>
            ))}
        </div>
        
        {isComplete && (
            <button
                onClick={onSuccess}
                className="mt-8 w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
                Done
            </button>
        )}
      </div>
    </div>
  );
};

export default ConnectionModal;
