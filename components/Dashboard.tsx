import React, { useState } from 'react';
import { UserProfile, FoodItem, SimulationResult, SavedMeal } from '../types';
import FoodSelector from './FoodSelector';
import MealBuilder from './MealBuilder';
import SimulationDisplay from './SimulationDisplay';
import LoadingSimulation from './LoadingSimulation';
import { ServerCrash, ArrowLeft } from './icons';

interface DashboardProps {
  userProfile: UserProfile;
  currentMeal: FoodItem[];
  setCurrentMeal: React.Dispatch<React.SetStateAction<FoodItem[]>>;
  handleSimulate: () => void;
  handleClearMeal: () => void;
  simulationResult: SimulationResult | null;
  isLoading: boolean;
  error: string | null;
  onOpenChat: () => void;
  onSaveMeal: () => void;
  onSelectFoodForQuantity: (food: Omit<FoodItem, 'quantity' | 'unit'>) => void;
  savedMeals: SavedMeal[];
  onLoadMeal: (meal: SavedMeal) => void;
  onOpenProfile: () => void;
  onBackToBuilder: () => void;
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const {
    currentMeal,
    setCurrentMeal,
    simulationResult,
    isLoading,
    error,
    onBackToBuilder,
  } = props;

  const removeFoodFromMeal = (foodId: string) => {
    setCurrentMeal(prev => prev.filter(item => item.id !== foodId));
  };
  
  const renderContent = () => {
    if (error) {
      return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center bg-red-900/20 border border-red-500/50 rounded-2xl p-8 text-center animate-fade-in">
          <ServerCrash className="w-16 h-16 text-red-400" />
          <h2 className="text-2xl font-bold mt-6 text-red-300">Analysis Failed</h2>
          <p className="text-red-300/80 mt-2 max-w-md">{error}</p>
          <button onClick={onBackToBuilder} className="mt-6 flex items-center gap-2 bg-red-400/20 hover:bg-red-400/40 text-red-300 font-bold py-2 px-4 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Return to Analysis Bay
          </button>
        </div>
      );
    }
    
    if (simulationResult) {
      return (
         <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            <button onClick={onBackToBuilder} className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-brand-surface/70 backdrop-blur-sm hover:bg-brand-primary/20 text-brand-secondary font-bold py-2 px-4 rounded-full transition-colors border border-brand-primary/20">
                <ArrowLeft className="w-5 h-5" />
                New Analysis
            </button>
            <SimulationDisplay {...props} result={simulationResult} />
        </div>
      );
    }

    if (isLoading) {
      return <LoadingSimulation />;
    }

    // Main Builder and Selector View
    return (
      <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 h-full">
          <div className="h-full flex flex-col animate-slide-in-blur" style={{animationDelay: '100ms'}}>
            <MealBuilder
                {...props}
                removeFoodFromMeal={removeFoodFromMeal}
            />
          </div>
          <div className="h-full hidden lg:flex flex-col animate-slide-in-blur" style={{animationDelay: '300ms'}}>
            <FoodSelector
                onSelectFood={props.onSelectFoodForQuantity}
            />
          </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      {renderContent()}
    </main>
  );
};

export default Dashboard;