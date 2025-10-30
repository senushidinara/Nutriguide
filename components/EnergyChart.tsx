import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SimulationTimelinePoint } from '../types';

interface EnergyChartProps {
  data: SimulationTimelinePoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-bg/80 backdrop-blur-sm p-4 border border-brand-primary/50 rounded-lg shadow-lg">
        <p className="font-bold text-brand-text mb-2">{`Hour: ${label}`}</p>
        {payload.map((pld: any) => (
            <div key={pld.dataKey} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: pld.stroke}}></span>
                    <span className="text-brand-text-muted">{pld.name}</span>
                </div>
                <span className="font-bold" style={{ color: pld.stroke }}>{pld.value}</span>
            </div>
        ))}
      </div>
    );
  }
  return null;
};

const EnergyChart: React.FC<EnergyChartProps> = ({ data }) => {
  const chartData = data.map(point => ({
    name: `${point.hour}h`,
    ...point
  }));

  return (
    <>
      <h3 className="text-xl font-bold text-brand-secondary mb-4">24-Hour Aura Forecast</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <XAxis dataKey="name" stroke="#A6A4B9" axisLine={false} tickLine={false} tick={{ fill: '#A6A4B9', fontSize: 12 }} />
            <YAxis stroke="#A6A4B9" axisLine={false} tickLine={false} tick={{ fill: '#A6A4B9', fontSize: 12 }} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#00F5D4', strokeWidth: 1, strokeDasharray: '3 3' }}/>
            <Legend wrapperStyle={{fontSize: "14px", paddingTop: "10px"}} />
            <Line type="monotone" dataKey="physical_energy" name="Physical Energy" stroke="#00F5D4" strokeWidth={3} dot={false} activeDot={{ r: 6 }} filter="url(#glow)" isAnimationActive={true} animationDuration={1000} />
            <Line type="monotone" dataKey="cognitive_focus" name="Cognitive Focus" stroke="#6A5AF9" strokeWidth={3} dot={false} activeDot={{ r: 6 }} filter="url(#glow)" isAnimationActive={true} animationDuration={1000} animationBegin={200} />
            <Line type="monotone" dataKey="emotional_stability" name="Emotional Stability" stroke="#A69EFF" strokeWidth={3} dot={false} activeDot={{ r: 6 }} filter="url(#glow)" isAnimationActive={true} animationDuration={1000} animationBegin={400} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default EnergyChart;