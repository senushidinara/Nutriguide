import React from 'react';
import { FoodItem } from '../types';

const foodList: Omit<FoodItem, 'quantity' | 'unit'>[] = [
  // Proteins
  { id: 'chicken', name: 'Chicken Breast', emoji: '🍗', category: 'protein', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/chicken-breast-1716245842299.png', nutrition: { calories: 165, protein: 31, carbohydrates: 0, fat: 3.6 } },
  { id: 'salmon', name: 'Salmon Fillet', emoji: '🍣', category: 'protein', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/salmon-1716245864506.png', nutrition: { calories: 208, protein: 20, carbohydrates: 0, fat: 13 } },
  { id: 'steak', name: 'Sirloin Steak', emoji: '🥩', category: 'protein', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/steak-1716245892598.png', nutrition: { calories: 271, protein: 25, carbohydrates: 0, fat: 19 } },
  { id: 'eggs', name: 'Eggs', emoji: '🥚', category: 'protein', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/eggs-1716245914930.png', nutrition: { calories: 155, protein: 13, carbohydrates: 1.1, fat: 11 } },
  { id: 'tofu', name: 'Firm Tofu', emoji: '⬜️', category: 'protein', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/tofu-1716245938835.png', nutrition: { calories: 76, protein: 8, carbohydrates: 1.9, fat: 4.8 } },
  // Carbohydrates
  { id: 'sweet_potato', name: 'Sweet Potato', emoji: '🍠', category: 'carbohydrate', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/sweet-potato-1716246029272.png', nutrition: { calories: 86, protein: 1.6, carbohydrates: 20, fat: 0.1 } },
  { id: 'white_pasta', name: 'Pasta', emoji: '🍝', category: 'carbohydrate', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/pasta-1716246303033.png', nutrition: { calories: 131, protein: 5, carbohydrates: 25, fat: 1.1 } },
  // Grains
  { id: 'brown_rice', name: 'Brown Rice', emoji: '🍚', category: 'grain', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/brown-rice-1716245973801.png', nutrition: { calories: 111, protein: 2.6, carbohydrates: 23, fat: 0.9 } },
  { id: 'quinoa', name: 'Quinoa', emoji: '🌾', category: 'grain', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/quinoa-1716246056340.png', nutrition: { calories: 120, protein: 4.1, carbohydrates: 21, fat: 1.9 } },
  { id: 'oats', name: 'Rolled Oats', emoji: '🥣', category: 'grain', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/oats-1716246080645.png', nutrition: { calories: 389, protein: 16.9, carbohydrates: 66, fat: 6.9 } },
  // Legumes
  { id: 'lentils', name: 'Lentils', emoji: '🍲', category: 'legume', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/lentils-1716246102611.png', nutrition: { calories: 116, protein: 9, carbohydrates: 20, fat: 0.4 } },
  { id: 'chickpeas', name: 'Chickpeas', emoji: '🧆', category: 'legume', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/chickpeas-1716246124441.png', nutrition: { calories: 164, protein: 8.9, carbohydrates: 27, fat: 2.6 } },
  // Vegetables
  { id: 'broccoli', name: 'Broccoli', emoji: '🥦', category: 'vegetable', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/broccoli-1716246190588.png', nutrition: { calories: 55, protein: 3.7, carbohydrates: 11, fat: 0.6 } },
  { id: 'spinach', name: 'Spinach', emoji: '🥬', category: 'vegetable', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/spinach-1716246214532.png', nutrition: { calories: 23, protein: 2.9, carbohydrates: 3.6, fat: 0.4 } },
  { id: 'bell_pepper', name: 'Bell Pepper', emoji: '🫑', category: 'vegetable', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/bell-pepper-1716246274021.png', nutrition: { calories: 31, protein: 1, carbohydrates: 6, fat: 0.3 } },
  // Fruits
  { id: 'apple', name: 'Apple', emoji: '🍎', category: 'fruit', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/apple-1716246146197.png', nutrition: { calories: 52, protein: 0.3, carbohydrates: 14, fat: 0.2 } },
  { id: 'banana', name: 'Banana', emoji: '🍌', category: 'fruit', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/banana-1716246167843.png', nutrition: { calories: 89, protein: 1.1, carbohydrates: 23, fat: 0.3 } },
  // Fats
  { id: 'avocado', name: 'Avocado', emoji: '🥑', category: 'fat', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/avocado-1716246237078.png', nutrition: { calories: 160, protein: 2, carbohydrates: 9, fat: 15 } },
  { id: 'almonds', name: 'Almonds', emoji: '🌰', category: 'fat', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/almonds-1716246253452.png', nutrition: { calories: 579, protein: 21, carbohydrates: 22, fat: 49 } },
  // Dairy
  { id: 'greek_yogurt', name: 'Greek Yogurt', emoji: '🥛', category: 'dairy', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/greek-yogurt-1716246328468.png', nutrition: { calories: 59, protein: 10, carbohydrates: 3.6, fat: 0.4 } },
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
    <div className="bg-surface rounded-2xl shadow-lg shadow-slate-200/50 h-full flex flex-col overflow-hidden border border-border-color">
        <div className="p-4 border-b border-border-color flex-shrink-0">
             <h2 className="text-xl font-bold text-secondary">Nutrient Library</h2>
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
        </div>
    </div>
  );
};

export default FoodSelector;
