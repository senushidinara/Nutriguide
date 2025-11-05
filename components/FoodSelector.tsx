import React, { useState, useMemo } from 'react';
import { FoodItem } from '../types';

const foodList: Omit<FoodItem, 'quantity' | 'unit'>[] = [
  // Proteins
  { id: 'chicken', name: 'Chicken Breast', emoji: '🍗', category: 'protein', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20a%20grilled%20chicken%20breast%2C%20sliced%20and%20fanned%20out%20on%20a%20clean%2C%20white%20plate.%20The%20chicken%20should%20have%20beautiful%20grill%20marks%2C%20look%20juicy%20and%20tender%2C%20and%20be%20garnished%20with%20a%20sprig%20of%20fresh%20parsley.%20The%20lighting%20should%20be%20bright%20and%20natural%2C%20highlighting%20the%20texture%20of%20the%20meat.1718049713.png', nutrition: { calories: 165, protein: 31, carbohydrates: 0, fat: 3.6 } },
  { id: 'salmon', name: 'Salmon Fillet', emoji: '🍣', category: 'protein', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20vibrant%2C%20photorealistic%20image%20of%20a%20pan-seared%20salmon%20fillet.%20The%20salmon%20should%20have%20a%20crispy%2C%20golden-brown%20skin%20and%20a%20flaky%2C%20pinkish-orange%20interior.%20It%20should%20be%20placed%20on%20a%20dark%20slate%20plate%20and%20garnished%20with%20a%20lemon%20wedge%20and%20some%20fresh%20dill.%20The%20lighting%20should%20be%20dramatic%2C%20with%20strong%20highlights%20and%20shadows%20to%20emphasize%20the%20texture%20of%20the%20fish.1718049755.png', nutrition: { calories: 208, protein: 20, carbohydrates: 0, fat: 13 } },
  { id: 'steak', name: 'Sirloin Steak', emoji: '🥩', category: 'protein', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20a%20perfectly%20cooked%20medium-rare%20sirloin%20steak%2C%20sliced%20to%20reveal%20its%20juicy%2C%20pink%20center.%20The%20steak%20should%20be%20on%20a%20rustic%20wooden%20cutting%20board%2C%20sprinkled%20with%20coarse%20sea%20salt%20and%20a%20few%20sprigs%20of%20rosemary.%20The%20lighting%20should%20be%20warm%20and%20inviting%2C%20creating%20a%20cozy%2C%20gastronomic%20atmosphere.1718049779.png', nutrition: { calories: 271, protein: 25, carbohydrates: 0, fat: 19 } },
  { id: 'eggs', name: 'Eggs', emoji: '🥚', category: 'protein', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20two%20fried%20eggs%2C%20sunny-side%20up%2C%20in%20a%20cast-iron%20skillet.%20The%20yolks%20should%20be%20vibrant%20orange%20and%20runny%2C%20while%20the%20whites%20are%20perfectly%20set%20with%20crispy%20edges.%20The%20eggs%20should%20be%20seasoned%20with%20a%20sprinkle%20of%20black%20pepper%20and%20chives.%20The%20lighting%20should%20be%20like%20early%20morning%20sunlight%20streaming%20into%20a%20kitchen.1718049800.png', nutrition: { calories: 155, protein: 13, carbohydrates: 1.1, fat: 11 } },
  { id: 'tofu', name: 'Firm Tofu', emoji: '⬜️', category: 'protein', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20golden-brown%2C%20pan-fried%20tofu%20cubes.%20The%20tofu%20should%20look%20crispy%20on%20the%20outside%20and%20soft%20on%20the%20inside.%20The%20cubes%20should%20be%20arranged%20in%20a%20white%20ceramic%20bowl%20and%20garnished%20with%20sesame%20seeds%20and%20sliced%20scallions.%20The%20lighting%20should%20be%20clean%20and%20bright%2C%20conveying%20a%20sense%20of%20health%20and%20freshness.1718049821.png', nutrition: { calories: 76, protein: 8, carbohydrates: 1.9, fat: 4.8 } },
  // Carbohydrates
  { id: 'sweet_potato', name: 'Sweet Potato', emoji: '🍠', category: 'carbohydrate', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20a%20baked%20sweet%20potato%2C%20split%20open%20to%20reveal%20its%20fluffy%2C%20vibrant%20orange%20flesh.%20A%20pat%20of%20melting%20butter%20should%20be%20visible%20on%20top%2C%20along%20with%20a%20sprinkle%20of%20cinnamon%20and%20a%20drizzle%20of%20honey.%20The%20sweet%20potato%20should%20be%20on%20a%20piece%20of%20parchment%20paper%20on%20a%20baking%20sheet.%20The%20lighting%20should%20be%20warm%20and%20comforting.1718049851.png', nutrition: { calories: 86, protein: 1.6, carbohydrates: 20, fat: 0.1 } },
  { id: 'white_pasta', name: 'Pasta', emoji: '🍝', category: 'carbohydrate', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20a%20classic%20bowl%20of%20spaghetti%20with%20marinara%20sauce.%20The%20pasta%20should%20be%20perfectly%20cooked%20and%20tossed%20in%20a%20rich%2C%20red%20sauce%2C%20topped%20with%20a%20fresh%20basil%20leaf%20and%20a%20sprinkle%20of%20parmesan%20cheese.%20The%20bowl%20should%20be%20a%20simple%2C%20white%20ceramic%20one%2C%20and%20the%20lighting%20should%20be%20as%20if%20in%20a%20cozy%20Italian%20restaurant.1718049870.png', nutrition: { calories: 131, protein: 5, carbohydrates: 25, fat: 1.1 } },
  // Grains
  { id: 'brown_rice', name: 'Brown Rice', emoji: '🍚', category: 'grain', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20a%20simple%20bowl%20of%20steamed%20brown%20rice.%20The%20rice%20grains%20should%20be%20distinct%20and%20fluffy%2C%20with%20a%20nutty%20brown%20hue.%20The%20bowl%20should%20be%20a%20minimalist%2C%20light-colored%20ceramic%20bowl.%20The%20lighting%20should%20be%20soft%20and%20natural%2C%20creating%20a%20clean%20and%20wholesome%20look.1718049893.png', nutrition: { calories: 111, protein: 2.6, carbohydrates: 23, fat: 0.9 } },
  { id: 'quinoa', name: 'Quinoa', emoji: '🌾', category: 'grain', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20a%20bowl%20of%20cooked%20tri-color%20quinoa.%20The%20quinoa%20should%20be%20fluffy%20and%20perfectly%20cooked%2C%20showcasing%20the%20red%2C%20white%2C%20and%20black%20grains.%20The%20bowl%20should%20be%20a%20textured%2C%20earthenware%20bowl%2C%20and%20the%20quinoa%20should%20be%20garnished%20with%20chopped%20cilantro.%20The%20lighting%20should%20be%20bright%20and%20airy.1718049914.png', nutrition: { calories: 120, protein: 4.1, carbohydrates: 21, fat: 1.9 } },
  { id: 'oats', name: 'Rolled Oats', emoji: '🥣', category: 'grain', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20a%20hearty%20bowl%20of%20oatmeal.%20The%20oatmeal%20should%20be%20thick%20and%20creamy%2C%20topped%20with%20a%20swirl%20of%20maple%20syrup%2C%20a%20handful%20of%20fresh%20blueberries%2C%20and%20a%20sprinkle%20of%20chia%20seeds.%20The%20bowl%20should%20be%20a%20cozy%2C%20handmade%20ceramic%20bowl.%20The%20lighting%20should%20be%20soft%20and%20warm%2C%20like%20a%20gentle%20morning%20light.1718049933.png', nutrition: { calories: 389, protein: 16.9, carbohydrates: 66, fat: 6.9 } },
  // Legumes
  { id: 'lentils', name: 'Lentils', emoji: '🍲', category: 'legume', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20a%20rustic%20bowl%20of%20lentil%20soup.%20The%20soup%20should%20be%20thick%20and%20hearty%2C%20with%20visible%20vegetables%20like%20carrots%2C%20celery%2C%20and%20onions.%20The%20bowl%20should%20be%20a%20dark%2C%20earthenware%20bowl%2C%20and%20the%20soup%20should%20be%20garnished%20with%20a%20dollop%20of%20yogurt%20and%20some%20fresh%20parsley.%20The%20lighting%20should%20be%20moody%20and%20dramatic.1718049953.png', nutrition: { calories: 116, protein: 9, carbohydrates: 20, fat: 0.4 } },
  { id: 'chickpeas', name: 'Chickpeas', emoji: '🧆', category: 'legume', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20a%20bowl%20of%20cooked%20chickpeas.%20The%20chickpeas%20should%20be%20plump%20and%20perfectly%20cooked%2C%20drizzled%20with%20olive%20oil%20and%20sprinkled%20with%20paprika%20and%20cumin.%20The%20bowl%20should%20be%20a%20simple%2C%20light-blue%20ceramic%20bowl.%20The%20lighting%20should%20be%20bright%20and%20clean%2C%20with%20a%20Mediterranean%20feel.1718049973.png', nutrition: { calories: 164, protein: 8.9, carbohydrates: 27, fat: 2.6 } },
  // Vegetables
  { id: 'broccoli', name: 'Broccoli', emoji: '🥦', category: 'vegetable', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20fresh%2C%20vibrant%20green%20broccoli%20florets.%20The%20broccoli%20should%20be%20lightly%20steamed%2C%20so%20it%20retains%20its%20bright%20color%20and%20crisp-tender%20texture.%20The%20florets%20should%20be%20on%20a%20clean%2C%20white%20plate%2C%20with%20a%20few%20water%20droplets%20clinging%20to%20them.%20The%20lighting%20should%20be%20natural%20and%20bright.1718049992.png', nutrition: { calories: 55, protein: 3.7, carbohydrates: 11, fat: 0.6 } },
  { id: 'spinach', name: 'Spinach', emoji: '🥬', category: 'vegetable', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20a%20bunch%20of%20fresh%2C%20vibrant%20spinach%20leaves.%20The%20leaves%20should%20be%20deep%20green%20and%20slightly%20glistening%20with%20moisture.%20They%20should%20be%20casually%20arranged%20on%20a%20weathered%20wooden%20surface.%20The%20lighting%20should%20be%20soft%20and%20diffused%2C%20as%20if%20from%20a%20nearby%20window.1718050011.png', nutrition: { calories: 23, protein: 2.9, carbohydrates: 3.6, fat: 0.4 } },
  { id: 'bell_pepper', name: 'Bell Pepper', emoji: '🫑', category: 'vegetable', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20a%20vibrant%2C%20glossy%20red%20bell%20pepper.%20The%20pepper%20should%20be%20whole%2C%20with%20a%20green%20stem%2C%20and%20should%20have%20a%20few%20drops%20of%20water%20on%20its%20skin.%20It%20should%20be%20placed%20on%20a%20clean%2C%20white%20background%20to%20make%20its%20color%20pop.%20The%20lighting%20should%20be%20studio-quality%2C%20with%20soft%20reflections.1718050029.png', nutrition: { calories: 31, protein: 1, carbohydrates: 6, fat: 0.3 } },
  // Fruits
  { id: 'apple', name: 'Apple', emoji: '🍎', category: 'fruit', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20a%20crisp%2C%20red%20apple.%20The%20apple%20should%20be%20perfectly%20ripe%2C%20with%20a%20shiny%20skin%20and%20a%20single%20water%20droplet%20rolling%20down%20its%20side.%20It%20should%20be%20on%20a%20simple%2C%20white%20background%2C%20with%20lighting%20that%20emphasizes%20its%20shape%20and%20color.1718050050.png', nutrition: { calories: 52, protein: 0.3, carbohydrates: 14, fat: 0.2 } },
  { id: 'banana', name: 'Banana', emoji: '🍌', category: 'fruit', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20a%20single%2C%20perfectly%20ripe%20banana.%20The%20banana%20should%20be%20bright%20yellow%20with%20a%20few%20small%20brown%20spots%2C%20indicating%20sweetness.%20It%20should%20be%20lying%20on%20a%20light-colored%2C%20textured%20surface.%20The%20lighting%20should%20be%20soft%20and%20natural.1718050068.png', nutrition: { calories: 89, protein: 1.1, carbohydrates: 23, fat: 0.3 } },
  // Fats
  { id: 'avocado', name: 'Avocado', emoji: '🥑', category: 'fat', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20an%20avocado%20cut%20in%20half.%20One%20half%20should%20have%20the%20pit%20in%20it%2C%20and%20the%20other%20should%20be%20pitted%2C%20showcasing%20the%20creamy%2C%20green%20flesh.%20The%20avocado%20halves%20should%20be%20on%20a%20dark%2C%20moody%20background%2C%20sprinkled%20with%20a%20little%20sea%20salt.%20The%20lighting%20should%20be%20artistic%20and%20directional.1718050087.png', nutrition: { calories: 160, protein: 2, carbohydrates: 9, fat: 15 } },
  { id: 'almonds', name: 'Almonds', emoji: '🌰', category: 'fat', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20a%20small%20pile%20of%20raw%2C%20unsalted%20almonds.%20The%20almonds%20should%20be%20in%20sharp%20focus%2C%20showing%20their%20texture%20and%20natural%20patterns.%20They%20should%20be%20on%20a%20simple%2C%20white%20surface%2C%20with%20bright%2C%20even%20lighting.1718050106.png', nutrition: { calories: 579, protein: 21, carbohydrates: 22, fat: 49 } },
  // Dairy
  { id: 'greek_yogurt', name: 'Greek Yogurt', emoji: '🥛', category: 'dairy', imageUrl: 'https://storage.googleapis.com/maker-me/prompt-images/a%20photorealistic%20image%20of%20a%20bowl%20of%20thick%2C%20creamy%20Greek%20yogurt.%20The%20yogurt%20should%20have%20a%20beautiful%20swirl%20on%20top%2C%20drizzled%20with%20golden%20honey%20and%20topped%20with%20a%20few%20walnuts.%20The%20bowl%20should%20be%20a%20simple%2C%20white%20ceramic%20bowl.%20The%20lighting%20should%20be%20bright%20and%20fresh%2C%20like%20a%20healthy%20breakfast%20scene.1718050125.png', nutrition: { calories: 59, protein: 10, carbohydrates: 3.6, fat: 0.4 } },
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