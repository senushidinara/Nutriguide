import React from 'react';
import { SavedMeal } from '../types';
import { HistoryIcon, Zap, X } from './icons';

interface MealHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  savedMeals: SavedMeal[];
  onLoadMeal: (meal: SavedMeal) => void;
}

const MealHistory: React.FC<MealHistoryProps> = ({ isOpen, onClose, savedMeals, onLoadMeal }) => {
  return (
    <>
      <div className={`fixed inset-0 bg-brand-bg/50 backdrop-blur-sm z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
      <div className={`fixed inset-y-0 right-0 w-full max-w-sm bg-brand-surface/90 backdrop-blur-xl border-l border-brand-primary/20 shadow-2xl shadow-brand-primary/30 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-brand-primary/10">
                <div className="flex items-center gap-3">
                    <HistoryIcon className="w-6 h-6 text-brand-secondary" />
                    <h2 className="text-xl font-bold text-brand-secondary">Meal History</h2>
                </div>
                 <button onClick={onClose} className="p-2 rounded-full hover:bg-brand-bg">
                    <X className="w-5 h-5 text-brand-text-muted" />
                </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
            {savedMeals.length === 0 ? (
                <p className="text-brand-text-muted text-center py-8">You haven't saved any meals yet.</p>
            ) : (
                <ul className="space-y-3">
                {savedMeals.map(meal => (
                    <li key={meal.id} className="flex items-center justify-between bg-brand-bg p-3 rounded-lg animate-fade-in">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="flex-shrink-0 flex items-center justify-center bg-brand-surface w-10 h-10 rounded-md">
                            {meal.foods[0] ? (
                                <img src={meal.foods[0].imageUrl} alt={meal.name} className="w-full h-full object-cover rounded-md" />
                            ) : (
                                <div className="w-full h-full bg-brand-primary/20 rounded-md"></div>
                            )}
                        </div>
                        <div>
                        <p className="font-medium text-brand-text truncate flex items-center gap-2">
                            {meal.foods[0] && <span className="text-base">{meal.foods[0].emoji}</span>}
                            <span>{meal.name}</span>
                        </p>
                        <p className="text-xs text-brand-text-muted">{meal.foods.length} items</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => onLoadMeal(meal)}
                        className="p-2 rounded-lg text-brand-text-muted hover:bg-brand-primary/20 hover:text-brand-primary transition-colors flex-shrink-0 ml-2"
                        aria-label={`Load meal: ${meal.name}`}
                    >
                        <Zap className="w-5 h-5" />
                    </button>
                    </li>
                ))}
                </ul>
            )}
            </div>
        </div>
      </div>
    </>
  );
};

export default MealHistory;
