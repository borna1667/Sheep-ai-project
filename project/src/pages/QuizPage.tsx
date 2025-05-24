import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { quizQuestions } from '../data/quiz';
import { UserProfileType, UserProfile } from '../types';
import ProgressBar from '../components/ProgressBar';

interface QuizAnswer {
  value: string;
  type: UserProfileType;
  score: number;
}

interface AuthForm {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserProfile, markQuizCompleted } = useGame();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>({});
  const [showResult, setShowResult] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('register');
  const [authForm, setAuthForm] = useState<AuthForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [authErrors, setAuthErrors] = useState<Record<string, string>>({});
  const [isAuthenticating, setIsAuthenticating] = useState(false);

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
      if (answer && typeof answer === 'object') {
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
      name: authForm.name,
      email: authForm.email,
    };
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!authForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!authForm.password.trim()) {
      errors.password = 'Password is required';
    } else if (authForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (authMode === 'register') {
      if (!authForm.name.trim()) {
        errors.name = 'Name is required';
      }
      if (!authForm.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (authForm.password !== authForm.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setAuthErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAuth = async () => {
    if (!validateForm()) return;
    
    setIsAuthenticating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (authMode === 'signin') {
      // Check if user exists in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('sheepai_users') || '[]');
      const user = existingUsers.find((u: any) => u.email === authForm.email);
      
      if (!user || user.password !== authForm.password) {
        setAuthErrors({ general: 'Invalid email or password' });
        setIsAuthenticating(false);
        return;
      }
      
      authForm.name = user.name;
    } else {
      // Register new user
      const existingUsers = JSON.parse(localStorage.getItem('sheepai_users') || '[]');
      const userExists = existingUsers.some((u: any) => u.email === authForm.email);
      
      if (userExists) {
        setAuthErrors({ email: 'An account with this email already exists' });
        setIsAuthenticating(false);
        return;
      }
      
      const newUser = {
        name: authForm.name,
        email: authForm.email,
        password: authForm.password,
        createdAt: new Date().toISOString()
      };
      
      existingUsers.push(newUser);
      localStorage.setItem('sheepai_users', JSON.stringify(existingUsers));
    }
    
    // Set authentication token
    localStorage.setItem('sheepai_auth_token', `token_${authForm.email}_${Date.now()}`);
    localStorage.setItem('sheepai_current_user', JSON.stringify({
      name: authForm.name,
      email: authForm.email
    }));
    
    const result = calculateResult();
    setUserProfile(result);
    markQuizCompleted();
    
    setIsAuthenticating(false);
    navigate('/dashboard');
  };

  const proceedToAuth = () => {
    setShowResult(false);
    setShowAuth(true);
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'register' : 'signin');
    setAuthErrors({});
    setAuthForm(prev => ({
      ...prev,
      password: '',
      confirmPassword: ''
    }));
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
        currentStep={showAuth ? quizQuestions.length + 2 : showResult ? quizQuestions.length + 1 : currentQuestionIndex + 1}
        totalSteps={quizQuestions.length + 2}
      />
      
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <AnimatePresence mode="wait">
          {!showResult && !showAuth ? (
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
          ) : showResult ? (
            <motion.div
              key="result-preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center"
            >
              <div className="mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center"
                >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Quiz Complete! 🎉
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Great job! You've completed our financial personality assessment. 
                  Now let's create your account to save your results and start your financial journey.
                </p>
              </div>
              
              <motion.button
                onClick={proceedToAuth}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue to Account Setup
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="auth-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </motion.div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {authMode === 'register' ? 'Create Your Account' : 'Welcome Back'}
                </h2>
                <p className="text-gray-600">
                  {authMode === 'register' 
                    ? 'Join thousands of users taking control of their finances'
                    : 'Sign in to continue your financial journey'
                  }
                </p>
              </div>

              {authErrors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-sm text-red-600">{authErrors.general}</p>
                </motion.div>
              )}

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleAuth(); }}>
                {authMode === 'register' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={authForm.name}
                      onChange={(e) => setAuthForm(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                        authErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {authErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{authErrors.name}</p>
                    )}
                  </motion.div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={authForm.email}
                    onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                      authErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="you@example.com"
                  />
                  {authErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{authErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={authForm.password}
                    onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                      authErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  {authErrors.password && (
                    <p className="mt-1 text-sm text-red-600">{authErrors.password}</p>
                  )}
                </div>

                {authMode === 'register' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={authForm.confirmPassword}
                      onChange={(e) => setAuthForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                        authErrors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Confirm your password"
                    />
                    {authErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{authErrors.confirmPassword}</p>
                    )}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  whileHover={{ scale: isAuthenticating ? 1 : 1.02 }}
                  whileTap={{ scale: isAuthenticating ? 1 : 0.98 }}
                >
                  {isAuthenticating ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {authMode === 'register' ? 'Creating Account...' : 'Signing In...'}
                    </div>
                  ) : (
                    authMode === 'register' ? 'Create Account' : 'Sign In'
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {authMode === 'register' ? 'Already have an account?' : "Don't have an account?"}
                  <button
                    onClick={switchAuthMode}
                    className="ml-1 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {authMode === 'register' ? 'Sign In' : 'Create Account'}
                  </button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;