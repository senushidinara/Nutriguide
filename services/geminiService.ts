import { GoogleGenAI, Type, Chat } from "@google/genai";
import { UserProfile, FoodItem, SimulationResult, GroundingSource } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
let chatSession: Chat | null = null;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        simulation_timeline: {
            type: Type.ARRAY,
            description: "An array of 24 objects, one for each hour post-meal, predicting energy, focus, and mood levels on a 0-100 scale.",
            items: {
                type: Type.OBJECT,
                properties: {
                    hour: { type: Type.INTEGER, description: "Hour post-meal (0-23)." },
                    physical_energy: { type: Type.INTEGER, description: "Predicted physical energy level (0-100)." },
                    cognitive_focus: { type: Type.INTEGER, description: "Predicted cognitive focus level (0-100)." },
                    emotional_stability: { type: Type.INTEGER, description: "Predicted emotional stability level (0-100)." },
                },
                required: ["hour", "physical_energy", "cognitive_focus", "emotional_stability"]
            },
        },
        energy_distribution: {
            type: Type.OBJECT,
            description: "Predicted allocation of energy to different body systems on a 0-100 scale.",
            properties: {
                brain: { type: Type.INTEGER, description: "Energy for cognitive functions." },
                muscles: { type: Type.INTEGER, description: "Energy for physical activity." },
                digestive_system: { type: Type.INTEGER, description: "Energy for digestion and absorption." },
                immune_system: { type: Type.INTEGER, description: "Energy for immune response." },
            },
             required: ["brain", "muscles", "digestive_system", "immune_system"]
        },
        energy_optimization_score: {
            type: Type.INTEGER,
            description: "An overall score (0-100) for how well this meal optimizes the user's energy based on their profile and goals."
        },
        insights: {
            type: Type.OBJECT,
            description: "Actionable insights based on the simulation.",
            properties: {
                short_term: { type: Type.STRING, description: "The immediate impact of the meal over the next few hours." },
                long_term: { type: Type.STRING, description: "Potential long-term effects of consuming such meals regularly." },
                mood_impact: { type: Type.STRING, description: "How the meal is predicted to affect mood and emotional state." },
            },
            required: ["short_term", "long_term", "mood_impact"]
        },
        meal_alchemy_suggestion: {
            type: Type.OBJECT,
            description: "A novel, synergistic food combination suggestion to enhance the meal's benefits.",
            properties: {
                title: { type: Type.STRING, description: "A catchy title for the suggestion." },
                combo: { type: Type.STRING, description: "The specific food combination to add or change." },
                reasoning: { type: Type.STRING, description: "The scientific-sounding reason why this combo is effective." },
            },
            required: ["title", "combo", "reasoning"]
        },
        metabolic_forecast_weekly: {
            type: Type.STRING,
            description: "A one-sentence forecast of the metabolic impact if this meal pattern is followed for a week."
        },
        energy_crash_prediction: {
            type: Type.OBJECT,
            description: "Identifies the most significant potential energy dip (crash) in the timeline, its cause, and a suggestion to mitigate it.",
            properties: {
                time_of_dip: { type: Type.STRING, description: "The approximate time of the energy dip (e.g., 'Around hour 4' or 'Mid-afternoon')." },
                reason: { type: Type.STRING, description: "A brief explanation for why the energy crash is predicted to occur." },
                suggestion: { type: Type.STRING, description: "A short, actionable tip to prevent or lessen the impact of the crash." }
            },
            required: ["time_of_dip", "reason", "suggestion"]
        }
    },
    required: ["simulation_timeline", "energy_distribution", "energy_optimization_score", "insights", "meal_alchemy_suggestion", "metabolic_forecast_weekly", "energy_crash_prediction"]
};

