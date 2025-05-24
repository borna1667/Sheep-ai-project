import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { quizQuestions } from '../data/quiz';
import { UserProfileType, UserProfile } from '../types';
import ProgressBar from '../components/ProgressBar';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserProfile, completeMission } = useGame();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const handleAnswer = (value: string, type: UserProfileType, score: number) => {
    setIsTransitioning(true);
    
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: { value, type, score },
    };
    
    setAnswers(newAnswers);
    
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResult(true);
      }
      setIsTransitioning(false);
    }, 500);
  };

  const calculateResult = (): UserProfile => {
    const typeScores: Record<UserProfileType, number> = {
      Spender: 0,
      Saver: 0,
      Builder: 0,
    };
    
    let totalScore = 0;
    
    Object.values(answers).forEach(answer => {
      if (answer) {
        typeScores[answer.type] += answer.score;
        totalScore += answer.score;
      }
    });
    
    const maxType = Object.entries(typeScores).reduce(
      (max, [type, score]) => (score > max.score ? { type: type as UserProfileType, score } : max),
      { type: 'Saver' as UserProfileType, score: 0 }
    );
    
    return {
      type: maxType.type,
      score: totalScore,
      name,
      email,
    };
  };

  const handleSubmit = () => {
    const result = calculateResult();
    setUserProfile(result);
    completeMission('complete-profile');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Your Financial Personality</h1>
        <p className="text-lg text-gray-600">
          Answer a few questions to help us understand your financial preferences and goals.
        </p>
      </div>
      
      <ProgressBar
        currentStep={showResult ? quizQuestions.length + 1 : currentQuestionIndex + 1}
        totalSteps={quizQuestions.length + 1}
      />
      
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="quiz-question"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {currentQuestion.question}
              </h2>
              
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    onClick={() => !isTransitioning && handleAnswer(option.value, option.type, option.score)}
                    className="w-full text-left p-4 border rounded-lg transition-colors hover:bg-primary-50 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <p className="font-medium text-gray-900">{option.text}</p>
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-6 text-sm text-gray-500 text-center">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="quiz-result"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Almost There! Tell Us a Bit About Yourself
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <motion.button
                  onClick={handleSubmit}
                  className="w-full py-3 px-4 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!name || !email}
                >
                  Complete Profile
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;