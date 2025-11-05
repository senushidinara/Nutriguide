import React from 'react';
import { Dna, Beaker, Zap, Shield } from './icons';

interface GeneticsMicrobiomeProps {
    onShowToast: (message: string) => void;
    currentFont: 'font-sans' | 'font-serif';
}

const GeneticsMicrobiome: React.FC<GeneticsMicrobiomeProps> = ({ onShowToast, currentFont }) => {
    return (
        <div className="animate-fade-in space-y-8">
            <header>
                <h1 className={`text-4xl font-bold text-secondary ${currentFont}`}>Hyper-Personalization</h1>
                <p className="text-text-secondary mt-1 max-w-2xl">Connect your genetic and microbiome data to unlock the next level of predictive accuracy and personalized insights.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DataCard
                    icon={Dna}
                    title="Genetic Blueprint"
                    description="Integrate your genetic markers to understand predispositions related to metabolism, nutrient processing, and food sensitivities. This allows for truly preventative recommendations."
                    status="not_connected"
                    onConnect={() => onShowToast('Genetic data integration is coming soon!')}
                    currentFont={currentFont}
                />
                <DataCard
                    icon={Beaker}
                    title="Microbiome Analysis"
                    description="Connect your gut microbiome data to fine-tune predictions based on how your unique gut bacteria impact digestion, inflammation, and even mood."
                    status="not_connected"
                    onConnect={() => onShowToast('Microbiome analysis is coming soon!')}
                    currentFont={currentFont}
                />
            </div>

            <div className="bg-surface p-8 rounded-2xl border border-border-color shadow-lg shadow-slate-200/50">
                <h3 className={`text-xl font-bold text-secondary mb-4 ${currentFont}`}>The Future of Nutrition</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-text-secondary">
                    <p>By combining your Body Blueprint with genetic and microbiome data, NutriGuide transitions from a powerful simulator into a predictive health guardian. This holistic view enables us to:</p>
                    <ul className="space-y-3">
                        <FeatureListItem icon={Zap} text="Proactively flag potential nutrient deficiencies." />
                        <FeatureListItem icon={Shield} text="Offer dietary adjustments to support long-term health goals." />
                        <FeatureListItem icon={Dna} text="Tailor insights with an unprecedented level of personal detail." />
                    </ul>
                </div>
                 <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                    <p><span className="font-bold">Privacy First:</span> Your health data is encrypted and secure. You have full control over what you share and can disconnect your data at any time.</p>
                </div>
            </div>
        </div>
    );
};

interface DataCardProps {
    icon: React.FC<{className?: string}>;
    title: string;
    description: string;
    status: 'connected' | 'not_connected' | 'pending';
    onConnect: () => void;
    currentFont: string;
}

const DataCard: React.FC<DataCardProps> = ({ icon: Icon, title, description, status, onConnect, currentFont }) => (
    <div className="bg-surface p-6 rounded-2xl border border-border-color shadow-lg shadow-slate-200/50 flex flex-col transition-transform transform hover:-translate-y-1">
        <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-accent/50 rounded-lg flex items-center justify-center">
                <Icon className="w-7 h-7 text-primary" />
            </div>
            <h2 className={`text-xl font-bold text-secondary ${currentFont}`}>{title}</h2>
        </div>
        <p className="text-text-secondary flex-grow mt-2">{description}</p>
        <button 
            onClick={onConnect}
            className="mt-6 w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-primary/50 transform hover:scale-105"
        >
            Connect Data
        </button>
    </div>
);

const FeatureListItem = ({ icon: Icon, text }: { icon: React.FC<{className?: string}>, text: string }) => (
    <li className="flex items-start gap-3">
        <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
        <span>{text}</span>
    </li>
);

export default GeneticsMicrobiome;