export const getMealSimulation = async (userProfile: UserProfile, meal: FoodItem[]): Promise<SimulationResult> => {
    const model = 'gemini-2.5-pro';

    const mealDescription = meal.map(item => `${item.name} (${item.quantity}${item.unit})`).join(', ');

    const prompt = `
      **User Profile:**
      - Age: ${userProfile.age}
      - Weight: ${userProfile.weight} kg
      - Height: ${userProfile.height} cm
      - Activity Level: ${userProfile.activityLevel}
      - Primary Goal: ${userProfile.goal.replace('_', ' ')}

      **Meal to Simulate:**
      ${mealDescription}

      **Task:**
      Analyze the provided meal based on the user's profile. Generate a comprehensive, 24-hour simulation of its impact on their physical, cognitive, and emotional energy. Provide deep, actionable insights and a creative 'meal alchemy' suggestion. Specifically identify the most likely time for an energy crash (a significant dip in physical or cognitive energy), explain why it happens, and offer a tip to mitigate it. The simulation should be scientifically plausible but creative and engaging. Fill out all fields in the provided JSON schema. The simulation timeline must contain exactly 24 hourly data points.
    `;

    const systemInstruction = "You are NutriGuide, a personalized, predictive, multi-dimensional energy management AI. You combine nutrition science, sleep science, and performance coaching to simulate how meals affect a user's energy. Your purpose is to act as an advanced predictive modeling engine, providing detailed, actionable, and scientifically-plausible insights. Always respond with a valid JSON object matching the specified schema, with no additional text or markdown formatting.";

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.7
        },
    });

    try {
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        return result as SimulationResult;
    } catch (error) {
        console.error("Failed to parse Gemini response:", response.text);
        throw new Error("The AI returned an invalid response format.");
    }
};

export const startChatSession = (userProfile: UserProfile, meal: FoodItem[], simulationResult: SimulationResult) => {
    const mealDescription = meal.map(item => `${item.name} (${item.quantity}${item.unit})`).join(', ');
    const simulationSummary = JSON.stringify(simulationResult, null, 2);

    const systemInstruction = `You are a helpful and knowledgeable nutrition assistant for the NutriGuide app. Your role is to discuss the user's meal simulation results and act as a translator for their body's signals. You have been provided with the user's profile, the meal they ate, and the detailed simulation data. Answer their questions clearly and concisely. Do not refer to yourself as an AI. Be conversational, encouraging, and help the user build better intuition about their body's needs. Use the provided context to give personalized advice.`;

    const initialHistory = [
        {
            role: 'user',
            parts: [{ text: `Here is the context for our conversation. Do not repeat this information back to me unless I ask for it. Just acknowledge you are ready by saying "I've reviewed your simulation. What's on your mind?".
            
            **User Profile:**
            - Age: ${userProfile.age}
            - Weight: ${userProfile.weight} kg
            - Height: ${userProfile.height} cm
            - Activity Level: ${userProfile.activityLevel}
            - Primary Goal: ${userProfile.goal.replace('_', ' ')}

            **Simulated Meal:**
            ${mealDescription}

            **Full Simulation Results (JSON):**
            ${simulationSummary}
            `}]
        },
         {
            role: 'model',
            parts: [{ text: "I've reviewed your simulation. What's on your mind?" }]
        }
    ];
    
    chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction },
        history: initialHistory,
    });
};

const getGroundedResponse = async (message: string, location: {latitude: number, longitude: number} | null) => {
    const tools = [{googleSearch: {}}];
    let toolConfig;

    if (location) {
        tools.push({googleMaps: {}});
        toolConfig = {
            retrievalConfig: {
                latLng: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                }
            }
        }
    }
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
        config: {
            tools,
            ...(toolConfig && { toolConfig })
        },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks.map((chunk: any) => {
        if (chunk.web) {
            return { uri: chunk.web.uri, title: chunk.web.title };
        }
        if (chunk.maps) {
            return { uri: chunk.maps.uri, title: chunk.maps.title };
        }
        return null;
    }).filter(Boolean);


    return { text: response.text, groundingSources: sources };
};

export const getChatResponse = async (
    message: string,
    location: { latitude: number; longitude: number } | null
): Promise<{ text: string; groundingSources?: GroundingSource[] }> => {

    const groundingKeywords = ['latest', 'news', 'find', 'nearby', 'current events', 'who won', 'what is the score', 'recipe for'];

    const shouldUseGrounding = groundingKeywords.some(keyword => message.toLowerCase().includes(keyword));

    if (shouldUseGrounding) {
        return getGroundedResponse(message, location);
    }
    
    if (!chatSession) {
        throw new Error("Chat session not initialized. Please run a simulation first.");
    }
    
    const response = await chatSession.sendMessage({ message });
    return { text: response.text };
};