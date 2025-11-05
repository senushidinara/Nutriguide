import React from 'react';
import { Trophy, Shield, Zap, CalendarClock } from './icons';

interface CommunityProps {
    currentFont: 'font-sans' | 'font-serif';
}

const achievements = [
    { icon: Zap, title: "Simulation Pioneer", description: "Run your first 10 meal simulations.", progress: 10, goal: 10 },
    { icon: Trophy, title: "Wellness Warrior", description: "Achieve a wellness score of 90+.", progress: 1, goal: 1 },
    { icon: CalendarClock, title: "Consistent Composer", description: "Log a meal for 7 days in a row.", progress: 4, goal: 7 },
    { icon: Shield, title: "Macro Master", description: "Hit your daily macro targets perfectly.", progress: 0, goal: 1 },
];

const leaderboard = [
    { rank: 1, name: "Alex G.", score: 2450, avatar: 'A' },
    { rank: 2, name: "You", score: 2210, avatar: 'Y' },
    { rank: 3, name: "Brenda M.", score: 2180, avatar: 'B' },
    { rank: 4, name: "Carlos R.", score: 2050, avatar: 'C' },
];

const Community: React.FC<CommunityProps> = ({ currentFont }) => {
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
                        <AchievementCard key={index} {...ach} />
                    ))}
                </div>
            </div>

            <div>
                <h2 className={`text-2xl font-bold text-secondary mb-4 ${currentFont}`}>Weekly Leaderboard</h2>
                <div className="bg-surface rounded-2xl p-6 border border-border-color shadow-lg shadow-slate-200/50">
                    <ul className="space-y-3">
                        {leaderboard.map((user) => (
                            <LeaderboardItem key={user.rank} {...user} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

interface AchievementCardProps {
    icon: React.FC<{className?: string}>;
    title: string;
    description: string;
    progress: number;
    goal: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ icon: Icon, title, description, progress, goal }) => {
    const isCompleted = progress >= goal;
    const progressPercent = Math.min((progress / goal) * 100, 100);

    return (
        <div className={`bg-surface p-5 rounded-2xl border ${isCompleted ? 'border-primary' : 'border-border-color'} shadow-lg shadow-slate-200/50 transition-all`}>
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
        </div>
    );
};

interface LeaderboardItemProps {
    rank: number;
    name: string;
    score: number;
    avatar: string;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ rank, name, score, avatar }) => {
    const isYou = name === "You";
    return (
        <li className={`flex items-center p-3 rounded-lg ${isYou ? 'bg-accent/60' : 'bg-background'}`}>
            <span className="text-lg font-extrabold w-8 text-center text-primary">{rank}</span>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${isYou ? 'bg-primary' : 'bg-slate-400'} mx-4`}>
                {avatar}
            </div>
            <span className={`font-bold ${isYou ? 'text-secondary' : 'text-text-primary'}`}>{name}</span>
            <span className="ml-auto font-bold text-primary">{score} pts</span>
        </li>
    );
};

export default Community;