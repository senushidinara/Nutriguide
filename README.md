# 🌟 NutriGuide AI: Your Predictive Wellness Co-pilot 🌟

<p align="center">
  <img src="https://i.imgur.com/g4gP7k5.png" alt="NutriGuide AI Banner" width="800"/>
</p>

<p align="center">
  <strong>🔮 Run a clinical trial on your meals... <em>before</em> you eat them. 🔮</strong>
</p>

<p align="center">
  <img alt="Tech Stack" src="https://img.shields.io/badge/Tech%20Stack-Google%20Gemini%20%7C%20React%20%7C%20GCP-blueviolet?style=for-the-badge">
  <img alt="Platform" src="https://img.shields.io/badge/Platform-WebApp-green?style=for-the-badge">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge">
</p>

---

🎉 Welcome to the official repository for **NutriGuide AI**! 🎉 This isn't just another calorie counter. NutriGuide AI is a revolutionary wellness platform that acts as your personal health co-pilot. By creating a unique **"Body Blueprint"** 🧬 and leveraging a powerful **"Micro-Simulation Engine"** ⚡ powered by Google's Gemini models, we forecast how any meal will impact your energy, focus, and mood—up to 24 hours in advance.

## ✨ Why NutriGuide AI is So Unique ✨

<details>
  <summary><strong>🤯 Click here to see what sets us apart...</strong></summary>
  
  *   **🔬 Predictive, Not Just Reactive:** We don't just track what you've eaten; we predict its future impact! Our micro-simulation engine runs thousands of calculations to analyze nutrient absorption, mental clarity, and physical performance *before* you take a single bite. It's like having a crystal ball for your body! 🔮
  *   **🧬 Hyper-Personalized "Body Blueprint":** We move light-years beyond generic advice. By modeling your unique metabolism, goals, and (optionally) your genetic and microbiome data, we provide insights tailored specifically to *your* body's biological rhythms.
  *   **🧠 Holistic Wellness Tracking:** Calories and macros are just the beginning. We measure the delicate dance between mental clarity, emotional stability, and physical energy, giving you an integrated **Wellness Score** for a complete, 360° picture of your health.
  *   **🧑‍🏫 Democratized Expert Access:** Our platform integrates the expertise of a nutrition scientist, a sleep scientist, and a performance coach into a single, accessible system. It's like having a team of specialists in your pocket, 24/7, all powered by advanced AI.
  *   **🌍 Real-Time Grounded Intelligence:** Our AI chat is supercharged with Google Search and Maps grounding. Ask for the latest health news, find nearby restaurants that fit your goals, or get supplement recommendations, complete with sourced, up-to-the-minute answers you can trust.

</details>

## 🚀 Core Features

- **⚡ Meal Simulation Engine:** Compose a meal and watch our AI predict its future impact on your body in stunning detail.
- **📊 Interactive Wellness Dashboard:** Your daily command center with a dynamic Wellness Score, macro tracking, and mind-blowing AI insights.
- **🧬 Genetics & Microbiome Integration:** A forward-looking feature to connect your health data for an unprecedented level of personalization.
- **🏆 Community & Gamification:** Stay motivated with awesome achievements and a friendly weekly leaderboard.
- **🎨 Advanced Theming Engine:** Completely customize the app's look and feel! Choose from 6 stunning themes (including a sleek dark mode!) that change colors, fonts, and even animated backgrounds.
- **💬 AI Chat with Grounding:** Ask complex questions and get real-time, sourced information about nutrition, health, and local food options.
- **🔍 Smart Nutrient Library:** A beautiful library of ingredients with a powerful, instantaneous search function.
- **🔐 Privacy First:** You are in complete control of your data with robust privacy features and crystal-clear disclaimers.

---

## 🏗️ Technology & Architecture

NutriGuide AI was architected as a scalable, secure, and AI-native application from day one. We leveraged a serverless, microservices-based approach on **Google Cloud Platform (GCP)**, with high-performance AI inference workloads strategically handled by **Vultr** and the **LiquidMetal AI Raindrop Platform**.

