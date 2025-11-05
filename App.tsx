
import React, { useState, useCallback, useEffect } from 'react';
import { UserProfile, AppView, ThemeName } from './types';
import UserProfileSetup from './components/UserProfileSetup';
import Layout from './components/Layout';
import WellnessDashboard from './components/WellnessDashboard';
import MealSimulator from './components/MealSimulator';
import GeneticsMicrobiome from './components/GeneticsMicrobiome';
import Community from './components/Community';
import Settings from './components/Settings';
import DisclaimerModal from './components/DisclaimerModal';
import { themes } from './themes';
import { Zap } from './components/icons';


const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const savedProfile = localStorage.getItem('nutriGuideProfile');
      return savedProfile ? JSON.parse(savedProfile) : null;
    } catch (error) {
      return null;
    }
  });

  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [isDisclaimerOpen, setDisclaimerOpen] = useState<boolean>(() => {
    return localStorage.getItem('nutriGuideDisclaimerAccepted') !== 'true';
  });

  const [theme, setTheme] = useState<ThemeName>(() => {
    const savedTheme = localStorage.getItem('nutriGuideTheme') as ThemeName;
    return savedTheme && themes[savedTheme] ? savedTheme : 'emerald';
  });
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile) {
        localStorage.setItem('nutriGuideProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);
  
  useEffect(() => {
    const activeTheme = themes[theme];
    const root = document.documentElement;
    for (const [key, value] of Object.entries(activeTheme)) {
        root.style.setProperty(key, value as string);
    }
    localStorage.setItem('nutriGuideTheme', theme);
  }, [theme]);
  
   useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const handleDisclaimerAccept = () => {
    localStorage.setItem('nutriGuideDisclaimerAccepted', 'true');
    setDisclaimerOpen(false);
  }
  
  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <WellnessDashboard userProfile={userProfile!} onNavigate={setActiveView} onShowToast={showToast} />;
      case 'simulator':
        return <MealSimulator userProfile={userProfile!} />;
      case 'genetics':
        return <GeneticsMicrobiome onShowToast={showToast}/>;
       case 'community':
        return <Community />;
      case 'settings':
        return <Settings userProfile={userProfile!} onProfileUpdate={handleProfileSubmit} theme={theme} onThemeChange={setTheme} onShowToast={showToast}/>;
      default:
        return <WellnessDashboard userProfile={userProfile!} onNavigate={setActiveView} onShowToast={showToast} />;
    }
  };

  if (!userProfile) {
    return (
      <>
        {isDisclaimerOpen && <DisclaimerModal onClose={handleDisclaimerAccept} />}
        <UserProfileSetup onSubmit={handleProfileSubmit} />
      </>
    );
  }

  return (
    <div className="min-h-screen w-full font-sans antialiased relative">
       {isDisclaimerOpen && <DisclaimerModal onClose={handleDisclaimerAccept} />}
       <Layout activeView={activeView} setActiveView={setActiveView}>
         {renderContent()}
       </Layout>
       {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-secondary text-white py-3 px-6 rounded-full shadow-lg z-50 flex items-center gap-2 animate-slide-in-up">
            <Zap className="w-5 h-5" />
            <span>{toastMessage}</span>
        </div>
       )}
    </div>
  );
};

export default App;