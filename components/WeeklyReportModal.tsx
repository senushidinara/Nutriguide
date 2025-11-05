import React from 'react';
// FIX: Import BarChart from 'recharts' instead of './icons' to resolve a component prop type mismatch. The 'BarChart' from './icons' was an SVG icon, not the chart component.
import { Smile, Zap, X } from './icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, Cell, BarChart } from 'recharts';

const weeklyData = [
  { day: 'Mon', score: 75 },
  { day: 'Tue', score: 82 },
  { day: 'Wed', score: 78 },
  { day: 'Thu', score: 88 },
  { day: 'Fri', score: 91 },
  { day: 'Sat', score: 85 },
  { day: 'Sun', score: 89 },
];

const WeeklyReportModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-surface rounded-2xl shadow-2xl shadow-slate-300/60 border border-border-color w-full max-w-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-background z-10">
          <X className="w-5 h-5 text-text-muted" />
        </button>

        <div className="p-8">
            <h1 className="text-3xl font-bold text-center text-secondary mb-2">Your Weekly Report</h1>
            <p className="text-center text-text-secondary mb-8">An overview of your wellness trends and achievements.</p>
            
            <div className="h-64 w-full mb-8">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <XAxis dataKey="day" stroke="rgb(var(--color-text-muted))" axisLine={false} tickLine={false} />
                        <YAxis stroke="rgb(var(--color-text-muted))" axisLine={false} tickLine={false} domain={[0, 100]}/>
                        <Tooltip
                            cursor={{ fill: 'rgba(var(--color-primary), 0.1)' }}
                            contentStyle={{ 
                                background: 'rgb(var(--color-surface))',
                                border: '1px solid rgb(var(--color-border-color))',
                                borderRadius: '0.75rem'
                            }}
                        />
                        <Bar dataKey="score" name="Wellness Score" radius={[4, 4, 0, 0]}>
                             {weeklyData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill="rgba(var(--color-primary), 0.7)" />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-background p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-primary"/>
                        <h3 className="font-bold text-secondary">Energy Trend</h3>
                    </div>
                    <p className="text-sm text-text-secondary">Your energy levels have been consistently high, especially post-lunch, indicating good meal choices for sustained power.</p>
                </div>
                 <div className="bg-background p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <Smile className="w-5 h-5 text-primary"/>
                        <h3 className="font-bold text-secondary">Mood Stability</h3>
                    </div>
                    <p className="text-sm text-text-secondary">Emotional stability saw a 15% increase from the beginning of the week, suggesting better blood sugar regulation.</p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default WeeklyReportModal;