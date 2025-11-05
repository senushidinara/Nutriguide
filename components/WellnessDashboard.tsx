import React from 'react';
import { UserProfile, AppView } from '../types';
import { BarChart, Sparkles, Zap } from './icons';
import AnimatedScore from './AnimatedScore';

interface WellnessDashboardProps {
    userProfile: UserProfile;
    onNavigate: (view: AppView) => void;
    onShowToast: (message: string) => void;
    currentFont: 'font-sans' | 'font-serif';
}

const WellnessDashboard: React.FC<WellnessDashboardProps> = ({ userProfile, onNavigate, onShowToast, currentFont }) => {
    
    const wellnessScore = 88; // Mock data
    
    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <h1 className={`text-4xl font-bold text-secondary ${currentFont}`}>Today's Dashboard</h1>
                <p className="text-text-secondary mt-1">Your personalized wellness command center.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Score & Action */}
                <div className="relative lg:col-span-2 bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white shadow-2xl shadow-primary/20 flex flex-col justify-between transition-transform transform hover:-translate-y-1 overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 opacity-50"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_40%)]"></div>
                     <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[shimmer_4s_infinite]"></div>

                    <div className="relative z-10">
                        <h2 className={`text-xl font-bold text-accent ${currentFont}`}>Daily Wellness Score</h2>
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
                        className="relative z-10 mt-8 w-full md:w-auto self-start bg-white/90 hover:bg-white text-primary font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50 flex items-center justify-center gap-2">
                         <Zap className="w-5 h-5"/>
                         Analyze a New Meal
                    </button>
                </div>
                
                {/* Macros */}
                <div className="bg-surface rounded-2xl p-8 border border-border-color shadow-lg shadow-slate-200/50">
                    <h3 className={`text-lg font-bold text-secondary mb-4 ${currentFont}`}>Macro Tracker</h3>
                    <div className="space-y-4 animate-slide-in-up" style={{animationDelay: '200ms'}}>
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
                    currentFont={currentFont}
                />
                 <InsightCard
                    icon={BarChart}
                    title="Weekly Trend"
                    text="Your cognitive focus score has increased by 12% this week. Keep up the consistent meal timing and balanced macronutrients!"
                    buttonText="View Full Report"
                    onClick={() => onShowToast('Full reports feature coming soon!')}
                    currentFont={currentFont}
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
        <div className="w-full h-2.5 bg-background rounded-full overflow-hidden">
            <div 
                className={`${color} h-2.5 rounded-full transition-all duration-1000 ease-out`} 
                style={{ width: `${(value/goal)*100}%`}}
            ></div>
        </div>
    </div>
);

const InsightCard = ({ icon: Icon, title, text, buttonText, onClick, currentFont }: { icon: React.FC<{className?: string}>, title: string, text: string, buttonText: string, onClick: () => void, currentFont: string }) => (
    <div className="group relative bg-surface rounded-2xl p-6 border border-border-color shadow-lg shadow-slate-200/50 flex flex-col transition-transform transform hover:-translate-y-1">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-amber-500 opacity-0 group-hover:opacity-80 transition-opacity duration-300 blur-md"></div>
        <div className="relative bg-surface rounded-xl p-1 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-3">
                <Icon className="w-6 h-6 text-primary" />
                <h3 className={`text-lg font-bold text-secondary ${currentFont}`}>{title}</h3>
            </div>
            <p className="text-text-secondary flex-grow">{text}</p>
            <button onClick={onClick} className="mt-4 text-sm font-bold text-primary hover:text-primary-hover self-start group/button">
                {buttonText} <span className="transition-transform transform group-hover/button:translate-x-1 inline-block">&rarr;</span>
            </button>
        </div>
    </div>
);

export default WellnessDashboard;