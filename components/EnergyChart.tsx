import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SimulationTimelinePoint } from '../types';

interface EnergyChartProps {
  data: SimulationTimelinePoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface/80 backdrop-blur-sm p-4 border border-border-color rounded-lg shadow-lg">
        <p className="font-bold text-text-primary mb-2">{`Hour: ${label}`}</p>
        {payload.map((pld: any) => (
            <div key={pld.dataKey} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: pld.stroke}}></span>
                    <span className="text-text-secondary">{pld.name}</span>
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
      <h3 className="text-xl font-bold text-secondary mb-4">24-Hour Energy Forecast</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#059669', strokeWidth: 1, strokeDasharray: '3 3' }}/>
            <Legend wrapperStyle={{fontSize: "14px", paddingTop: "10px", color: '#475569'}} />
            <Line type="monotone" dataKey="physical_energy" name="Physical Energy" stroke="#059669" strokeWidth={3} dot={false} activeDot={{ r: 6 }} isAnimationActive={true} animationDuration={1000} />
            <Line type="monotone" dataKey="cognitive_focus" name="Cognitive Focus" stroke="#06b6d4" strokeWidth={3} dot={false} activeDot={{ r: 6 }} isAnimationActive={true} animationDuration={1000} animationBegin={200} />
            <Line type="monotone" dataKey="emotional_stability" name="Emotional Stability" stroke="#8b5cf6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} isAnimationActive={true} animationDuration={1000} animationBegin={400} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default EnergyChart;
