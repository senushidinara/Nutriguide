import React, { useState } from 'react';
import { UserProfile, FoodItem } from '../types';

interface UserProfileSetupProps {
  onSubmit: (profile: UserProfile) => void;
}

const foodCategories = {
  'Proteins': [
    { name: 'Grilled Chicken Breast', description: 'Succulent & lean protein perfection', image: 'https://images.pexels.com/photos/3639901/pexels-photo-3639901.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
    { name: 'Atlantic Salmon', description: 'Omega-3 rich, ocean-fresh premium', image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
    { name: 'Prime Beef Steak', description: 'Aged, marbled, championship cut', image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
    { name: 'Farm Fresh Eggs', description: 'Pastured, nutrient-dense golden yolks', image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
    { name: 'Silken Tofu', description: 'Plant-based protein excellence', image: 'https://images.pexels.com/photos/5281555/pexels-photo-5281555.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
  ],
  'Grains & Carbs': [
    { name: 'Organic Brown Rice', description: 'Nutty, whole grain essence', image: 'https://images.pexels.com/photos/5995872/pexels-photo-5995872.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
    { name: 'Japanese Sweet Potato', description: 'Creamy, naturally sweet treasure', image: 'https://images.pexels.com/photos/4210320/pexels-photo-4210320.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
    { name: 'Peruvian Quinoa', description: 'Ancient grain, complete amino acid', image: 'https://images.pexels.com/photos/6287159/pexels-photo-6287159.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
    { name: 'Scottish Oats', description: 'Premium morning energy source', image: 'https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
  ],
  'Garden Fresh': [
    { name: 'Organic Broccoli', description: 'Emerald cruciferous masterpiece', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
    { name: 'Baby Spinach', description: 'Iron-rich, tender leafy luxury', image: 'https://images.pexels.com/photos/3407700/pexels-photo-3407700.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
    { name: 'Heritage Carrots', description: 'Vibrant beta-carotene bounty', image: 'https://images.pexels.com/photos/6315175/pexels-photo-6315175.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
    { name: 'Organic Apples', description: 'Crisp, pesticide-free perfection', image: 'https://images.pexels.com/photos/162559/apple-fruit-red-fruit-162559.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
  ],
  'Premium Fats': [
    { name: 'California Avocado', description: 'Creamy superfood indulgence', image: 'https://images.pexels.com/photos/6287159/pexels-photo-6287159.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
    { name: 'Artisan Aged Cheese', description: 'Carefully crafted dairy excellence', image: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
    { name: 'Greek Yogurt Reserve', description: 'Creamy probiotic premium blend', image: 'https://images.pexels.com/photos/3534215/pexels-photo-3534215.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' },
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

  const inputClasses = "w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all backdrop-blur-sm";
  const labelClasses = "block text-xs font-semibold text-yellow-300 mb-2 uppercase tracking-widest";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-4 py-8 relative overflow-hidden">
      {/* Luxury background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        
        {/* Left Side - Profile Setup */}
        <div className="flex flex-col justify-center">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-yellow-500/20 p-8 border border-yellow-400/30">
            
            {/* Luxury header */}
            <div className="mb-8 pb-6 border-b border-yellow-400/30">
              <div className="text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-2">NutriGuide</div>
              <p className="text-yellow-200 text-sm italic font-light">Elevated Nutrition & Wellness</p>
            </div>
            
            <p className="text-white/70 text-sm mb-8 leading-relaxed">Craft your personalized wellness profile to unlock curated nutrition insights tailored to your unique physiology and aspirations.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  <option value="sedentary" className="bg-slate-900 text-white">Sedentary</option>
                  <option value="light" className="bg-slate-900 text-white">Lightly Active</option>
                  <option value="moderate" className="bg-slate-900 text-white">Moderately Active</option>
                  <option value="active" className="bg-slate-900 text-white">Active</option>
                  <option value="very_active" className="bg-slate-900 text-white">Very Active</option>
                </select>
              </div>

              <div>
                <label htmlFor="goal" className={labelClasses}>Primary Goal</label>
                <select id="goal" name="goal" value={profile.goal} onChange={handleChange} className={inputClasses} required>
                  <option value="lose_weight" className="bg-slate-900 text-white">Lose Weight</option>
                  <option value="maintain_weight" className="bg-slate-900 text-white">Maintain Weight</option>
                  <option value="gain_muscle" className="bg-slate-900 text-white">Gain Muscle</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full mt-8 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 hover:shadow-2xl hover:shadow-yellow-500/40 text-slate-900 font-bold py-4 px-4 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-500/50 uppercase tracking-widest text-sm font-serif drop-shadow-lg"
              >
                ✨ Begin Your Journey ✨
              </button>
            </form>
          </div>
        </div>

        {/* Right Side - Luxurious Menu */}
        <div className="flex flex-col">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-yellow-500/20 p-8 border border-yellow-400/30 h-full flex flex-col">
            
            {/* Menu Header */}
            <div className="mb-8 text-center border-b border-yellow-400/30 pb-6">
              <div className="text-5xl mb-3">🍽️</div>
              <h2 className="text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-2">Culinary Selections</h2>
              <p className="text-yellow-200 text-sm italic font-light">Discover our meticulously sourced premium ingredients</p>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-3">
              {Object.keys(foodCategories).map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/40 font-serif'
                      : 'bg-white/10 text-yellow-200 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="flex-1 overflow-y-auto pr-3 space-y-4">
              {foodCategories[activeCategory as keyof typeof foodCategories]?.map((item, index) => (
                <div
                  key={index}
                  className="group flex gap-4 p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 hover:from-yellow-500/10 hover:to-yellow-500/5 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/20 backdrop-blur-sm overflow-hidden"
                >
                  <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-lg ring-1 ring-yellow-400/30">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-120 brightness-90 group-hover:brightness-110"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=400';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-white group-hover:text-yellow-300 transition-colors">{item.name}</h3>
                      <p className="text-sm text-yellow-100/70 mt-1 italic font-light">{item.description}</p>
                    </div>
                    <div className="text-xs font-serif text-yellow-300 font-semibold uppercase tracking-wider">Premium Selection</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Menu Footer */}
            <div className="mt-6 pt-6 border-t border-yellow-400/30 text-center">
              <p className="text-xs text-yellow-200/60 italic font-light">Curated exclusively for your optimal vitality</p>
              <p className="text-yellow-400/70 text-xs mt-2">★ ★ ★</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSetup;
