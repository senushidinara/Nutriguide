import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, X } from './icons';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true); // Animate in
        const timer = setTimeout(() => {
             setIsVisible(false); // Animate out
             setTimeout(onClose, 300); // Remove from DOM after animation
        }, 2700);

        return () => clearTimeout(timer);
    }, [onClose]);


  const isSuccess = type === 'success';
  const Icon = isSuccess ? CheckCircle : AlertTriangle;
  const colors = isSuccess 
    ? { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: 'text-green-500' }
    : { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: 'text-red-500' };

  return (
    <div
        className={`w-full ${colors.bg} border ${colors.border} rounded-lg shadow-lg p-4 flex items-start gap-3 transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        role="alert"
    >
        <div className={`w-6 h-6 flex-shrink-0 ${colors.icon}`}>
            <Icon className="w-6 h-6" />
        </div>
        <p className={`flex-grow font-medium text-sm ${colors.text}`}>
            {message}
        </p>
        <button onClick={onClose} className="p-1 -m-1 rounded-full hover:bg-black/10">
            <X className="w-4 h-4" />
        </button>
    </div>
  );
};

export default Toast;
