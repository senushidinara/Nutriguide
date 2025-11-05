import React, { useState, useCallback, useEffect } from 'react';
import { UserProfile, AppView, ThemeName, Achievement, LeaderboardUser } from './types';
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
import { themes } from './themes';
import { getChatResponse } from './services/geminiService';


const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const savedProfile = localStorage.getItem('nutriGuideProfile');
      const profile = savedProfile ? JSON.parse(savedProfile) : null;
      // Ensure all connection statuses are present
      if (profile) {
        profile.geneticsDataStatus = profile.geneticsDataStatus || 'not_connected';
        profile.microbiomeDataStatus = profile.microbiomeDataStatus || 'not_connected';
        profile.wearableStatus = profile.wearableStatus || 'not_connected';
      }
      return profile;
    } catch (error) {
      return null;
    }
  });

  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [isDisclaimerOpen, setDisclaimerOpen] = useState<boolean>(() => {
    return localStorage.getItem('nutriGuideDisclaimerAccepted') !== 'true';
  });
  
  const [isWeeklyReportOpen, setWeeklyReportOpen] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState<{title: string, content: React.ReactNode} | null>(null);
  
  const [isConnectionModalOpen, setConnectionModalOpen] = useState<{isOpen: boolean, type: 'genetics' | 'microbiome' | 'wearables' | null}>({isOpen: false, type: null});
  const [isDataManagementModalOpen, setDataManagementModalOpen] = useState(false);
  const [achievementModalContent, setAchievementModalContent] = useState<Achievement | null>(null);
  const [communityProfileModalContent, setCommunityProfileModalContent] = useState<LeaderboardUser | null>(null);


  const [theme, setTheme] = useState<ThemeName>(() => {
    const savedTheme = localStorage.getItem('nutriGuideTheme') as ThemeName;
    return savedTheme && themes[savedTheme] ? savedTheme : 'emerald';
  });
  
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);

  useEffect(() => {
    if (userProfile) {
        localStorage.setItem('nutriGuideProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);
  
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
    const activeTheme = themes[theme];
    const root = document.documentElement;
    
    // Apply colors
    for (const [key, value] of Object.entries(activeTheme.colors)) {
        root.style.setProperty(key, value as string);
    }

    // Apply fonts
    for (const [key, value] of Object.entries(activeTheme.fonts)) {
        root.style.setProperty(key, value as string);
    }
    
    // Apply background
    root.style.setProperty('--background-gradient', activeTheme.background);

    localStorage.setItem('nutriGuideTheme', theme);
  }, [theme]);
  
  const handleProfileSubmit = (profile: UserProfile) => {
    const fullProfile = {
        ...userProfile,
        ...profile,
        geneticsDataStatus: userProfile?.geneticsDataStatus || 'not_connected',
        microbiomeDataStatus: userProfile?.microbiomeDataStatus || 'not_connected',
        wearableStatus: userProfile?.wearableStatus || 'not_connected'
    };
    setUserProfile(fullProfile);
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
    if (userProfile) {
      setUserProfile(prev => prev ? { ...prev, [type]: status } : null);
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
  };

  const renderContent = () => {
    const currentFont = themes[theme].fonts['--font-family-sans'].includes('Lora') ? 'font-serif' : 'font-sans';
    switch (activeView) {
      case 'dashboard':
        return <WellnessDashboard userProfile={userProfile!} onNavigate={setActiveView} onShowReport={() => setWeeklyReportOpen(true)} currentFont={currentFont} />;
      case 'simulator':
        return <MealSimulator userProfile={userProfile!} onProfileUpdate={handleProfileSubmit} currentFont={currentFont} getChatResponse={getChatResponse} userLocation={userLocation}/>;
      case 'genetics':
        return <GeneticsMicrobiome 
                    userProfile={userProfile!} 
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
                    userProfile={userProfile!} 
                    onProfileUpdate={handleProfileSubmit} 
                    theme={theme} 
                    onThemeChange={setTheme} 
                    onShowInfo={handleShowInfoModal}
                    onManageData={() => setDataManagementModalOpen(true)}
                    onConnectWearables={() => handleOpenConnectionModal('wearables')}
                    currentFont={currentFont} />;
      default:
        return <WellnessDashboard userProfile={userProfile!} onNavigate={setActiveView} onShowReport={() => setWeeklyReportOpen(true)} currentFont={currentFont}/>;
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
    <div className="min-h-screen w-full antialiased relative">
       {isDisclaimerOpen && <DisclaimerModal onClose={handleDisclaimerAccept} />}
       <Layout activeView={activeView} setActiveView={setActiveView}>
         {renderContent()}
       </Layout>
       
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
                userProfile={userProfile}
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