import React, { useState } from 'react';
import { UserProfile, FoodItem } from '../types';

interface UserProfileSetupProps {
  onSubmit: (profile: UserProfile) => void;
}

const foodCategories = {
  'Proteins': [
    { name: 'Chicken Breast', description: 'Lean & protein-rich', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&q=80' },
    { name: 'Salmon', description: 'Omega-3 powerhouse', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80' },
    { name: 'Steak', description: 'Premium beef selection', image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&q=80' },
    { name: 'Eggs', description: 'Natural energy source', image: 'https://images.unsplash.com/photo-1590965294002-b280ce60bce4?w=600&q=80' },
    { name: 'Tofu', description: 'Plant-based protein', image: 'https://images.unsplash.com/photo-1585238341710-4ef8f5ecbfce?w=600&q=80' },
  ],
  'Grains & Carbs': [
    { name: 'Brown Rice', description: 'Whole grain nutrition', image: 'https://images.unsplash.com/photo-1586080872051-f43257c08245?w=600&q=80' },
    { name: 'Sweet Potato', description: 'Complex carbohydrates', image: 'https://images.unsplash.com/photo-1585518419759-bfb5dafd4c09?w=600&q=80' },
    { name: 'Quinoa', description: 'Complete protein grain', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80' },
    { name: 'Oats', description: 'Morning energy bowl', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80' },
  ],
  'Vegetables & Fruits': [
    { name: 'Broccoli', description: 'Nutrient dense green', image: 'https://images.unsplash.com/photo-1557804506-669714f604fd?w=600&q=80' },
    { name: 'Spinach', description: 'Iron-rich leafy green', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
    { name: 'Carrots', description: 'Beta-carotene rich', image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd94548?w=600&q=80' },
    { name: 'Apple', description: 'Fresh organic fruit', image: 'https://images.unsplash.com/photo-1560806674-d257a3a33f64?w=600&q=80' },
  ],
  'Healthy Fats': [
    { name: 'Avocado', description: 'Creamy superfood', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&q=80' },
    { name: 'Cheese', description: 'Premium dairy selection', image: 'https://images.unsplash.com/photo-1589985621498-d5e65d0e4b6c?w=600&q=80' },
    { name: 'Greek Yogurt', description: 'Protein-rich dairy', image: 'https://images.unsplash.com/photo-1488477181946-85a2138e7e66?w=600&q=80' },
  ]
};

const UserProfileSetup: React.FC<UserProfileSetupProps> = ({ onSubmit }) => {
  const [profile, setProfile] = useState<UserProfile>({
    age: 30,
    weight: 70,
    height: 175,
    activityLevel: 'moderate',
    goal: 'maintain_weight',
  });

  const [activeCategory, setActiveCategory] = useState<string>('Proteins');

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

  const inputClasses = "w-full bg-brand-surface/40 border border-brand-primary/30 rounded-lg p-3 text-brand-text placeholder-brand-text-muted focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all";
  const labelClasses = "block text-xs font-semibold text-brand-secondary mb-2 uppercase tracking-wider";

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg p-4 py-8 animate-fade-in">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side - Profile Setup */}
        <div className="flex flex-col justify-center">
          <div className="bg-brand-surface/40 backdrop-blur-xl rounded-2xl shadow-2xl shadow-brand-primary/10 p-8 border border-brand-primary/20">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-brand-text mb-2">NutriGuide</h1>
              <p className="text-brand-text-muted">Your personalized nutrition companion</p>
              <div className="h-1 w-16 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full mt-4"></div>
            </div>
            
            <p className="text-sm text-brand-text-muted mb-6">Create your body blueprint to unlock personalized meal insights</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-3 gap-3">
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

              <button 
                type="submit" 
                className="w-full mt-8 bg-gradient-to-r from-brand-primary to-brand-accent hover:shadow-xl hover:shadow-brand-primary/40 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-primary/50 uppercase tracking-wider text-sm"
              >
                Begin Your Journey
              </button>
            </form>
          </div>
        </div>

        {/* Right Side - Luxurious Menu */}
        <div className="flex flex-col">
          <div className="bg-brand-surface/40 backdrop-blur-xl rounded-2xl shadow-2xl shadow-brand-primary/10 p-8 border border-brand-primary/20 h-full flex flex-col">
            
            {/* Menu Header */}
            <div className="mb-8 text-center border-b border-brand-primary/20 pb-6">
              <div className="text-4xl mb-2">🌟</div>
              <h2 className="text-3xl font-bold text-brand-text">Culinary Selection</h2>
              <p className="text-sm text-brand-accent mt-2 italic">Explore our premium nutrition menu</p>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {Object.keys(foodCategories).map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-lg'
                      : 'bg-brand-bg/40 text-brand-text-muted hover:text-brand-accent'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="grid grid-cols-1 gap-4">
                {foodCategories[activeCategory as keyof typeof foodCategories]?.map((item, index) => (
                  <div
                    key={index}
                    className="group flex gap-4 p-4 rounded-xl bg-brand-bg/30 hover:bg-brand-bg/60 border border-brand-primary/10 hover:border-brand-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-accent/20"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-bold text-brand-text text-sm">{item.name}</h3>
                        <p className="text-xs text-brand-text-muted mt-1">{item.description}</p>
                      </div>
                      <div className="text-xs text-brand-accent font-semibold">Premium Selection</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Menu Footer */}
            <div className="mt-6 pt-4 border-t border-brand-primary/20 text-center text-xs text-brand-text-muted italic">
              Curated for your optimal health
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSetup;
