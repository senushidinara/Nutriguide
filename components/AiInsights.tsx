import React from 'react';
import { SimulationResult } from '../types';
import { Sparkles, BarChart, Smile, FlaskConical, CalendarClock } from './icons';

interface AiInsightsProps {
    insights: SimulationResult['insights'];
    suggestion: SimulationResult['meal_alchemy_suggestion'];
    forecast: SimulationResult['metabolic_forecast_weekly'];
}

const InsightCard: React.FC<{icon: React.ComponentType<{className?: string}>, title: string, children: React.ReactNode, titleColor: string}> = ({ icon: Icon, title, children, titleColor }) => (
    <div className="bg-background p-6 rounded-xl h-full border border-border-color">
        <div className="flex items-center gap-3 mb-3">
            <Icon className={`w-6 h-6 ${titleColor}`} />
            <h4 className={`text-lg font-bold ${titleColor}`}>{title}</h4>
        </div>
        <p className="text-text-secondary text-sm md:text-base">
            {children}
        </p>
    </div>
);


const AiInsights: React.FC<AiInsightsProps> = ({ insights, suggestion, forecast }) => {
  return (
    <div className="bg-surface rounded-2xl p-6 border border-border-color shadow-lg shadow-slate-200/50">
        <div className="flex items-center gap-4 mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold text-secondary">AI Insights & Recommendations</h2>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightCard icon={BarChart} title="Short-Term Impact" titleColor="text-primary">
                {insights.short_term}
            </InsightCard>

            <InsightCard icon={CalendarClock} title="Long-Term Potential" titleColor="text-primary">
                {insights.long_term}
            </InsightCard>

            <InsightCard icon={Smile} title="Mood Impact" titleColor="text-primary">
                {insights.mood_impact}
            </InsightCard>

            <InsightCard icon={BarChart} title="Weekly Metabolic Forecast" titleColor="text-primary">
                {forecast}
            </InsightCard>

            <div className="md:col-span-2 bg-gradient-to-br from-primary to-emerald-700 text-white p-6 rounded-xl relative shadow-lg shadow-primary/20">
                 <div className="flex items-center gap-3 mb-3">
                    <FlaskConical className="w-6 h-6 text-accent" />
                    <h4 className="text-lg font-bold text-white">{suggestion.title}</h4>
                </div>
                <p className="font-semibold text-accent mb-2">{suggestion.combo}</p>
                <p className="text-emerald-100 text-sm md:text-base">{suggestion.reasoning}</p>
            </div>
        </div>
    </div>
  );
};

export default AiInsights;
