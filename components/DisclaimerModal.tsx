import React from 'react';
import { AlertTriangle } from './icons';

interface DisclaimerModalProps {
  onClose: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
    >
      <div 
        className="bg-surface rounded-2xl shadow-2xl shadow-slate-300/60 border border-border-color w-full max-w-lg relative p-8 text-center"
      >
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-amber-200">
            <AlertTriangle className="w-8 h-8 text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold text-secondary mb-2">Important Disclaimer</h1>
        <p className="text-text-secondary mb-6">
          NutriGuide AI provides personalized nutritional insights and predictions for informational purposes only. The guidance offered is not a substitute for professional medical advice, diagnosis, or treatment.
        </p>
         <p className="text-text-secondary mb-6">
            Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>

        <button 
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50"
        >
            I Understand and Agree
        </button>
      </div>
    </div>
  );
};

export default DisclaimerModal;
