import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserProfile, UserProgress, Badge, RecommendedSection } from '../types';
import { badges as initialBadges, recommendedSections } from '../data/recommendations';

interface GameContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  recommendedSections: RecommendedSection[];
  badges: Badge[];
  progress: UserProgress;
  markQuizCompleted: () => void;
  markProductExplored: () => void;
  markApplicationSubmitted: () => void;
  unlockBadge: (badgeId: string) => void;
  addPoints: (points: number) => void;
  resetProgress: () => void;
}

const initialProgress: UserProgress = {
  unlockedBadges: [],
  points: 0,
  level: 1,
  quizCompleted: false,
  productExplored: false,
  applicationSubmitted: false,
};

const GameContext = createContext<GameContextType>({
  userProfile: null,
  setUserProfile: () => {},
  recommendedSections: [],
  badges: [],
  progress: initialProgress,
  markQuizCompleted: () => {},
  markProductExplored: () => {},
  markApplicationSubmitted: () => {},
  unlockBadge: () => {},
  addPoints: () => {},
  resetProgress: () => {},
});

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [badges, setBadges] = useState<Badge[]>([...initialBadges]);
  const [progress, setProgress] = useState<UserProgress>(initialProgress);

  // Get recommended sections based on user profile
  const getRecommendedSections = (): RecommendedSection[] => {
    if (!userProfile) return [];
    
    return recommendedSections
      .filter(section => section.forTypes.includes(userProfile.type))
      .sort((a, b) => a.priority - b.priority);
  };

  // Load progress from localStorage on initial render
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedProgress = localStorage.getItem('userProgress');
    const savedBadges = localStorage.getItem('badges');

    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }

    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }

    if (savedBadges) {
      setBadges(JSON.parse(savedBadges));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }
    
    localStorage.setItem('userProgress', JSON.stringify(progress));
    localStorage.setItem('badges', JSON.stringify(badges));
  }, [userProfile, progress, badges]);

  const markQuizCompleted = () => {
    const updatedProgress = {
      ...progress,
      quizCompleted: true,
      points: progress.points + 100,
    };
    setProgress(updatedProgress);
    unlockBadge('profile-master');
  };

  const markProductExplored = () => {
    const updatedProgress = {
      ...progress,
      productExplored: true,
      points: progress.points + 150,
    };
    setProgress(updatedProgress);
    unlockBadge('product-explorer');
  };

  const markApplicationSubmitted = () => {
    const updatedProgress = {
      ...progress,
      applicationSubmitted: true,
      points: progress.points + 250,
    };
    setProgress(updatedProgress);
    unlockBadge('application-pro');
  };

  const unlockBadge = (badgeId: string) => {
    const updatedBadges = badges.map(badge => 
      badge.id === badgeId ? { ...badge, isUnlocked: true } : badge
    );
    
    setBadges(updatedBadges);
    
    // Update progress
    if (!progress.unlockedBadges.includes(badgeId)) {
      setProgress({
        ...progress,
        unlockedBadges: [...progress.unlockedBadges, badgeId],
      });
    }
    
    // Special case for journey badge - unlock when all main activities are complete
    if (progress.quizCompleted && progress.productExplored && progress.applicationSubmitted) {
      const journeyBadge = badges.find(b => b.id === 'financial-journey');
      if (journeyBadge && !journeyBadge.isUnlocked) {
        setTimeout(() => unlockBadge('financial-journey'), 1000);
      }
    }
  };

  const addPoints = (points: number) => {
    const newPoints = progress.points + points;
    const newLevel = Math.floor(newPoints / 500) + 1;
    
    setProgress({
      ...progress,
      points: newPoints,
      level: newLevel,
    });
  };

  const resetProgress = () => {
    setUserProfile(null);
    setBadges([...initialBadges]);
    setProgress(initialProgress);
    
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userProgress');
    localStorage.removeItem('badges');
  };

  return (
    <GameContext.Provider
      value={{
        userProfile,
        setUserProfile,
        recommendedSections: getRecommendedSections(),
        badges,
        progress,
        markQuizCompleted,
        markProductExplored,
        markApplicationSubmitted,
        unlockBadge,
        addPoints,
        resetProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};