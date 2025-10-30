
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface UserProfileSetupProps {
  onSubmit: (profile: UserProfile) => void;
}

const UserProfileSetup: React.FC<UserProfileSetupProps> = ({ onSubmit }) => {
  const [profile, setProfile] = useState<UserProfile>({
    age: 30,
    weight: 70,
    height: 175,
    activityLevel: 'moderate',
    goal: 'maintain_weight',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' || name === 'height' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  const inputClasses = "w-full bg-brand-surface border border-brand-primary/50 rounded-lg p-3 text-brand-text placeholder-brand-text-muted focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all";
  const labelClasses = "block text-sm font-medium text-brand-secondary mb-2";

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-brand-surface rounded-2xl shadow-2xl shadow-brand-primary/10 p-8 border border-brand-primary/20">
        <h1 className="text-3xl font-bold text-center text-brand-text mb-2">Welcome to NutriGuide</h1>
        <p className="text-center text-brand-text-muted mb-8">Create your Body Blueprint to start simulating.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="age" className={labelClasses}>Age</label>
              <input type="number" id="age" name="age" value={profile.age} onChange={handleChange} className={inputClasses} required />
            </div>
            <div>
              <label htmlFor="weight" className={labelClasses}>Weight (kg)</label>
              <input type="number" id="weight" name="weight" value={profile.weight} onChange={handleChange} className={inputClasses} required />
            </div>
            <div>
              <label htmlFor="height" className={labelClasses}>Height (cm)</label>
              <input type="number" id="height" name="height" value={profile.height} onChange={handleChange} className={inputClasses} required />
            </div>
          </div>
          
          <div>
            <label htmlFor="activityLevel" className={labelClasses}>Activity Level</label>
            <select id="activityLevel" name="activityLevel" value={profile.activityLevel} onChange={handleChange} className={inputClasses} required>
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="active">Active</option>
              <option value="very_active">Very Active</option>
            </select>
          </div>

          <div>
            <label htmlFor="goal" className={labelClasses}>Primary Goal</label>
            <select id="goal" name="goal" value={profile.goal} onChange={handleChange} className={inputClasses} required>
              <option value="lose_weight">Lose Weight</option>
              <option value="maintain_weight">Maintain Weight</option>
              <option value="gain_muscle">Gain Muscle</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-brand-primary hover:bg-opacity-80 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-primary/50">
            Start Simulation
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileSetup;
