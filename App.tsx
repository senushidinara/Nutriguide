
import React, { useState, useCallback, useEffect } from 'react';
import { UserProfile, AppView, ThemeName, Achievement, LeaderboardUser, SimulationResult, Toast, AppState } from './types';
import UserProfileSetup from './components/UserProfileSetup';
import Layout from './components/Layout';
import WellnessDashboard from './components/WellnessDashboard';
import MealSimulator from './components/MealSimulator';
import GeneticsMicrobiome from './components/GeneticsMicrobiome';
import Community from './components/Community';
import Settings from './components/Settings';
import DisclaimerModal from './components/DisclaimerModal';
import WeeklyReportModal from './components/WeeklyReportModal';
import InfoModal from './components/InfoModal';
import ConnectionModal from './components/ConnectionModal';
import AchievementDetailModal from './components/AchievementDetailModal';
import CommunityProfileModal from './components/CommunityProfileModal';
import DataManagementModal from './components/DataManagementModal';
import OnboardingTour from './components/OnboardingTour';
import ToastComponent from './components/Toast';
import { themes } from './themes';
import { getChatResponse } from './services/geminiService';


const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(() => {
    try {
      const savedState = localStorage.getItem('nutriGuideState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Ensure all connection statuses are present from older versions
         if (parsedState.userProfile) {
            parsedState.userProfile.geneticsDataStatus = parsedState.userProfile.geneticsDataStatus || 'not_connected';
            parsedState.userProfile.microbiomeDataStatus = parsedState.userProfile.microbiomeDataStatus || 'not_connected';
            parsedState.userProfile.wearableStatus = parsedState.userProfile.wearableStatus || 'not_connected';
        }
        return parsedState;
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
    return {
        userProfile: null,
        activeView: 'dashboard',
        theme: 'emerald',
        lastSimulationResult: null,
        hasCompletedOnboarding: false,
    };
  });
  
  const [isDisclaimerOpen, setDisclaimerOpen] = useState<boolean>(() => {
    return localStorage.getItem('nutriGuideDisclaimerAccepted') !== 'true';
  });
  
  const [isWeeklyReportOpen, setWeeklyReportOpen] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState<{title: string, content: React.ReactNode} | null>(null);
  
  const [isConnectionModalOpen, setConnectionModalOpen] = useState<{isOpen: boolean, type: 'genetics' | 'microbiome' | 'wearables' | null}>({isOpen: false, type: null});
  const [isDataManagementModalOpen, setDataManagementModalOpen] = useState(false);
  const [achievementModalContent, setAchievementModalContent] = useState<Achievement | null>(null);
  const [communityProfileModalContent, setCommunityProfileModalContent] = useState<LeaderboardUser | null>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);

  useEffect(() => {
    localStorage.setItem('nutriGuideState', JSON.stringify(appState));
  }, [appState]);
  
  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = new Date().getTime();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };
  
  const updateState = <K extends keyof AppState>(key: K, value: AppState[K]) => {
    setAppState(prev => ({ ...prev, [key]: value }));
  };
  
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (appState.userProfile) {
        updateState('userProfile', { ...appState.userProfile, ...updates });
    }
  };

  useEffect(() => {
     navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Could not get user location:", error.message);
      }
    );
  }, []);
  
  useEffect(() => {
    const activeTheme = themes[appState.theme];
    const root = document.documentElement;
    
    for (const [key, value] of Object.entries(activeTheme.colors)) {
        root.style.setProperty(key, value as string);
    }
    for (const [key, value] of Object.entries(activeTheme.fonts)) {
        root.style.setProperty(key, value as string);
    }
    root.style.setProperty('--background-gradient', activeTheme.background);
  }, [appState.theme]);
  
  const handleProfileSubmit = (profile: UserProfile) => {
    updateState('userProfile', profile);
  };

  const handleDisclaimerAccept = () => {
    localStorage.setItem('nutriGuideDisclaimerAccepted', 'true');
    setDisclaimerOpen(false);
  }
  
  const handleShowInfoModal = (title: string, content: React.ReactNode) => {
    setInfoModalContent({ title, content });
  };
  
  const handleUpdateConnectionStatus = (
    type: 'geneticsDataStatus' | 'microbiomeDataStatus' | 'wearableStatus',
    status: 'not_connected' | 'pending' | 'connected'
  ) => {
    if (appState.userProfile) {
      updateUserProfile({ [type]: status });
    }
  };

  const handleOpenConnectionModal = (type: 'genetics' | 'microbiome' | 'wearables') => {
    setConnectionModalOpen({ isOpen: true, type });
  };
  
  const handleConnectionSuccess = (type: 'genetics' | 'microbiome' | 'wearables') => {
    if (type === 'genetics') handleUpdateConnectionStatus('geneticsDataStatus', 'connected');
    if (type === 'microbiome') handleUpdateConnectionStatus('microbiomeDataStatus', 'connected');
    if (type === 'wearables') handleUpdateConnectionStatus('wearableStatus', 'connected');
    setConnectionModalOpen({ isOpen: false, type: null });
    addToast(`${type.charAt(0).toUpperCase() + type.slice(1)} data connected successfully!`);
  };

  const handleSimulationComplete = (result: SimulationResult, meal: any[]) => {
      const macros = meal.reduce((acc, item) => {
          const quantityFactor = parseFloat(item.quantity) / 100; // Assuming nutrition is per 100g/ml
          acc.protein += item.nutrition.protein * quantityFactor;
          acc.carbs += item.nutrition.carbohydrates * quantityFactor;
          acc.fats += item.nutrition.fat * quantityFactor;
          return acc;
      }, { protein: 0, carbs: 0, fats: 0 });

      updateState('lastSimulationResult', result);
      updateUserProfile({ 
          lastWellnessScore: result.energy_optimization_score,
          lastMacros: macros
      });
      updateState('activeView', 'dashboard');
  };

  const renderContent = () => {
    const currentFont = themes[appState.theme].fonts['--font-family-sans'].includes('Lora') ? 'font-serif' : 'font-sans';
    switch (appState.activeView) {
      case 'dashboard':
        return <WellnessDashboard 
                    userProfile={appState.userProfile!} 
                    onNavigate={(view) => updateState('activeView', view)} 
                    onShowReport={() => setWeeklyReportOpen(true)} 
                    currentFont={currentFont} 
                />;
      case 'simulator':
        return <MealSimulator 
                    userProfile={appState.userProfile!} 
                    onProfileUpdate={(updates) => {
                        updateUserProfile(updates);
                        addToast("Body Blueprint updated successfully!");
                    }} 
                    currentFont={currentFont} 
                    getChatResponse={getChatResponse} 
                    userLocation={userLocation}
                    onSimulationComplete={handleSimulationComplete}
                    addToast={addToast}
                />;
      case 'genetics':
        return <GeneticsMicrobiome 
                    userProfile={appState.userProfile!} 
                    onConnect={handleOpenConnectionModal}
                    currentFont={currentFont}
                />;
       case 'community':
        return <Community 
                    currentFont={currentFont}
                    onAchievementClick={setAchievementModalContent}
                    onProfileClick={setCommunityProfileModalContent}
                />;
      case 'settings':
        return <Settings 
                    userProfile={appState.userProfile!} 
                    onProfileUpdate={(updates) => {
                        updateUserProfile(updates);
                        addToast("Body Blueprint updated successfully!");
                    }} 
                    theme={appState.theme} 
                    onThemeChange={(theme) => updateState('theme', theme)} 
                    onShowInfo={handleShowInfoModal}
                    onManageData={() => setDataManagementModalOpen(true)}
                    onConnectWearables={() => handleOpenConnectionModal('wearables')}
                    currentFont={currentFont} />;
      default:
        return <WellnessDashboard userProfile={appState.userProfile!} onNavigate={(view) => updateState('activeView', view)} onShowReport={() => setWeeklyReportOpen(true)} currentFont={currentFont}/>;
    }
  };

  if (!appState.userProfile) {
    return (
      <>
        {isDisclaimerOpen && <DisclaimerModal onClose={handleDisclaimerAccept} />}
        <UserProfileSetup onSubmit={handleProfileSubmit} />
      </>
    );
  }

  return (
    <div className="min-h-screen w-full antialiased relative">
       {isDisclaimerOpen && <DisclaimerModal onClose={handleDisclaimerAccept} />}
       {!appState.hasCompletedOnboarding && <OnboardingTour onClose={() => updateState('hasCompletedOnboarding', true)} />}
       
       <Layout activeView={appState.activeView} setActiveView={(view) => updateState('activeView', view)}>
         {renderContent()}
       </Layout>
       
       <div className="fixed top-4 right-4 z-[100] w-full max-w-sm">
            {toasts.map(toast => (
                <ToastComponent key={toast.id} message={toast.message} type={toast.type} onClose={() => setToasts(p => p.filter(t => t.id !== toast.id))} />
            ))}
        </div>

       {isWeeklyReportOpen && <WeeklyReportModal onClose={() => setWeeklyReportOpen(false)} />}
       {infoModalContent && <InfoModal title={infoModalContent.title} onClose={() => setInfoModalContent(null)}>{infoModalContent.content}</InfoModal>}
       {isConnectionModalOpen.isOpen && (
            <ConnectionModal 
                type={isConnectionModalOpen.type!}
                onClose={() => setConnectionModalOpen({ isOpen: false, type: null })}
                onSuccess={() => handleConnectionSuccess(isConnectionModalOpen.type!)}
            />
        )}
        {isDataManagementModalOpen && (
            <DataManagementModal
                userProfile={appState.userProfile}
                onClose={() => setDataManagementModalOpen(false)}
                onUpdateStatus={handleUpdateConnectionStatus}
            />
        )}
        {achievementModalContent && (
            <AchievementDetailModal
                achievement={achievementModalContent}
                onClose={() => setAchievementModalContent(null)}
            />
        )}
        {communityProfileModalContent && (
             <CommunityProfileModal
                user={communityProfileModalContent}
                onClose={() => setCommunityProfileModalContent(null)}
            />
        )}
    </div>
  );
};

export default App;