import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, labels = [] }) => {
  const percentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full mb-8">
      <div className="relative">
        {/* Background bar */}
        <div className="h-2 bg-gray-200 rounded-full" />
        
        {/* Progress bar */}
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 h-2 bg-primary-600 rounded-full"
        />
        
        {/* Step markers */}
        <div className="relative flex justify-between mt-2">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isActive = index < currentStep;
            const isCurrent = index === currentStep - 1;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ 
                    scale: isActive ? 1 : 0.8, 
                    opacity: isActive ? 1 : 0.5,
                    backgroundColor: isCurrent ? '#2563EB' : isActive ? '#3B82F6' : '#E5E7EB'
                  }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isCurrent ? 'ring-4 ring-primary-100' : ''
                  }`}
                >
                  <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}>
                    {index + 1}
                  </span>
                </motion.div>
                
                {labels && labels[index] && (
                  <span className={`text-xs mt-1 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
                    {labels[index]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;