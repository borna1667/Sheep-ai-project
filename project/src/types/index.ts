// User profile types
export type UserProfileType = 'Spender' | 'Saver' | 'Builder';

export interface UserProfile {
  type: UserProfileType;
  score: number;
  name?: string;
  email?: string;
  risk?: 'Low' | 'Medium' | 'High';
  goals?: string[];
}

// Quiz types
export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    value: string;
    type: UserProfileType;
    score: number;
  }[];
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  forTypes: UserProfileType[];
  benefits: string[];
  imageUrl: string;
  calculatorType?: 'cashback' | 'savings' | 'investment';
}

// Mission types
export interface Mission {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  points: number;
  badgeId?: string;
}

// Badge types
export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isUnlocked: boolean;
}

// Chatbot types
export interface ChatbotQuestion {
  id: string;
  question: string;
  answer: string;
}

// Application form types
export interface ApplicationStep {
  id: string;
  name: string;
  fields: {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    required: boolean;
    options?: string[];
  }[];
}

// Progress types
export interface UserProgress {
  completedMissions: string[];
  unlockedBadges: string[];
  points: number;
  level: number;
  quizCompleted: boolean;
  productExplored: boolean;
  applicationSubmitted: boolean;
}