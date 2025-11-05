import React from 'react';
import { UserProfile, AppView } from '../types';
import { BarChart, Sparkles, Zap } from './icons';
import AnimatedScore from './AnimatedScore';

interface WellnessDashboardProps {
    userProfile: UserProfile;
    onNavigate: (view: AppView) => void;
    onShowToast: (message: string) => void;
}

const WellnessDashboard: React.FC<WellnessDashboardProps> = ({ userProfile, onNavigate, onShowToast }) => {
    
    const wellnessScore = 88; // Mock data
    
    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <h1 className="text-4xl font-bold text-secondary">Today's Dashboard</h1>
                <p className="text-text-secondary mt-1">Your personalized wellness command center.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Score & Action */}
                <div className="lg:col-span-2 bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white shadow-2xl shadow-primary/20 flex flex-col justify-between transition-transform transform hover:-translate-y-1">
                    <div>
                        <h2 className="text-xl font-bold text-accent">Daily Wellness Score</h2>
                        <div className="text-7xl font-extrabold my-2 flex items-baseline">
                            <AnimatedScore value={wellnessScore} />
                            <span className="text-4xl opacity-50">/100</span>
                        </div>
                        <p className="max-w-md text-emerald-100">
                            Your score is trending up! Your recent meal choices are aligning well with your goal to {userProfile.goal.replace(/_/g, ' ')}.
                        </p>
                    </div>
                     <button 
                        onClick={() => onNavigate('simulator')}
                        className="mt-8 w-full md:w-auto self-start bg-white/90 hover:bg-white text-primary font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50 flex items-center justify-center gap-2">
                         <Zap className="w-5 h-5"/>
                         Analyze a New Meal
                    </button>
                </div>
                
                {/* Macros */}
                <div className="bg-surface rounded-2xl p-8 border border-border-color shadow-lg shadow-slate-200/50">
                    <h3 className="text-lg font-bold text-secondary mb-4">Macro Tracker</h3>
                    <div className="space-y-4">
                        <MacroItem label="Protein" value={80} goal={120} unit="g" color="bg-sky-500" />
                        <MacroItem label="Carbs" value={150} goal={200} unit="g" color="bg-amber-500" />
                        <MacroItem label="Fats" value={40} goal={60} unit="g" color="bg-rose-500" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <InsightCard
                    icon={Sparkles}
                    title="AI-Powered Insight"
                    text="To sustain your energy this afternoon, consider a snack rich in complex carbs and protein around 3 PM. Quinoa with chickpeas would be an excellent choice."
                    buttonText="Explore Options"
                    onClick={() => onNavigate('simulator')}
                />
                 <InsightCard
                    icon={BarChart}
                    title="Weekly Trend"
                    text="Your cognitive focus score has increased by 12% this week. Keep up the consistent meal timing and balanced macronutrients!"
                    buttonText="View Full Report"
                    onClick={() => onShowToast('Full reports feature coming soon!')}
                />
            </div>
        </div>
    );
};

const MacroItem = ({ label, value, goal, unit, color }: { label: string, value: number, goal: number, unit: string, color:string}) => (
    <div>
        <div className="flex justify-between items-baseline mb-1">
            <span className="font-bold text-text-primary">{label}</span>
            <span className="text-sm text-text-secondary">{value} / {goal}{unit}</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
                className={`${color} h-2.5 rounded-full transition-all duration-1000 ease-out`} 
                style={{ width: `${(value/goal)*100}%`}}
            ></div>
        </div>
    </div>
);

const InsightCard = ({ icon: Icon, title, text, buttonText, onClick }: { icon: React.FC<{className?: string}>, title: string, text: string, buttonText: string, onClick: () => void }) => (
    <div className="bg-surface rounded-2xl p-6 border border-border-color shadow-lg shadow-slate-200/50 flex flex-col transition-transform transform hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-3">
            <Icon className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold text-secondary">{title}</h3>
        </div>
        <p className="text-text-secondary flex-grow">{text}</p>
        <button onClick={onClick} className="mt-4 text-sm font-bold text-primary hover:text-primary-hover self-start group">
            {buttonText} <span className="transition-transform transform group-hover:translate-x-1 inline-block">&rarr;</span>
        </button>
    </div>
);

export default WellnessDashboard;