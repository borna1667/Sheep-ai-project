import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import { Award, Home, LogOut, Menu, X, Zap, Star, Trophy } from 'lucide-react';

const Header: React.FC = () => {
  const { progress, resetProgress, userProfile } = useGame();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      resetProgress();
      navigate('/');
    }
  };

  if (!userProfile) return null;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20' 
        : 'bg-gradient-to-r from-primary-50/90 via-secondary-50/90 to-white/90 backdrop-blur-sm'
    }`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-secondary-500/5 to-white/5 animate-pulse"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <div className="flex items-center group">
            <div 
              onClick={() => navigate('/dashboard')} 
              className="flex items-center cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="h-10">
                <img src="/src/assets/otpbanka-transparent.png" alt="Logo" className="h-full" />
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Progress Stats */}
            <div className="flex items-center space-x-4">
              {/* Level Badge */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-sm border border-primary-200/50 px-4 py-2 rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-bold text-primary-700">Level {progress.level}</span>
                  </div>
                </div>
              </div>

              {/* Points Badge */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-sm border border-secondary-200/50 px-4 py-2 rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-secondary-600" />
                    <span className="text-sm font-bold text-secondary-700">{progress.points}</span>
                    <span className="text-xs text-secondary-500">pts</span>
                  </div>
                </div>
              </div>

              {/* Badges Count */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-sm border border-primary-200/50 px-4 py-2 rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-bold text-primary-700">{progress.unlockedBadges.length}</span>
                    <span className="text-xs text-primary-500">badges</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="group relative p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 hover:bg-white/80 hover:border-primary-200 transition-all duration-300 shadow-sm hover:shadow-md"
                title="Dashboard"
              >
                <Home className="h-5 w-5 text-gray-600 group-hover:text-primary-600 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={handleReset}
                className="group relative p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 hover:bg-error-50 hover:border-error-200 transition-all duration-300 shadow-sm hover:shadow-md"
                title="Reset Progress"
              >
                <LogOut className="h-5 w-5 text-gray-600 group-hover:text-error-600 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-error-500/20 to-error-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group relative p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 hover:bg-white/80 transition-all duration-300 shadow-sm"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 group-hover:text-primary-600 transition-colors duration-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 group-hover:text-primary-600 transition-colors duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="p-6 space-y-6">
              {/* Mobile Progress Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-3 rounded-xl text-center">
                  <Zap className="h-5 w-5 text-primary-600 mx-auto mb-1" />
                  <div className="text-sm font-bold text-primary-700">Level {progress.level}</div>
                </div>
                <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-3 rounded-xl text-center">
                  <Star className="h-5 w-5 text-secondary-600 mx-auto mb-1" />
                  <div className="text-sm font-bold text-secondary-700">{progress.points}</div>
                  <div className="text-xs text-secondary-500">points</div>
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-3 rounded-xl text-center">
                  <Trophy className="h-5 w-5 text-primary-600 mx-auto mb-1" />
                  <div className="text-sm font-bold text-primary-700">{progress.unlockedBadges.length}</div>
                  <div className="text-xs text-primary-500">badges</div>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl text-primary-700 font-medium hover:from-primary-100 hover:to-primary-200 transition-all duration-300"
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
                
                <button
                  onClick={() => {
                    handleReset();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-error-50 to-error-100 rounded-xl text-error-700 font-medium hover:from-error-100 hover:to-error-200 transition-all duration-300"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Reset Progress</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;