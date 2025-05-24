import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../types';

interface BadgeItemProps {
  badge: Badge;
}

const BadgeItem: React.FC<BadgeItemProps> = ({ badge }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center p-4 ${
        badge.isUnlocked ? 'opacity-100' : 'opacity-50'
      }`}
    >
      <motion.div 
        className={`text-4xl mb-2 bg-gray-100 p-4 rounded-full ${
          badge.isUnlocked ? 'animate-badge-pulse' : ''
        }`}
        whileHover={badge.isUnlocked ? { scale: 1.1, rotate: 5 } : {}}
      >
        {badge.imageUrl}
      </motion.div>
      <h3 className="font-medium text-sm text-gray-800">{badge.name}</h3>
      <p className="text-xs text-gray-500 text-center mt-1">{badge.description}</p>
      {badge.isUnlocked && (
        <span className="mt-2 px-2 py-1 bg-success-100 text-success-700 rounded-full text-xs">
          Unlocked
        </span>
      )}
      {!badge.isUnlocked && (
        <span className="mt-2 px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
          Locked
        </span>
      )}
    </motion.div>
  );
};

export default BadgeItem;