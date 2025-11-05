
import React from 'react';
import { Trophy, Shield, Zap, CalendarClock } from './icons';
import { Achievement, LeaderboardUser } from '../types';

interface CommunityProps {
    currentFont: 'font-sans' | 'font-serif';
    onAchievementClick: (achievement: Achievement) => void;
    onProfileClick: (user: LeaderboardUser) => void;
}

const achievements: Achievement[] = [
    { icon: Zap, title: "Simulation Pioneer", description: "Run your first 10 meal simulations.", progress: 10, goal: 10, reward: "Unlocks 'Pro' simulation insights." },
    { icon: Trophy, title: "Wellness Warrior", description: "Achieve a wellness score of 90+.", progress: 1, goal: 1, reward: "Golden profile badge." },
    { icon: CalendarClock, title: "Consistent Composer", description: "Log a meal for 7 days in a row.", progress: 4, goal: 7, reward: "Exclusive 'Solaris' app theme." },
    { icon: Shield, title: "Macro Master", description: "Hit your daily macro targets perfectly.", progress: 0, goal: 1, reward: "Advanced macro-nutrient planner." },
];

const leaderboard: LeaderboardUser[] = [
    { rank: 1, name: "Alex G.", score: 2450, avatar: 'A', trend: 'up', lastMealScore: 92 },
    { rank: 2, name: "You", score: 2210, avatar: 'Y', trend: 'stable', lastMealScore: 88 },
    { rank: 3, name: "Brenda M.", score: 2180, avatar: 'B', trend: 'down', lastMealScore: 76 },
    { rank: 4, name: "Carlos R.", score: 2050, avatar: 'C', trend: 'up', lastMealScore: 95 },
];

const Community: React.FC<CommunityProps> = ({ currentFont, onAchievementClick, onProfileClick }) => {
    return (
        <div className="animate-fade-in space-y-8">
            <header>
                <h1 className={`text-4xl font-bold text-secondary ${currentFont}`}>Community & Achievements</h1>
                <p className="text-text-secondary mt-1">Stay motivated, track your progress, and see how you stack up.</p>
            </header>

            <div>
                <h2 className={`text-2xl font-bold text-secondary mb-4 ${currentFont}`}>My Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((ach, index) => (
                        <AchievementCard key={index} achievement={ach} onClick={() => onAchievementClick(ach)} />
                    ))}
                </div>
            </div>

            <div>
                <h2 className={`text-2xl font-bold text-secondary mb-4 ${currentFont}`}>Weekly Leaderboard</h2>
                <div className="bg-surface rounded-2xl p-6 border border-border-color shadow-lg shadow-slate-200/50">
                    <ul className="space-y-3">
                        {leaderboard.map((user) => (
                            <LeaderboardItem key={user.rank} user={user} onClick={() => onProfileClick(user)} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const AchievementCard: React.FC<{ achievement: Achievement, onClick: () => void }> = ({ achievement, onClick }) => {
    const { icon: Icon, title, description, progress, goal } = achievement;
    const isCompleted = progress >= goal;
    const progressPercent = Math.min((progress / goal) * 100, 100);

    return (
        <button onClick={onClick} className={`w-full text-left bg-surface p-5 rounded-2xl border ${isCompleted ? 'border-primary' : 'border-border-color'} shadow-lg shadow-slate-200/50 transition-all transform hover:-translate-y-1 hover:shadow-primary/20`}>
            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${isCompleted ? 'bg-primary text-white' : 'bg-accent/50 text-primary'}`}>
                    <Icon className="w-7 h-7" />
                </div>
                <div>
                    <h3 className={`font-bold ${isCompleted ? 'text-primary' : 'text-text-primary'}`}>{title}</h3>
                    <p className="text-sm text-text-secondary mt-1">{description}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex justify-between items-baseline text-sm mb-1">
                    <span className="font-medium text-text-secondary">Progress</span>
                    <span className="font-bold text-primary">{progress} / {goal}</span>
                </div>
                <div className="w-full h-2.5 bg-background rounded-full">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progressPercent}%`}}></div>
                </div>
            </div>
        </button>
    );
};

const LeaderboardItem: React.FC<{ user: LeaderboardUser, onClick: () => void }> = ({ user, onClick }) => {
    const { rank, name, score, avatar } = user;
    const isYou = name === "You";
    return (
        <li>
            <button onClick={onClick} className={`w-full text-left flex items-center p-3 rounded-lg transition-colors ${isYou ? 'bg-accent/60' : 'bg-background hover:bg-slate-200/50'}`}>
                <span className="text-lg font-extrabold w-8 text-center text-primary">{rank}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${isYou ? 'bg-primary' : 'bg-slate-400'} mx-4`}>
                    {avatar}
                </div>
                <span className={`font-bold ${isYou ? 'text-secondary' : 'text-text-primary'}`}>{name}</span>
                <span className="ml-auto font-bold text-primary">{score} pts</span>
            </button>
        </li>
    );
};

export default Community;
