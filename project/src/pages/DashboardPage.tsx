import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import MissionCard from '../components/MissionCard';
import BadgeItem from '../components/BadgeItem';
import { TrendingUp, Award, BadgeCheck, LineChart } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, missions, badges, progress } = useGame();
  
  useEffect(() => {
    if (!userProfile) {
      navigate('/');
    }
  }, [userProfile, navigate]);
  
  if (!userProfile) {
    return null;
  }
  
  const renderProfileTypeBadge = () => {
    switch (userProfile.type) {
      case 'Spender':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <LineChart className="w-4 h-4 mr-1" />
            Spender
          </div>
        );
      case 'Saver':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <TrendingUp className="w-4 h-4 mr-1" />
            Saver
          </div>
        );
      case 'Builder':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            <Award className="w-4 h-4 mr-1" />
            Builder
          </div>
        );
      default:
        return null;
    }
  };
  
  const progressPercentage = (progress.completedMissions.length / missions.length) * 100;
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {userProfile.name}!
                </h1>
                <div className="mt-2 flex items-center">
                  {renderProfileTypeBadge()}
                  <span className="ml-2 text-gray-500">Your Financial Personality</span>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center">
                <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  Level {progress.level}
                </div>
                <div className="ml-4 bg-secondary-50 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {progress.points} Points
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-primary-600 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Missions</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {missions.map((mission, index) => {
            // Determine if the mission is unlocked
            let isUnlocked = false;
            if (mission.id === 'complete-profile') {
              isUnlocked = true;
            } else if (mission.id === 'explore-product') {
              isUnlocked = progress.quizCompleted;
            } else if (mission.id === 'submit-application') {
              isUnlocked = progress.productExplored;
            }
            
            return (
              <MissionCard
                key={mission.id}
                mission={mission}
                index={index}
                isUnlocked={isUnlocked}
              />
            );
          })}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Badges</h2>
          <div className="flex items-center text-primary-600 text-sm">
            <BadgeCheck className="w-5 h-5 mr-1" />
            <span>{badges.filter(b => b.isUnlocked).length} of {badges.length} Unlocked</span>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <BadgeItem key={badge.id} badge={badge} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;