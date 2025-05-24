import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGame } from '../context/GameContext';
import BadgeItem from '../components/BadgeItem';
import { Check, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

const CompletionPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, badges, progress, unlockBadge } = useGame();
  
  useEffect(() => {
    if (!userProfile) {
      navigate('/');
      return;
    }
    
    // Run confetti when component mounts
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    
    const runConfetti = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#2563EB', '#8B5CF6', '#10B981'],
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#2563EB', '#8B5CF6', '#10B981'],
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(runConfetti);
      }
    };
    
    runConfetti();
    
    // Unlock the final badge if not already unlocked
    const journeyBadge = badges.find(b => b.id === 'financial-journey');
    if (journeyBadge && !journeyBadge.isUnlocked) {
      setTimeout(() => {
        unlockBadge('financial-journey');
      }, 1000);
    }
  }, [userProfile, badges, navigate, unlockBadge]);
  
  if (!userProfile) {
    return null;
  }
  
  const unlockedBadges = badges.filter(badge => badge.isUnlocked);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="text-center p-8 bg-primary-600 text-white">
          <div className="relative mx-auto h-16 w-16 rounded-full bg-white p-2 flex items-center justify-center">
            <img src={logo} alt="FinancePath Logo" className="h-12 w-12 object-contain" />
          </div>
          <h1 className="mt-4 text-3xl font-bold">Congratulations!</h1>
          <p className="mt-2 text-lg text-primary-100">
            You've completed your financial journey.
          </p>
        </div>
        
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Journey Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-primary-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Financial Personality</p>
                <p className="text-2xl font-bold text-primary-700">{userProfile.type}</p>
              </div>
              
              <div className="bg-secondary-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Total Points</p>
                <p className="text-2xl font-bold text-secondary-700">{progress.points}</p>
              </div>
              
              <div className="bg-accent-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Badges Earned</p>
                <p className="text-2xl font-bold text-accent-700">{unlockedBadges.length}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Missions</h2>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-success-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Completed Your Profile</p>
                  <p className="text-sm text-gray-500">Discovered your financial personality</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-success-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Explored Products</p>
                  <p className="text-sm text-gray-500">Found financial products that match your needs</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-success-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Submitted Application</p>
                  <p className="text-sm text-gray-500">Completed your financial product application</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Badges</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {badges.map((badge) => (
                <BadgeItem key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-lg font-medium text-gray-900 mb-4">
              What would you like to do next?
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Return to Dashboard
              </button>
              
              <button
                onClick={() => window.open('https://example.com/share', '_blank')}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Share Your Journey
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompletionPage;