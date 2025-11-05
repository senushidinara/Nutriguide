import React, { useState } from 'react';
import { UserProfile, ThemeName } from '../types';
import UserProfileModal from './UserProfileModal';
import { UserIcon, Shield, Zap, AlertTriangle, Dna, FileText } from './icons';
import { themes } from '../themes';

interface SettingsProps {
    userProfile: UserProfile;
    onProfileUpdate: (profile: UserProfile) => void;
    theme: ThemeName;
    onThemeChange: (theme: ThemeName) => void;
    onShowToast: (message: string) => void;
    currentFont: 'font-sans' | 'font-serif';
}

const Settings: React.FC<SettingsProps> = ({ userProfile, onProfileUpdate, theme, onThemeChange, onShowToast, currentFont }) => {
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);

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
                        description="Sync data from Apple Health, Google Fit, and more."
                        onClick={() => onShowToast('Wearable integration is coming soon!')}
                    />
                    <SettingsItem
                        icon={Dna}
                        title="Manage Genetic Data"
                        description="Connect or disconnect your genetics information."
                        onClick={() => onShowToast('Genetic data management is coming soon!')}
                    />
                </SettingsSection>

                <SettingsSection title="Legal & Privacy">
                     <SettingsItem
                        icon={FileText}
                        title="Terms of Service"
                        description="Read our terms and conditions."
                        onClick={() => onShowToast('Displaying Terms of Service soon!')}
                    />
                    <SettingsItem
                        icon={Shield}
                        title="Privacy Policy"
                        description="Read about how we protect your data."
                        onClick={() => onShowToast('Displaying Privacy Policy soon!')}
                    />
                     <SettingsItem
                        icon={AlertTriangle}
                        title="Medical Disclaimer"
                        description="Important information about the scope of our advice."
                        onClick={() => onShowToast('Displaying Medical Disclaimer soon!')}
                    />
                </SettingsSection>
            </div>
            
             {isProfileModalOpen && (
                <UserProfileModal 
                    currentUserProfile={userProfile}
                    onClose={() => setProfileModalOpen(false)}
                    onSubmit={onProfileUpdate}
                />
            )}
        </div>
    );
};

const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h2 className="text-xl font-bold text-secondary mb-3">{title}</h2>
        <div className="bg-surface rounded-2xl border border-border-color shadow-lg shadow-slate-200/50 overflow-hidden">
            {children}
        </div>
    </div>
);

const SettingsItem: React.FC<{ icon: React.FC<{className?:string}>; title: string; description: string; onClick: () => void }> = ({ icon: Icon, title, description, onClick }) => (
    <button onClick={onClick} className="flex items-center w-full text-left p-4 hover:bg-background transition-colors group">
        <div className="w-10 h-10 bg-accent/50 rounded-lg flex items-center justify-center mr-4">
            <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-grow">
            <p className="font-bold text-text-primary">{title}</p>
            <p className="text-sm text-text-secondary">{description}</p>
        </div>
            <svg className="w-5 h-5 text-text-muted transition-transform transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
);

export default Settings;