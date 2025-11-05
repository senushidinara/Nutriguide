import React from 'react';
import { X } from './icons';

interface InfoModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const InfoModal: React.FC<InfoModalProps> = ({ title, onClose, children }) => {
  return (
    <div 
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-surface rounded-2xl shadow-2xl shadow-slate-300/60 border border-border-color w-full max-w-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-background z-10">
          <X className="w-5 h-5 text-text-muted" />
        </button>

        <div className="p-8">
            <h1 className="text-2xl font-bold text-center text-secondary mb-6">{title}</h1>
            <div className="max-h-[60vh] overflow-y-auto pr-2 text-left">
                {children}
            </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;