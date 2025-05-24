import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
import { Mission } from '../types';
import { useNavigate } from 'react-router-dom';

interface MissionCardProps {
  mission: Mission;
  index: number;
  isUnlocked: boolean;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, index, isUnlocked }) => {
  const navigate = useNavigate();
  
  const getPath = () => {
    switch (mission.id) {
      case 'complete-profile':
        return '/quiz';
      case 'explore-product':
        return '/products';
      case 'submit-application':
        return '/application';
      default:
        return '/dashboard';
    }
  };
  
  const handleClick = () => {
    if (isUnlocked) {
      navigate(getPath());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={isUnlocked ? { scale: 1.02 } : {}}
      className={`bg-white rounded-lg shadow p-6 border-l-4 ${
        mission.isCompleted
          ? 'border-success-500'
          : isUnlocked
          ? 'border-primary-500 cursor-pointer'
          : 'border-gray-300 opacity-75'
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{mission.name}</h3>
          <p className="text-gray-600 mt-1">{mission.description}</p>
          
          <div className="mt-4 flex items-center">
            <div className="flex items-center text-sm text-gray-500">
              {mission.isCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-success-500 mr-1" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400 mr-1" />
              )}
              <span>
                {mission.isCompleted ? 'Completed' : isUnlocked ? 'Ready to start' : 'Locked'}
              </span>
            </div>
            
            <div className="ml-4 px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium">
              +{mission.points} points
            </div>
          </div>
        </div>
        
        {!isUnlocked && (
          <div className="bg-gray-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H8m10-9a4 4 0 00-4-4H8a4 4 0 00-4 4v6a4 4 0 004 4h2m10-10v10a4 4 0 01-4 4h-6a4 4 0 01-4-4v-6a4 4 0 014-4h6a4 4 0 014 4v.5" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MissionCard;