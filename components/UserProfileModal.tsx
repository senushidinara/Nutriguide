import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X } from './icons';

interface UserProfileModalProps {
  onSubmit: (profile: UserProfile) => void;
  onClose: () => void;
  currentUserProfile: UserProfile;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ onSubmit, onClose, currentUserProfile }) => {
  const [profile, setProfile] = useState<UserProfile>(currentUserProfile);

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
    <div 
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-surface rounded-2xl shadow-2xl shadow-slate-300/60 border border-border-color w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-background">
          <X className="w-5 h-5 text-text-muted" />
        </button>

        <div className="p-8">
            <h1 className="text-3xl font-bold text-center text-secondary mb-2">Update Your Blueprint</h1>
            <p className="text-center text-text-secondary mb-8">Keep your profile current for accurate simulations.</p>
            
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
                Save Changes
            </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
