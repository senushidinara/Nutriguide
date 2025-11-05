import React, { useState } from 'react';
import { FoodItem } from '../types';
import { X } from './icons';

interface AddFoodQuantityModalProps {
  foodItem: Omit<FoodItem, 'quantity' | 'unit'>;
  onClose: () => void;
  onAdd: (food: Omit<FoodItem, 'quantity' | 'unit'>, quantity: string, unit: string) => void;
}

const AddFoodQuantityModal: React.FC<AddFoodQuantityModalProps> = ({ foodItem, onClose, onAdd }) => {
  const [quantity, setQuantity] = useState('100');
  const [unit, setUnit] = useState('g');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity.trim()) {
      onAdd(foodItem, quantity, unit);
    }
  };

  return (
     <div 
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-surface rounded-2xl shadow-2xl shadow-slate-300/60 border border-border-color w-full max-w-md relative p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-background">
          <X className="w-5 h-5 text-text-muted" />
        </button>
        
        <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
                <img src={foodItem.imageUrl} alt={foodItem.name} className="w-24 h-24 rounded-full object-cover border-4 border-surface shadow-md" />
                <span 
                    className="absolute -bottom-2 -right-2 text-4xl bg-surface p-1 rounded-full leading-none shadow-md"
                >
                    {foodItem.emoji}
                </span>
            </div>
            <h2 className="text-2xl font-bold text-secondary">Add {foodItem.name}</h2>
            <p className="text-text-secondary mb-6">Specify the amount for an accurate simulation.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
                <div className="flex-grow">
                    <label htmlFor="quantity" className="block text-sm font-medium text-text-secondary mb-2">Quantity</label>
                    <input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full bg-background border border-border-color rounded-lg p-3 text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        autoFocus
                    />
                </div>
                <div>
                    <label htmlFor="unit" className="block text-sm font-medium text-text-secondary mb-2">Unit</label>
                    <select
                        id="unit"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-full h-[50px] bg-background border border-border-color rounded-lg p-3 text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    >
                        <option value="g">g</option>
                        <option value="oz">oz</option>
                        <option value="cup">cup</option>
                        <option value="serving">serving</option>
                    </select>
                </div>
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
                Add to Simulation
            </button>
        </form>
      </div>
     </div>
  );
};

export default AddFoodQuantityModal;
