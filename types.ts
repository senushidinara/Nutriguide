export type AppView = 'dashboard' | 'simulator' | 'genetics' | 'community' | 'settings';
export type ThemeName = 'emerald' | 'sapphire' | 'ruby' | 'amethyst' | 'solaris' | 'nocturne';

export interface UserProfile {
  age: number;
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'lose_weight' | 'maintain_weight' | 'gain_muscle';
  geneticsDataStatus?: 'not_connected' | 'pending' | 'connected';
  microbiomeDataStatus?: 'not_connected' | 'pending' | 'connected';
}

export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  category: 'protein' | 'carbohydrate' | 'fat' | 'vegetable' | 'fruit' | 'dairy' | 'legume' | 'grain' | 'other';
  imageUrl: string;
  nutrition: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
  };
  quantity: string;
  unit: string;
}

export interface SimulationTimelinePoint {
  hour: number;
  physical_energy: number;
  cognitive_focus: number;
  emotional_stability: number;
}

export interface EnergyDistribution {
  brain: number;
  muscles: number;
  digestive_system: number;
  immune_system: number;
}

export interface EnergyCrashPrediction {
    time_of_dip: string;
    reason: string;
    suggestion: string;
}

export interface SimulationResult {
  simulation_timeline: SimulationTimelinePoint[];
  energy_distribution: EnergyDistribution;
  energy_optimization_score: number;
  insights: {
    short_term: string;
    long_term: string;
    mood_impact: string;
  };
  meal_alchemy_suggestion: {
    title: string;
    combo: string;
    reasoning: string;
  };
  metabolic_forecast_weekly: string;
  energy_crash_prediction: EnergyCrashPrediction;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface SavedMeal {
    id: string;
    name: string;
    foods: FoodItem[];
}