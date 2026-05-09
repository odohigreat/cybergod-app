import { QuestionType } from "../types";

export const questions: QuestionType[] = [
  {
    id: 1,
    question: "First of all, let's get this out of the way... Are you an Apple or Android type, or both?",
    options: [
      { text: "iOS (Apple)", trait: "apple", description: "Seamless, secure, and deeply integrated with Apple services." },
      { text: "Android", trait: "android", description: "Highly customizable, open, and diverse device selection." },
      { text: "I'm open to both", trait: "any", description: "Show me the absolute best device regardless of operating system." },
    ],
  },
  {
    id: 2,
    question: "What do you spend most of your time doing on your phone?",
    options: [
      { text: "Capturing photos & videos", trait: "camera", description: "Creating social content, travel vlogging, or preserving memories." },
      { text: "Gaming & heavy multitasking", trait: "performance", description: "Playing high-fidelity games, editing media, or working on-the-go." },
      { text: "All-day work & battery life", trait: "battery", description: "Browsing, emailing, social media, and maximizing time away from chargers." },
    ],
  },
  {
    id: 3,
    question: "What is your preference for device size and ergonomics?",
    options: [
      { text: "Cinematic & Immersive", trait: "large_screen", description: "Large displays (6.7\"+) perfect for movies, gaming, and split-screen tasks." },
      { text: "Compact & Lightweight", trait: "compact", description: "Easier to hold single-handed and fits comfortably in any pocket." },
    ],
  },
  {
    id: 4,
    question: "Which next-gen feature is an absolute must-have for you?",
    options: [
      { text: "Advanced System AI", trait: "ai", description: "Writing assistants, generative image tools, and context-aware searches." },
      { text: "Raw Processing Power", trait: "performance_expert", description: "State-of-the-art silicon, high refresh-rate display, and zero thermal throttling." },
      { text: "Pro-Grade Optical Zoom", trait: "camera_expert", description: "Periscope telephoto lens, ultra-wide captures, and manual controls." },
      { text: "Blazing Fast Charging", trait: "fast_charge", description: "Getting a full day of battery in under 15 minutes of charging." },
    ],
  },
  {
    id: 5,
    question: "What is your investment strategy for this smartphone?",
    options: [
      { text: "Luxury Flagship", trait: "budget_luxury", description: "Cost is no object. I want the absolute pinnacle of current technology." },
      { text: "Mid-Range Sweet Spot", trait: "budget_mid", description: "High-end flagship specs balanced with sensible value." },
      { text: "Reliable Essentials", trait: "budget_value", description: "An affordable, solid phone that handles daily tasks perfectly." },
    ],
  },
];