###  High-Level System Overview
<details>
  <summary><strong>Diagram 1: High-Level System Overview 🗺️</strong></summary>

  ```mermaid
  graph TD
    subgraph User Facing
        User[🧍 User] --> Browser[🌐 Browser App];
    end
    
    subgraph Edge & Delivery
        Browser --> CDN[🌍 Cloudflare CDN];
    end
    
    subgraph Google Cloud Platform
        CDN --> GCR_Frontend[☁️ GCP Cloud Run: Frontend];
        GCR_Frontend --> GCR_Backend_API[⚙️ GCP Cloud Run: Backend API];
        
        GCR_Backend_API -- "REST/gRPC" --> Microservices[➡️ GCP Cloud Run: Microservices];
        GCR_Backend_API -- "Read/Write" --> Firestore[🔥 Firestore];
        
        Microservices -- "API Calls" --> Google_AI[🧠 Google AI Platform];
        Microservices -- "Pub/Sub" --> PubSub[📬 Google Pub/Sub];
        PubSub --> Cloud_Logging[📜 Google Cloud Logging];
    end
    
    subgraph High-Performance Compute
        Microservices -- "Secure API" --> Raindrop[💧 LiquidMetal Raindrop Platform];
        Raindrop -- "Manages" --> Vultr[🚀 Vultr Cloud Compute / GPU];
        Vultr -- "Optimized Inference" --> Google_AI;
    end

    style User fill:#a7f3d0,stroke:#059669,stroke-width:2px
    style GCR_Frontend fill:#bfdbfe,stroke:#2563eb,stroke-width:2px
    style GCR_Backend_API fill:#bfdbfe,stroke:#2563eb,stroke-width:2px
    style Microservices fill:#bfdbfe,stroke:#2563eb,stroke-width:2px
    style Google_AI fill:#fef08a,stroke:#ca8a04,stroke-width:2px
    style Vultr fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px
  ```
</details>

### AI Simulation & Data Flow
<details>
  <summary><strong>Diagram 2: AI Simulation & Data Flow 🧠</strong></summary>

  ```mermaid
  sequenceDiagram
    actor User
    participant App as 🖥️ Frontend App
    participant API as ⚙️ Backend API
    participant Inference as 🧠 AI Inference Service
    participant Gemini as ✨ Gemini 2.5 Pro
    participant Firestore as 🔥 Firestore

    User->>App: 1. Composes a delicious meal & clicks "Run Simulation" 🚀
    App->>API: 2. POST /simulate (meal, userProfile)
    API->>Firestore: 3. Reads latest User Profile
    API->>Inference: 4. Requests simulation with contextual prompt
    Inference->>Gemini: 5. Generates detailed prompt & calls Gemini 2.5 Pro API (with JSON schema)
    Gemini-->>Inference: 6. Returns structured JSON simulation data 📈
    Inference-->>API: 7. Forwards simulation result
    API-->>App: 8. Sends final result to client
    App-->>User: 9. Renders stunning charts & insights! ✨
  ```
</details>

### Microservices on Google Cloud Run
<details>
  <summary><strong>Diagram 3: Microservices Architecture ⚙️</strong></summary>
  
  ```mermaid
  graph TD
    subgraph " "
        direction LR
        GCR_Frontend[🌐 Frontend Container] --> GCR_Backend_API[⚙️ Backend API];
    end

    subgraph "Backend Services (Cloud Run)"
        direction LR
        GCR_Backend_API -- gRPC --> GCR_Auth[🔐 Auth Service];
        GCR_Backend_API --> GCR_UserData[👤 User Data Service];
        GCR_Backend_API --> GCR_AI_Proxy[🧠 AI Inference Proxy];
        GCR_Backend_API --> GCR_Notifications[🔔 Notifications Service];

        GCR_UserData -- "Writes" --> Firestore[🔥 Firestore];
        GCR_UserData -- "Publishes Event" --> PubSub((📬 Pub/Sub));
        
        PubSub --> GCR_Logging[📜 Session Logging];
        PubSub --> GCR_Analytics[📈 Analytics Service];
        PubSub --> GCR_HabitEngine[💪 Habit Engine];

        GCR_AI_Proxy --> External_AI[🌍 External AI APIs];
    end

    style GCR_Frontend fill:#bfdbfe,stroke:#2563eb,stroke-width:2px
    style GCR_Backend_API fill:#bfdbfe,stroke:#2563eb,stroke-width:2px
  ```
</details>

### 🛠️ The Tech Stack in Detail

