import React from 'react';
import { FoodItem } from '../types';

const foodList: Omit<FoodItem, 'quantity' | 'unit'>[] = [
  { id: 'chicken', name: 'Chicken Breast', emoji: '🍗', category: 'protein', imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 165, protein: 31, carbohydrates: 0, fat: 3.6 } },
  { id: 'salmon', name: 'Salmon', emoji: '🍣', category: 'protein', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 208, protein: 20, carbohydrates: 0, fat: 13 } },
  { id: 'steak', name: 'Steak', emoji: '🥩', category: 'protein', imageUrl: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 271, protein: 25, carbohydrates: 0, fat: 19 } },
  { id: 'eggs', name: 'Eggs', emoji: '🥚', category: 'protein', imageUrl: 'https://images.unsplash.com/photo-1590965294002-b280ce60bce4?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 155, protein: 13, carbohydrates: 1.1, fat: 11 } },
  { id: 'tofu', name: 'Tofu', emoji: '⬜️', category: 'protein', imageUrl: 'https://images.unsplash.com/photo-1585238341710-4ef8f5ecbfce?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 76, protein: 8, carbohydrates: 1.9, fat: 4.8 } },
  { id: 'brown_rice', name: 'Brown Rice', emoji: '🍚', category: 'carbohydrate', imageUrl: 'https://images.unsplash.com/photo-1586080872051-f43257c08245?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 111, protein: 2.6, carbohydrates: 23, fat: 0.9 } },
  { id: 'sweet_potato', name: 'Sweet Potato', emoji: '🍠', category: 'carbohydrate', imageUrl: 'https://images.unsplash.com/photo-1585518419759-bfb5dafd4c09?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 86, protein: 1.6, carbohydrates: 20, fat: 0.1 } },
  { id: 'quinoa', name: 'Quinoa', emoji: '🌾', category: 'grain', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 120, protein: 4.1, carbohydrates: 21, fat: 1.9 } },
  { id: 'oats', name: 'Oats', emoji: '🥣', category: 'grain', imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 389, protein: 16.9, carbohydrates: 66, fat: 6.9 } },
  { id: 'lentils', name: 'Lentils', emoji: '🍲', category: 'legume', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 116, protein: 9, carbohydrates: 20, fat: 0.4 } },
  { id: 'chickpeas', name: 'Chickpeas', emoji: '🧆', category: 'legume', imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 164, protein: 8.9, carbohydrates: 27, fat: 2.6 } },
  { id: 'apple', name: 'Apple', emoji: '🍎', category: 'fruit', imageUrl: 'https://images.unsplash.com/photo-1560806674-d257a3a33f64?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 52, protein: 0.3, carbohydrates: 14, fat: 0.2 } },
  { id: 'broccoli', name: 'Broccoli', emoji: '🥦', category: 'vegetable', imageUrl: 'https://images.unsplash.com/photo-1557804506-669714f604fd?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 55, protein: 3.7, carbohydrates: 11, fat: 0.6 } },
  { id: 'spinach', name: 'Spinach', emoji: '🥬', category: 'vegetable', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 23, protein: 2.9, carbohydrates: 3.6, fat: 0.4 } },
  { id: 'carrots', name: 'Carrots', emoji: '🥕', category: 'vegetable', imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd94548?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 41, protein: 0.9, carbohydrates: 10, fat: 0.2 } },
  { id: 'avocado', name: 'Avocado', emoji: '🥑', category: 'fat', imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 160, protein: 2, carbohydrates: 9, fat: 15 } },
  { id: 'cheese', name: 'Cheese', emoji: '🧀', category: 'fat', imageUrl: 'https://images.unsplash.com/photo-1589985621498-d5e65d0e4b6c?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 402, protein: 25, carbohydrates: 1.3, fat: 33 } },
  { id: 'greek_yogurt', name: 'Greek Yogurt', emoji: '🥛', category: 'dairy', imageUrl: 'https://images.unsplash.com/photo-1488477181946-85a2138e7e66?w=800&q=80&auto=format&fit=crop', nutrition: { calories: 59, protein: 10, carbohydrates: 3.6, fat: 0.4 } },
];

interface FoodSelectorProps {
  onSelectFood: (food: Omit<FoodItem, 'quantity' | 'unit'>) => void;
}

const FoodSelector: React.FC<FoodSelectorProps> = ({ onSelectFood }) => {
  const categorizedFoods = foodList.reduce((acc, food) => {
    const { category } = food;
    if (!acc[category]) acc[category] = [];
    acc[category].push(food);
    return acc;
  }, {} as Record<FoodItem['category'], Omit<FoodItem, 'quantity' | 'unit'>[]>);

  const categoryOrder: FoodItem['category'][] = ['protein', 'carbohydrate', 'grain', 'legume', 'vegetable', 'fruit', 'fat', 'dairy', 'other'];

  return (
    <div className="bg-brand-surface/60 backdrop-blur-xl border border-brand-primary/20 rounded-2xl shadow-2xl shadow-brand-primary/10 h-full flex flex-col overflow-hidden">
        <div className="p-6 border-b border-brand-primary/10 flex-shrink-0 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10">
             <h2 className="text-2xl font-bold text-brand-secondary">✨ Nutrient Library</h2>
             <p className="text-sm text-brand-text-muted mt-1">Explore & select foods to build your meal</p>
        </div>
        <div className="flex-grow overflow-y-auto p-6">
        {categoryOrder.map((category, categoryIndex) => (
        categorizedFoods[category] && (
            <div key={category} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-6 bg-gradient-to-r from-brand-accent to-brand-primary rounded-full"></div>
              <h3 className="text-lg font-bold text-brand-accent capitalize">{category.replace('_', ' ')}</h3>
              <span className="text-xs text-brand-text-muted ml-auto">{categorizedFoods[category].length} items</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {categorizedFoods[category].map((food, foodIndex) => (
                    <button
                      key={food.id}
                      onClick={() => onSelectFood(food)}
                      className="group relative aspect-square bg-brand-bg/40 rounded-xl overflow-hidden border border-brand-primary/30 hover:border-brand-accent transition-all duration-400 focus:outline-none focus:ring-4 focus:ring-brand-accent/60 ring-offset-2 ring-offset-brand-surface hover:shadow-2xl hover:shadow-brand-accent/20"
                      style={{ animationDelay: `${(categoryIndex * 6 + foodIndex) * 30}ms` }}
                    >
                      <img
                          src={food.imageUrl}
                          alt={food.name}
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-120 group-hover:brightness-110 opacity-75 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300" />
                      <div className="absolute inset-0 p-3 flex flex-col justify-between">
                        <div className="text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xl drop-shadow-lg">{food.emoji}</span>
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm drop-shadow-lg leading-tight">{food.name}</p>
                          <p className="text-xs text-white/70 drop-shadow-lg mt-1">{food.nutrition.calories} cal</p>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 text-2xl opacity-100 group-hover:opacity-0 transition-opacity duration-300 drop-shadow-lg">{food.emoji}</div>
                    </button>
                ))}
            </div>
            </div>
        )
        ))}
        </div>
    </div>
  );
};

export default FoodSelector;
