import React, { useState } from 'react';
import { FoodItem, SavedMeal } from '../types';
import { X, Trash2, Zap, UserIcon, HistoryIcon } from './icons';
import MealHistory from './MealHistory';


interface MealBuilderProps {
  currentMeal: FoodItem[];
  removeFoodFromMeal: (foodId: string) => void;
  handleClearMeal: () => void;
  handleSimulate: () => void;
  onOpenProfile: () => void;
  savedMeals: SavedMeal[];
  onLoadMeal: (meal: SavedMeal) => void;
}

const MealBuilder: React.FC<MealBuilderProps> = ({ currentMeal, removeFoodFromMeal, handleClearMeal, handleSimulate, onOpenProfile, savedMeals, onLoadMeal }) => {
  const [isHistoryOpen, setHistoryOpen] = useState(false);

  const handleLoadAndClose = (meal: SavedMeal) => {
    onLoadMeal(meal);
    setHistoryOpen(false);
  }

  return (
    <div className="bg-brand-surface/60 backdrop-blur-xl border border-brand-primary/20 rounded-2xl shadow-2xl shadow-brand-primary/10 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-brand-primary/10 flex-shrink-0">
            <h2 className="text-xl font-bold text-brand-secondary">Analysis Bay</h2>
            <div className="flex items-center gap-2">
                <button
                onClick={() => setHistoryOpen(true)}
                className="p-2 rounded-full hover:bg-brand-bg transition-colors"
                aria-label="Open meal history"
                >
                <HistoryIcon className="w-6 h-6 text-brand-text-muted" />
                </button>
                <button
                onClick={onOpenProfile}
                className="p-2 rounded-full hover:bg-brand-bg transition-colors"
                aria-label="Edit user profile"
                >
                <UserIcon className="w-6 h-6 text-brand-text-muted" />
                </button>
            </div>
        </div>
        
        {/* Meal List */}
        <div className="flex-grow p-4 overflow-y-auto">
            {currentMeal.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-center text-brand-text-muted">
                    <p className="text-lg">Your Analysis Bay is empty.</p>
                    <p className="text-sm">Select items from the Nutrient Library to begin.</p>
                </div>
            ) : (
                <ul className="space-y-3">
                    {currentMeal.map(item => (
                        <li key={item.id} className="group flex items-center justify-between bg-brand-bg/50 p-3 rounded-lg animate-fade-in border border-transparent hover:border-brand-primary/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md flex-shrink-0"/>
                                <div>
                                    <p className="font-semibold text-brand-text">{item.name}</p>
                                    <p className="text-sm text-brand-text-muted">{item.quantity}{item.unit}</p>
                                </div>
                            </div>
                            <button onClick={() => removeFoodFromMeal(item.id)} className="p-2 rounded-full text-brand-text-muted hover:bg-red-500/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <X className="w-4 h-4" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-brand-primary/10 flex-shrink-0">
             {currentMeal.length > 0 && (
                <div className="flex items-center justify-end mb-4">
                    <button onClick={handleClearMeal} className="flex items-center gap-1 text-sm text-brand-text-muted hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4"/>
                        Clear All
                    </button>
                </div>
            )}
            <button
                onClick={handleSimulate}
                disabled={currentMeal.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3 px-4 rounded-lg transition-all transform focus:outline-none focus:ring-4 focus:ring-brand-primary/50 disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:bg-opacity-80 enabled:animate-pulse-subtle"
            >
                <Zap className="w-5 h-5"/>
                Analyze Aura
            </button>
        </div>
        <MealHistory
            isOpen={isHistoryOpen}
            onClose={() => setHistoryOpen(false)}
            savedMeals={savedMeals}
            onLoadMeal={handleLoadAndClose}
        />
    </div>
  );
};

export default MealBuilder;