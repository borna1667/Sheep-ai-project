import React from 'react';
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import { Award, Home, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { progress, resetProgress, userProfile } = useGame();
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      resetProgress();
      navigate('/');
    }
  };

  if (!userProfile) return null;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span 
              onClick={() => navigate('/dashboard')} 
              className="flex items-center cursor-pointer"
            >
              <Award className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">FinancePath</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="flex items-center">
                <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  Level {progress.level}
                </div>
                <div className="ml-4 bg-secondary-50 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {progress.points} Points
                </div>
                <div className="ml-4 bg-accent-50 text-accent-700 px-3 py-1 rounded-full text-sm font-medium">
                  {progress.unlockedBadges.length} Badges
                </div>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <Home className="h-5 w-5" />
            </button>
            
            <button
              onClick={handleReset}
              className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-gray-100"
              title="Reset Progress"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;