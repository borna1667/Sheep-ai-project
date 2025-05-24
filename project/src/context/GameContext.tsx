import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserProfile, UserProgress, Badge, Mission } from '../types';
import { badges as initialBadges, missions as initialMissions } from '../data/missions';

interface GameContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  missions: Mission[];
  badges: Badge[];
  progress: UserProgress;
  completeMission: (missionId: string) => void;
  unlockBadge: (badgeId: string) => void;
  addPoints: (points: number) => void;
  resetProgress: () => void;
}

const defaultProgress: UserProgress = {
  completedMissions: [],
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
  missions: [],
  badges: [],
  progress: defaultProgress,
  completeMission: () => {},
  unlockBadge: () => {},
  addPoints: () => {},
  resetProgress: () => {},
});

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [missions, setMissions] = useState<Mission[]>([...initialMissions]);
  const [badges, setBadges] = useState<Badge[]>([...initialBadges]);
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);

  // Load progress from localStorage on initial render
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedProgress = localStorage.getItem('userProgress');
    const savedMissions = localStorage.getItem('missions');
    const savedBadges = localStorage.getItem('badges');

    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }

    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }

    if (savedMissions) {
      setMissions(JSON.parse(savedMissions));
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
    localStorage.setItem('missions', JSON.stringify(missions));
    localStorage.setItem('badges', JSON.stringify(badges));
  }, [userProfile, progress, missions, badges]);

  const completeMission = (missionId: string) => {
    // Update missions
    const updatedMissions = missions.map(mission => 
      mission.id === missionId ? { ...mission, isCompleted: true } : mission
    );
    
    setMissions(updatedMissions);
    
    // Update progress
    const mission = missions.find(m => m.id === missionId);
    if (mission) {
      const updatedProgress = {
        ...progress,
        completedMissions: [...progress.completedMissions, missionId],
        points: progress.points + mission.points,
      };
      
      // Update specific flags based on mission
      if (missionId === 'complete-profile') {
        updatedProgress.quizCompleted = true;
      } else if (missionId === 'explore-product') {
        updatedProgress.productExplored = true;
      } else if (missionId === 'submit-application') {
        updatedProgress.applicationSubmitted = true;
      }
      
      setProgress(updatedProgress);
      
      // Unlock badge if available
      if (mission.badgeId) {
        unlockBadge(mission.badgeId);
      }
    }
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
    
    // Special case for journey badge
    if (progress.completedMissions.length === initialMissions.length - 1 && badgeId === 'application-pro') {
      // Unlock the journey badge when all missions are complete
      const journeyBadge = badges.find(b => b.id === 'financial-journey');
      if (journeyBadge) {
        unlockBadge('financial-journey');
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
    setMissions([...initialMissions]);
    setBadges([...initialBadges]);
    setProgress(defaultProgress);
    
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userProgress');
    localStorage.removeItem('missions');
    localStorage.removeItem('badges');
  };

  return (
    <GameContext.Provider
      value={{
        userProfile,
        setUserProfile,
        missions,
        badges,
        progress,
        completeMission,
        unlockBadge,
        addPoints,
        resetProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};