import React, { useState } from 'react';
import { UserProfile, ThemeName } from '../types';
import UserProfileModal from './UserProfileModal';
import { UserIcon, Shield, Zap, AlertTriangle, Dna, FileText } from './icons';
import { themes } from '../themes';

interface SettingsProps {
    userProfile: UserProfile;
    onProfileUpdate: (profile: Partial<UserProfile>) => void;
    theme: ThemeName;
    onThemeChange: (theme: ThemeName) => void;
    onShowInfo: (title: string, content: React.ReactNode) => void;
    onManageData: () => void;
    onConnectWearables: () => void;
    currentFont: 'font-sans' | 'font-serif';
}

const Settings: React.FC<SettingsProps> = ({ userProfile, onProfileUpdate, theme, onThemeChange, onShowInfo, onManageData, onConnectWearables, currentFont }) => {
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    
    const handleProfileUpdateAndClose = (profile: UserProfile) => {
        onProfileUpdate(profile);
        setProfileModalOpen(false);
    };
    
    const legalContent = {
        terms: (
            <div className="space-y-4 text-sm text-text-secondary">
                <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
                <p>Welcome to NutriGuide AI. By using our application, you agree to these terms. Our service provides personalized nutritional insights based on the data you provide. This is for informational purposes only and is not medical advice.</p>
                <p>You grant us a license to use the data you submit to improve our services. We are not liable for any health decisions you make based on our app's suggestions. We may suspend or terminate your account if you violate these terms.</p>
            </div>
        ),
        privacy: (
             <div className="space-y-4 text-sm text-text-secondary">
                <p>Your privacy is paramount. We collect personal data (profile, meal inputs) and usage data to provide and improve our service. All personal health information is encrypted at rest and in transit.</p>
                <p>We do not sell your personal data. We may share anonymized, aggregated data for research purposes. You have the right to access, correct, or delete your personal data at any time by contacting us.</p>
            </div>
        ),
        disclaimer: (
            <div className="space-y-4 text-sm text-text-secondary">
                <p>The information provided by NutriGuide AI is for educational and informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.</p>
                <p>Never disregard professional medical advice or delay in seeking it because of something you have read on this application. If you have a medical emergency, call your doctor or emergency services immediately.</p>
                <p>Reliance on any information provided by NutriGuide AI is solely at your own risk.</p>
            </div>
        )
    };

    return (
        <div className="animate-fade-in space-y-8">
            <header>
                <h1 className={`text-4xl font-bold text-secondary ${currentFont}`}>Settings</h1>
                <p className="text-text-secondary mt-1">Manage your profile, integrations, and preferences.</p>
            </header>
            
            <div className="space-y-6">
                <SettingsSection title="Account">
                    <SettingsItem
                        icon={UserIcon}
                        title="Body Blueprint"
                        description="Update your age, weight, activity level, and goals."
                        onClick={() => setProfileModalOpen(true)}
                    />
                </SettingsSection>

                <SettingsSection title="Appearance">
                    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {(Object.keys(themes) as ThemeName[]).map((themeKey) => {
                            const isActive = theme === themeKey;
                            const themeDetails = themes[themeKey];
                            
                            return (
                                <button
                                    key={themeKey}
                                    onClick={() => onThemeChange(themeKey)}
                                    className={`relative p-2 rounded-lg border-2 transition-all ${isActive ? 'border-primary ring-2 ring-primary/50' : 'border-border-color hover:border-primary/50'}`}
                                    aria-label={`Select ${themeKey} theme`}
                                >
                                    <div className="w-full h-16 rounded-md mb-2 overflow-hidden" >
                                       <div className="w-full h-full" style={{ background: themeDetails.background }}></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className={`text-sm font-semibold capitalize ${isActive ? 'text-primary' : 'text-text-secondary'}`}>
                                            {themeKey}
                                        </p>
                                        <div 
                                            className="w-4 h-4 rounded-full" 
                                            style={{ backgroundColor: `rgb(${themeDetails.colors['--color-primary']})`}}
                                        ></div>
                                    </div>
                                    <div 
                                        className="absolute top-4 left-4 right-4 text-xs font-bold text-white/80 p-1 rounded bg-black/20 backdrop-blur-sm"
                                        style={{ fontFamily: themeDetails.fonts['--font-family-sans']}}
                                    >
                                        <span style={{ fontFamily: themeDetails.fonts['--font-family-serif']}}>Ag</span>
                                        <span> Abc</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </SettingsSection>

                <SettingsSection title="Integrations">
                     <SettingsItem
                        icon={Zap}
                        title="Connect Wearables"
                        description={userProfile.wearableStatus === 'connected' ? 'Manage your connected wearables' : 'Sync data from Apple Health, Google Fit, etc.'}
                        onClick={userProfile.wearableStatus === 'connected' ? onManageData : onConnectWearables}
                    />
                    <SettingsItem
                        icon={Dna}
                        title="Manage Genetic Data"
                        description="View or disconnect your genetics information."
                        onClick={onManageData}
                    />
                </SettingsSection>

                <SettingsSection title="Legal & Privacy">
                     <SettingsItem
                        icon={FileText}
                        title="Terms of Service"
                        description="Read our terms and conditions."
                        onClick={() => onShowInfo('Terms of Service', legalContent.terms)}
                    />
                    <SettingsItem
                        icon={Shield}
                        title="Privacy Policy"
                        description="Read about how we protect your data."
                        onClick={() => onShowInfo('Privacy Policy', legalContent.privacy)}
                    />
                     <SettingsItem
                        icon={AlertTriangle}
                        title="Medical Disclaimer"
                        description="Important information about the scope of our advice."
                        onClick={() => onShowInfo('Medical Disclaimer', legalContent.disclaimer)}
                    />
                </SettingsSection>
            </div>
            
             {isProfileModalOpen && (
                <UserProfileModal 
                    currentUserProfile={userProfile}
                    onClose={() => setProfileModalOpen(false)}
                    onSubmit={handleProfileUpdateAndClose}
                />
            )}
        </div>
    );
};

const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h2 className="text-xl font-bold text-secondary mb-3">{title}</h2>
        <div className="bg-surface rounded-2xl border border-border-color shadow-lg shadow-slate-200/50 overflow-hidden divide-y divide-border-color">
            {children}
        </div>
    </div>
);

const SettingsItem: React.FC<{ icon: React.FC<{className?:string}>; title: string; description: string; onClick: () => void }> = ({ icon: Icon, title, description, onClick }) => {
    return (
        <button onClick={onClick} className="flex items-center w-full text-left p-4 hover:bg-background transition-colors group">
            <div className="w-10 h-10 bg-accent/50 rounded-lg flex items-center justify-center mr-4">
                <Icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-grow">
                <p className="font-bold text-text-primary">{title}</p>
                <p className="text-sm text-text-secondary">{description}</p>
            </div>
            <div className="ml-4">
                 <svg className="w-5 h-5 text-text-muted transition-transform transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
        </button>
    );
};

export default Settings;
