
import React, { useState, useCallback, useEffect } from 'react';
import { UserProfile, FoodItem, SimulationResult, ChatMessage, SavedMeal } from './types';
import UserProfileSetup from './components/UserProfileSetup';
import Dashboard from './components/Dashboard';
import ChatModal from './components/ChatModal';
import UserProfileModal from './components/UserProfileModal';
import AddFoodQuantityModal from './components/AddFoodQuantityModal';
import { getMealSimulation, startChatSession, sendMessageToChat } from './services/geminiService';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const savedProfile = localStorage.getItem('nutriGuideProfile');
      return savedProfile ? JSON.parse(savedProfile) : null;
    } catch (error) {
      return null;
    }
  });
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
    } catch (error) {
        return [];
    }
  });

  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [foodForQuantity, setFoodForQuantity] = useState<Omit<FoodItem, 'quantity' | 'unit'> | null>(null);

  useEffect(() => {
    if (userProfile) {
        localStorage.setItem('nutriGuideProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('nutriGuideSavedMeals', JSON.stringify(savedMeals));
  }, [savedMeals]);


  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    setProfileModalOpen(false);
  };
  
  const handleAddFoodWithQuantity = (food: Omit<FoodItem, 'quantity' | 'unit'>, quantity: string, unit: string) => {
    if (currentMeal.find(item => item.id === food.id)) return;
    setCurrentMeal(prev => [...prev, { ...food, quantity, unit }]);
    setFoodForQuantity(null);
  };

  const handleSimulate = useCallback(async () => {
    if (!userProfile || currentMeal.length === 0) {
      setError("Please add food to the Analysis Bay before simulating.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSimulationResult(null);

    try {
      const result = await getMealSimulation(userProfile, currentMeal);
      setSimulationResult(result);
      startChatSession(userProfile, currentMeal, result);
      setChatHistory([{ role: 'model', text: "I've reviewed your Aura analysis. Feel free to ask any questions." }]);
    } catch (e) {
      console.error(e);
      setError("The AI failed to analyze your Aura. This could be due to a configuration issue or an unusual food combination. Please try again.");
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
      const responseText = await sendMessageToChat(message);
      const newModelMessage: ChatMessage = { role: 'model', text: responseText };
      setChatHistory(prev => [...prev, newModelMessage]);
    } catch (e) {
        console.error("Chat error:", e);
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
    const mealName = prompt("Enter a name for this meal composition:", "My Go-To Lunch");
    if (mealName && currentMeal.length > 0) {
        const newSavedMeal: SavedMeal = {
            id: new Date().toISOString(),
            name: mealName,
            foods: currentMeal,
        };
        setSavedMeals(prev => [newSavedMeal, ...prev]);
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

  if (!userProfile) {
    return <UserProfileSetup onSubmit={handleProfileSubmit} />;
  }

  return (
    <div className="min-h-screen w-full font-sans antialiased">
      <Dashboard
        userProfile={userProfile}
        currentMeal={currentMeal}
        setCurrentMeal={setCurrentMeal}
        handleSimulate={handleSimulate}
        handleClearMeal={handleClearMeal}
        simulationResult={simulationResult}
        isLoading={isLoading}
        error={error}
        onOpenChat={() => setIsChatOpen(true)}
        onSaveMeal={handleSaveMeal}
        onSelectFoodForQuantity={(food) => setFoodForQuantity(food)}
        savedMeals={savedMeals}
        onLoadMeal={handleLoadMeal}
        onOpenProfile={() => setProfileModalOpen(true)}
        onBackToBuilder={handleBackToBuilder}
      />
      
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
            onSubmit={handleProfileSubmit}
        />
      )}

      <ChatModal 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        history={chatHistory}
        onSendMessage={handleSendMessage}
        isLoading={isChatLoading}
      />
    </div>
  );
};

export default App;
