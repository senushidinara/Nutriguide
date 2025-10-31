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
        <div className="flex items-center justify-between p-6 border-b border-brand-primary/10 flex-shrink-0 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10">
            <div>
              <h2 className="text-2xl font-bold text-brand-secondary">⚡ Analysis Bay</h2>
              <p className="text-xs text-brand-text-muted mt-1">{currentMeal.length} item{currentMeal.length !== 1 ? 's' : ''} selected</p>
            </div>
            <div className="flex items-center gap-2">
                <button
                onClick={() => setHistoryOpen(true)}
                className="p-2 rounded-full hover:bg-brand-bg/60 transition-all duration-200 text-brand-text-muted hover:text-brand-accent"
                aria-label="Open meal history"
                >
                <HistoryIcon className="w-6 h-6" />
                </button>
                <button
                onClick={onOpenProfile}
                className="p-2 rounded-full hover:bg-brand-bg/60 transition-all duration-200 text-brand-text-muted hover:text-brand-accent"
                aria-label="Edit user profile"
                >
                <UserIcon className="w-6 h-6" />
                </button>
            </div>
        </div>

        {/* Meal List */}
        <div className="flex-grow p-6 overflow-y-auto">
            {currentMeal.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="text-5xl mb-4">🍽️</div>
                    <p className="text-lg font-semibold text-brand-text">Your Analysis Bay is empty</p>
                    <p className="text-sm text-brand-text-muted mt-2">Select items from the Nutrient Library to begin your meal simulation</p>
                </div>
            ) : (
                <ul className="space-y-3">
                    {currentMeal.map(item => (
                        <li key={item.id} className="group flex items-center justify-between bg-brand-bg/50 p-4 rounded-xl animate-fade-in border border-brand-primary/20 hover:border-brand-accent/60 transition-all duration-300 hover:shadow-lg hover:shadow-brand-accent/20">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <img src={item.imageUrl} alt={item.name} className="w-14 h-14 object-cover rounded-lg flex-shrink-0 shadow-md"/>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-brand-text text-sm">{item.name}</p>
                                    <p className="text-xs text-brand-accent font-medium">{item.quantity}{item.unit} • {Math.round(item.nutrition.calories)} cal</p>
                                </div>
                            </div>
                            <button onClick={() => removeFoodFromMeal(item.id)} className="p-2 rounded-lg text-brand-text-muted hover:bg-red-500/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200 ml-2 flex-shrink-0">
                                <X className="w-5 h-5" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-brand-primary/10 flex-shrink-0 space-y-3">
             {currentMeal.length > 0 && (
                <div className="flex items-center justify-between bg-brand-bg/40 rounded-lg px-4 py-2">
                    <span className="text-sm font-medium text-brand-text">
                      Total: <span className="text-brand-accent">{Math.round(currentMeal.reduce((sum, item) => sum + item.nutrition.calories, 0))} cal</span>
                    </span>
                    <button onClick={handleClearMeal} className="flex items-center gap-1 text-xs text-brand-text-muted hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4"/>
                        Clear
                    </button>
                </div>
            )}
            <button
                onClick={handleSimulate}
                disabled={currentMeal.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold py-3 px-4 rounded-xl transition-all transform focus:outline-none focus:ring-4 focus:ring-brand-primary/50 disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:scale-105 enabled:hover:shadow-xl enabled:hover:shadow-brand-primary/30"
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
