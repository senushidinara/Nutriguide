
import React, { useState, useCallback } from 'react';
import { UserProfile, FoodItem, SimulationResult, ChatMessage, SavedMeal, GroundingSource } from '../types';
import FoodSelector from './FoodSelector';
import MealBuilder from './MealBuilder';
import SimulationDisplay from './SimulationDisplay';
import LoadingSimulation from './LoadingSimulation';
import AddFoodQuantityModal from './AddFoodQuantityModal';
import ChatModal from './ChatModal';
import UserProfileModal from './UserProfileModal';
import { getMealSimulation, startChatSession, getChatResponse } from '../services/geminiService';
import { ServerCrash, ArrowLeft } from './icons';


interface MealSimulatorProps {
  userProfile: UserProfile;
  onProfileUpdate: (profile: UserProfile) => void;
  currentFont: 'font-sans' | 'font-serif';
  getChatResponse: (message: string, location: {latitude: number, longitude: number} | null) => Promise<{ text: string, groundingSources?: GroundingSource[] }>;
  userLocation: {latitude: number, longitude: number} | null;
}

const MealSimulator: React.FC<MealSimulatorProps> = ({ userProfile: initialProfile, onProfileUpdate, currentFont, userLocation }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);
  const [currentMeal, setCurrentMeal] = useState<FoodItem[]>([]);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  
  const [savedMeals, setSavedMeals] = useState<SavedMeal[]>(() => {
    try {
        const saved = localStorage.getItem('nutriGuideSavedMeals');
        return saved ? JSON.parse(saved) : [];
    } catch (error) { return []; }
  });

  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [foodForQuantity, setFoodForQuantity] = useState<Omit<FoodItem, 'quantity' | 'unit'> | null>(null);

  const handleProfileUpdate = (profile: UserProfile) => {
    setUserProfile(profile);
    onProfileUpdate(profile);
    setProfileModalOpen(false);
  };
  
  const handleAddFoodWithQuantity = (food: Omit<FoodItem, 'quantity' | 'unit'>, quantity: string, unit: string) => {
    if (currentMeal.find(item => item.id === food.id)) return;
    setCurrentMeal(prev => [...prev, { ...food, quantity, unit }]);
    setFoodForQuantity(null);
  };

  const handleSimulate = useCallback(async () => {
    if (!userProfile || currentMeal.length === 0) {
      setError("Please add food to the Simulation Core before simulating.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSimulationResult(null);

    try {
      const result = await getMealSimulation(userProfile, currentMeal);
      setSimulationResult(result);
      startChatSession(userProfile, currentMeal, result);
      setChatHistory([{ role: 'model', text: "I've reviewed your simulation results. Feel free to ask any questions, including real-time info like 'find healthy restaurants near me'." }]);
    } catch (e) {
      console.error(e);
      setError("The AI failed to analyze your meal. This could be due to a configuration issue or an unusual food combination. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [userProfile, currentMeal]);
  
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    const newUserMessage: ChatMessage = { role: 'user', text: message };
    setChatHistory(prev => [...prev, newUserMessage]);
    setIsChatLoading(true);

    try {
      const response = await getChatResponse(message, userLocation);
      const newModelMessage: ChatMessage = { 
          role: 'model', 
          text: response.text,
          groundingSources: response.groundingSources 
        };
      setChatHistory(prev => [...prev, newModelMessage]);
    } catch (e) {
        console.error("Chat Error", e);
        const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I encountered an error. Please try again." };
        setChatHistory(prev => [...prev, errorMessage]);
    } finally {
        setIsChatLoading(false);
    }
  }

  const handleClearMeal = () => {
    setCurrentMeal([]);
    setSimulationResult(null);
    setIsChatOpen(false);
  }
  
  const handleSaveMeal = () => {
    if (currentMeal.length === 0) return;
    const mealName = prompt("Enter a name for this meal:", "My Go-To Lunch");
    if (mealName && currentMeal.length > 0) {
        const newSavedMeal: SavedMeal = { id: new Date().toISOString(), name: mealName, foods: currentMeal };
        const updatedSavedMeals = [newSavedMeal, ...savedMeals];
        setSavedMeals(updatedSavedMeals);
        localStorage.setItem('nutriGuideSavedMeals', JSON.stringify(updatedSavedMeals));
    }
  };
  
  const handleLoadMeal = (meal: SavedMeal) => {
    setCurrentMeal(meal.foods);
    setSimulationResult(null);
  }

  const handleBackToBuilder = () => {
    setSimulationResult(null);
    setError(null);
  }

  const removeFoodFromMeal = (foodId: string) => {
    setCurrentMeal(prev => prev.filter(item => item.id !== foodId));
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center bg-red-50 border border-red-200 rounded-2xl p-8 text-center animate-fade-in">
          <ServerCrash className="w-16 h-16 text-red-500" />
          <h2 className="text-2xl font-bold mt-6 text-red-800">Analysis Failed</h2>
          <p className="text-red-700 mt-2 max-w-md">{error}</p>
          <button onClick={handleBackToBuilder} className="mt-6 flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-800 font-bold py-2 px-4 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Return to Simulator
          </button>
        </div>
      );
    }
    
    if (simulationResult) {
      return (
         <div className="w-full animate-fade-in">
            <button onClick={handleBackToBuilder} className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-surface/70 backdrop-blur-sm hover:bg-background text-text-secondary font-bold py-2 px-4 rounded-full transition-colors border border-border-color">
                <ArrowLeft className="w-5 h-5" />
                New Simulation
            </button>
            <SimulationDisplay result={simulationResult} onOpenChat={() => setIsChatOpen(true)} onSaveMeal={handleSaveMeal} />
        </div>
      );
    }

    if (isLoading) {
      return <LoadingSimulation />;
    }

    return (
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <div className="h-full flex flex-col animate-slide-in-up" style={{animationDelay: '100ms'}}>
            <MealBuilder
                currentMeal={currentMeal}
                removeFoodFromMeal={removeFoodFromMeal}
                handleClearMeal={handleClearMeal}
                handleSimulate={handleSimulate}
                onOpenProfile={() => setProfileModalOpen(true)}
                savedMeals={savedMeals}
                onLoadMeal={handleLoadMeal}
            />
          </div>
          <div className="h-full hidden lg:flex flex-col animate-slide-in-up" style={{animationDelay: '300ms'}}>
            <FoodSelector
                onSelectFood={(food) => setFoodForQuantity(food)}
            />
          </div>
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-150px)] w-full flex flex-col items-center justify-center">
        <header className="w-full mb-8">
            <h1 className={`text-4xl font-bold text-secondary ${currentFont}`}>Meal Simulator</h1>
            <p className="text-text-secondary mt-1">Compose a meal and predict its impact on your body.</p>
        </header>
        <div className="w-full flex-grow flex items-center justify-center">
            {renderContent()}
        </div>
        
        {foodForQuantity && (
            <AddFoodQuantityModal
                foodItem={foodForQuantity}
                onClose={() => setFoodForQuantity(null)}
                onAdd={handleAddFoodWithQuantity}
            />
        )}

        {isProfileModalOpen && (
            <UserProfileModal 
                currentUserProfile={userProfile}
                onClose={() => setProfileModalOpen(false)}
                onSubmit={handleProfileUpdate}
            />
        )}

        <ChatModal 
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
            history={chatHistory}
            onSendMessage={handleSendMessage}
            isLoading={isChatLoading}
        />
    </main>
  );
};

export default MealSimulator;
