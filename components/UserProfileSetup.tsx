import React, { useState } from 'react';
import { UserProfile } from '../types';

interface UserProfileSetupProps {
  onSubmit: (profile: UserProfile) => void;
}

const UserProfileSetup: React.FC<UserProfileSetupProps> = ({ onSubmit }) => {
  // FIX: Initialize UserProfile with all required fields to match the type definition.
  const [profile, setProfile] = useState<UserProfile>({
    age: 30,
    weight: 70,
    height: 175,
    activityLevel: 'moderate',
    goal: 'maintain_weight',
    geneticsDataStatus: 'not_connected',
    microbiomeDataStatus: 'not_connected',
    wearableStatus: 'not_connected',
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

  const inputClasses = "w-full bg-background border border-border-color rounded-lg p-3 text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all";
  const labelClasses = "block text-sm font-medium text-text-secondary mb-2";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-surface rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-border-color">
        <h1 className="text-3xl font-bold text-center text-secondary mb-2">Welcome to NutriGuide AI</h1>
        <p className="text-center text-text-secondary mb-8">Create your Body Blueprint. This personalized digital model of your metabolism allows us to simulate your body's unique response to any meal.</p>
        
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

          <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50">
            Create My Blueprint
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileSetup;