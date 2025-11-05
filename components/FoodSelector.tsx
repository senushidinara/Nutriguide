import React, { useState, useMemo } from 'react';
import { FoodItem } from '../types';

const foodList: Omit<FoodItem, 'quantity' | 'unit'>[] = [
  // Proteins
  { id: 'chicken', name: 'Chicken Breast', emoji: '🍗', category: 'protein', imageUrl: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 165, protein: 31, carbohydrates: 0, fat: 3.6 } },
  { id: 'salmon', name: 'Salmon Fillet', emoji: '🍣', category: 'protein', imageUrl: 'https://images.pexels.com/photos/327158/pexels-photo-327158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 208, protein: 20, carbohydrates: 0, fat: 13 } },
  { id: 'steak', name: 'Sirloin Steak', emoji: '🥩', category: 'protein', imageUrl: 'https://images.pexels.com/photos/7627422/pexels-photo-7627422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 271, protein: 25, carbohydrates: 0, fat: 19 } },
  { id: 'eggs', name: 'Eggs', emoji: '🥚', category: 'protein', imageUrl: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 155, protein: 13, carbohydrates: 1.1, fat: 11 } },
  { id: 'tofu', name: 'Firm Tofu', emoji: '⬜️', category: 'protein', imageUrl: 'https://images.pexels.com/photos/5945846/pexels-photo-5945846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 76, protein: 8, carbohydrates: 1.9, fat: 4.8 } },
  // Carbohydrates
  { id: 'sweet_potato', name: 'Sweet Potato', emoji: '🍠', category: 'carbohydrate', imageUrl: 'https://images.pexels.com/photos/13063364/pexels-photo-13063364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 86, protein: 1.6, carbohydrates: 20, fat: 0.1 } },
  { id: 'white_pasta', name: 'Pasta', emoji: '🍝', category: 'carbohydrate', imageUrl: 'https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 131, protein: 5, carbohydrates: 25, fat: 1.1 } },
  // Grains
  { id: 'brown_rice', name: 'Brown Rice', emoji: '🍚', category: 'grain', imageUrl: 'https://images.pexels.com/photos/236757/pexels-photo-236757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 111, protein: 2.6, carbohydrates: 23, fat: 0.9 } },
  { id: 'quinoa', name: 'Quinoa', emoji: '🌾', category: 'grain', imageUrl: 'https://images.pexels.com/photos/4397730/pexels-photo-4397730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 120, protein: 4.1, carbohydrates: 21, fat: 1.9 } },
  { id: 'oats', name: 'Rolled Oats', emoji: '🥣', category: 'grain', imageUrl: 'https://images.pexels.com/photos/2103949/pexels-photo-2103949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 389, protein: 16.9, carbohydrates: 66, fat: 6.9 } },
  // Legumes
  { id: 'lentils', name: 'Lentils', emoji: '🍲', category: 'legume', imageUrl: 'https://images.pexels.com/photos/1055271/pexels-photo-1055271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 116, protein: 9, carbohydrates: 20, fat: 0.4 } },
  { id: 'chickpeas', name: 'Chickpeas', emoji: '🧆', category: 'legume', imageUrl: 'https://images.pexels.com/photos/5637604/pexels-photo-5637604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 164, protein: 8.9, carbohydrates: 27, fat: 2.6 } },
  // Vegetables
  { id: 'broccoli', name: 'Broccoli', emoji: '🥦', category: 'vegetable', imageUrl: 'https://images.pexels.com/photos/4054432/pexels-photo-4054432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 55, protein: 3.7, carbohydrates: 11, fat: 0.6 } },
  { id: 'spinach', name: 'Spinach', emoji: '🥬', category: 'vegetable', imageUrl: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 23, protein: 2.9, carbohydrates: 3.6, fat: 0.4 } },
  { id: 'bell_pepper', name: 'Bell Pepper', emoji: '🫑', category: 'vegetable', imageUrl: 'https://images.pexels.com/photos/949194/pexels-photo-949194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 31, protein: 1, carbohydrates: 6, fat: 0.3 } },
  // Fruits
  { id: 'apple', name: 'Apple', emoji: '🍎', category: 'fruit', imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 52, protein: 0.3, carbohydrates: 14, fat: 0.2 } },
  { id: 'banana', name: 'Banana', emoji: '🍌', category: 'fruit', imageUrl: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 89, protein: 1.1, carbohydrates: 23, fat: 0.3 } },
  // Fats
  { id: 'avocado', name: 'Avocado', emoji: '🥑', category: 'fat', imageUrl: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 160, protein: 2, carbohydrates: 9, fat: 15 } },
  { id: 'almonds', name: 'Almonds', emoji: '🌰', category: 'fat', imageUrl: 'https://images.pexels.com/photos/4113936/pexels-photo-4113936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 579, protein: 21, carbohydrates: 22, fat: 49 } },
  // Dairy
  { id: 'greek_yogurt', name: 'Greek Yogurt', emoji: '🥛', category: 'dairy', imageUrl: 'https://images.pexels.com/photos/4044991/pexels-photo-4044991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', nutrition: { calories: 59, protein: 10, carbohydrates: 3.6, fat: 0.4 } },
];


interface FoodSelectorProps {
  onSelectFood: (food: Omit<FoodItem, 'quantity' | 'unit'>) => void;
}

const FoodSelector: React.FC<FoodSelectorProps> = ({ onSelectFood }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFoods = useMemo(() => {
    if (!searchTerm) {
        return foodList;
    }
    return foodList.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const categorizedFoods = useMemo(() => {
    return filteredFoods.reduce((acc, food) => {
      const { category } = food;
      if (!acc[category]) acc[category] = [];
      acc[category].push(food);
      return acc;
    }, {} as Record<FoodItem['category'], Omit<FoodItem, 'quantity' | 'unit'>[]>);
  }, [filteredFoods]);


  const categoryOrder: FoodItem['category'][] = ['protein', 'carbohydrate', 'grain', 'legume', 'vegetable', 'fruit', 'fat', 'dairy', 'other'];

  return (
    <div className="bg-surface rounded-2xl shadow-lg shadow-slate-200/50 h-full flex flex-col overflow-hidden border border-border-color">
        <div className="p-4 border-b border-border-color flex-shrink-0">
             <h2 className="text-xl font-bold text-secondary mb-3">Nutrient Library</h2>
             <input
                type="search"
                placeholder="Search for a food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-background border border-border-color rounded-lg p-2.5 text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
             />
        </div>
        <div className="flex-grow overflow-y-auto p-4">
        {categoryOrder.map(category => (
        categorizedFoods[category] && (
            <div key={category} className="mb-6">
            <h3 className="text-sm font-bold text-primary capitalize sticky top-0 bg-surface/80 backdrop-blur-sm py-2 z-10 -mx-4 px-4 border-b border-t border-border-color">{category.replace('_', ' ')}s</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                {categorizedFoods[category].map(food => (
                    <button
                      key={food.id}
                      onClick={() => onSelectFood(food)}
                      className="group relative aspect-square bg-slate-100 rounded-lg overflow-hidden border border-border-color hover:border-primary/80 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/60 ring-offset-2 ring-offset-surface"
                    >
                      <img
                          src={food.imageUrl}
                          alt={food.name}
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute inset-0 p-2 flex flex-col justify-end text-left">
                          <p className="font-bold text-white text-sm drop-shadow-md">{food.name}</p>
                      </div>
                       <div className="absolute top-2 right-2 text-2xl drop-shadow-lg transition-transform duration-300 group-hover:scale-125">{food.emoji}</div>
                    </button>
                ))}
            </div>
            </div>
        )
        ))}
        {filteredFoods.length === 0 && (
            <div className="text-center py-10">
                <p className="text-text-secondary">No food found for "{searchTerm}"</p>
            </div>
        )}
        </div>
    </div>
  );
};

export default FoodSelector;
