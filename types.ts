import type { FC } from 'react';

export type AppView = 'dashboard' | 'simulator' | 'genetics' | 'community' | 'settings';
export type ThemeName = 'emerald' | 'sapphire' | 'ruby' | 'amethyst' | 'solaris' | 'nocturne';

export interface UserProfile {
  age: number;
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'lose_weight' | 'maintain_weight' | 'gain_muscle';
  geneticsDataStatus: 'not_connected' | 'pending' | 'connected';
  microbiomeDataStatus: 'not_connected' | 'pending' | 'connected';
  wearableStatus: 'not_connected' | 'pending' | 'connected';
  lastWellnessScore: number | null;
  lastMacros: { protein: number, carbs: number, fats: number };
}

export interface AppState {
    userProfile: UserProfile | null;
    activeView: AppView;
    theme: ThemeName;
    lastSimulationResult: SimulationResult | null;
    hasCompletedOnboarding: boolean;
}

export interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error';
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

export interface GroundingSource {
    uri: string;
    title: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  groundingSources?: GroundingSource[];
}

export interface SavedMeal {
    id: string;
    name: string;
    foods: FoodItem[];
}

export interface Achievement {
    icon: FC<{className?: string}>;
    title: string;
    description: string;
    progress: number;
    goal: number;
    reward: string;
}

export interface LeaderboardUser {
    rank: number;
    name: string;
    score: number;
    avatar: string;
    trend: 'up' | 'down' | 'stable';
    lastMealScore: number;
}