<details>
  <summary><strong>☁️ Cloud Infrastructure & Platforms</strong></summary>

  *   **Google Cloud Run:** ⚡️ Served as the electrifying backbone for our serverless architecture.
      *   **Front-end Container:** Hosted the React single-page application, ensuring blazing-fast delivery and global scalability.
      *   **Back-end API Container:** Ran our primary Node.js API, acting as the main gateway for the frontend.
      *   **Microservices Containers:** Each specialized service (listed below) was deployed as an independent, auto-scaling container for maximum efficiency.
  *   **LiquidMetal AI Raindrop Platform:** 💧 This platform was our secret weapon for simplifying AI/ML operations. We used Raindrop to abstract away the complexity of deploying and scaling our most demanding inference workloads.
  *   **Vultr Cloud Compute & Object Storage:** 🚀 Integrated via Raindrop, Vultr provided the high-performance compute instances (including GPUs) needed for our complex simulation models, offering significant cost savings and low-latency inference.
  *   **Google Firestore:** 🔥 Acted as our primary NoSQL database for storing user profiles, saved meals, and community data, loved for its scalability and real-time capabilities.
  *   **Google Cloud Storage:** 📦 Used for storing user-generated content and static assets, such as the AI-generated food images.
  *   **Google Cloud Pub/Sub:** 📬 Formed the asynchronous messaging backbone between our microservices, decoupling services and ensuring rock-solid reliability.
  *   **Google Cloud Logging:** 📜 Provided centralized logging for monitoring and debugging across all our Cloud Run services.
  *   **Cloudflare CDN:** 🌍 Sat in front of our application to provide security (WAF, DDoS protection) and performance optimization by caching assets at the edge, closer to our users.
</details>

<details>
  <summary><strong>🧠 AI Models & Services</strong></summary>

  We employed a multi-model strategy, selecting the best AI tool for each specific task.

  *   **Core Simulation Engine:**
      *   **`gemini-2.5-pro`:** This was the absolute powerhouse behind our core **Meal Simulation Engine**. Its advanced reasoning and massive context window were essential for processing the complex user profile, meal composition, and detailed JSON schema to generate the 24-hour forecast.
  *   **Chat & Grounding:**
      *   **`gemini-2.5-flash`:** Used for the interactive **AI Chat** due to its incredible balance of speed and intelligence. It was also used with **Google Search & Maps Tools** to provide real-time, grounded responses to user queries.
  *   **Image Generation:**
      *   **`imagen-4`:** 📸 This model was used internally to generate the stunning, photorealistic food images in our **Nutrient Library**, ensuring a visually rich user experience.
  *   **Future & Specialized Use Cases (Design Phase):**
      *   **Vertex AI Vision:** We designed the architecture to incorporate Vertex AI Vision for future features, such as allowing users to analyze meals from a photo.
      *   **Vertex AI Text-to-Speech:** 🗣️ The system was architected to potentially use Text-to-Speech to provide audio-based insights, improving accessibility.
      *   **Vertex AI Embeddings & Matching Engine:** These were planned for building an advanced semantic search for the food library and for identifying similar meals in a user's history.
      *   **Gemma & other Gemini variants:** Lighter models like `gemini-2.5-flash-lite` and `gemma` were used for smaller, internal text processing tasks.
</details>

<details>
  <summary><strong>⚙️ Backend Microservices on Cloud Run</strong></summary>

  Our backend was decomposed into a suite of independent services for ultimate maintainability and scalability.

  1.  **Authentication & Authorization Service:** 🔐 Handled user sign-up, login, and session management.
  2.  **User Data Processing Service:** 👤 Managed all CRUD operations for user profiles, preferences, and connected data sources.
  3.  **AI Inference Service (Proxy):** 🧠 Acted as a secure proxy to all external AI APIs. It managed API keys, handled prompt engineering, and standardized AI responses.
  4.  **Session Logging Service:** 📜 Asynchronously consumed events from Pub/Sub to log simulation requests and chat interactions for analytics.
  5.  **Notifications & Reminders Service:** 🔔 Designed to handle push notifications for things like hydration reminders or meal logging streaks.
  6.  **Habit Tracking & Routine Engine Service:** 💪 Analyzed user behavior to identify patterns and power the achievement system.
  7.  **Reporting & Analytics Service:** 📈 Aggregated data to generate weekly reports and dashboard insights.
  8.  **And more:** Including services for data export, third-party integrations, and sandboxing experimental features.
</details>

<details>
  <summary><strong>🎨 Frontend Magic</strong></summary>

  *   **⚛️ React & TypeScript:** ❤️ The foundation of our modern, type-safe, and beautiful user interface.
  *   **🍃 Tailwind CSS:** 💨 For rapid, utility-first styling that allowed us to build and iterate on our UI with incredible speed.
  *   **📊 Recharts:** 📈 Used to create the stunning, animated charts for the simulation results and wellness dashboard.
</details>

---

## 🛠️ Getting Started

This project is a modern web application built with React and Vite.

1.  **Clone the repository.**
2.  **Install dependencies:** `npm install`
3.  **Set up environment variables:** Create a `.env` file and add your `API_KEY`.
4.  **Run the development server:** `npm run dev`

## 🤝 Contributing

We welcome contributions with open arms! 🤗 Please feel free to submit a pull request or open an issue to make NutriGuide AI even better.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
