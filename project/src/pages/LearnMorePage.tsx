import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle, User, TrendingUp, CreditCard, LockKeyhole, Trophy } from 'lucide-react';

const LearnMorePage: React.FC = () => {
  const navigate = useNavigate();
  
  const sections = [
    {
      id: 'about',
      title: 'About FinancePath',
      icon: <HelpCircle className="h-6 w-6 text-primary-500" />,
      content: 'FinancePath is an interactive financial onboarding platform designed to help you discover your financial personality, explore tailored products, and take control of your financial future. Through a gamified experience, we make financial decisions engaging and rewarding.',
    },
    {
      id: 'profiles',
      title: 'Financial Personalities',
      icon: <User className="h-6 w-6 text-primary-500" />,
      content: 'We identify three main financial personalities: Spenders focus on experiences and enjoying life now, Savers prioritize security and future stability, and Builders concentrate on growing wealth and investments. Understanding your type helps us recommend the most suitable financial products and strategies.',
    },
    {
      id: 'missions',
      title: 'Missions & Rewards',
      icon: <Trophy className="h-6 w-6 text-primary-500" />,
      content: 'Complete missions to earn points and unlock badges. Each mission is designed to help you take meaningful steps toward your financial goals - from creating your profile to exploring products and completing applications. Track your progress on your personalized dashboard.',
    },
    {
      id: 'products',
      title: 'Personalized Products',
      icon: <CreditCard className="h-6 w-6 text-primary-500" />,
      content: 'Based on your financial personality, we recommend products that align with your preferences and goals. Spenders might benefit from rewards cards, Savers from high-yield savings accounts, and Builders from investment portfolios. We provide detailed information and interactive tools to help you compare options.',
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: <LockKeyhole className="h-6 w-6 text-primary-500" />,
      content: 'Your privacy and security are our top priorities. We use bank-level encryption to protect your information and never share your data with third parties without your consent. Our application process is designed to be simple while maintaining the highest standards of security.',
    },
    {
      id: 'growth',
      title: 'Continuous Growth',
      icon: <TrendingUp className="h-6 w-6 text-primary-500" />,
      content: 'Your financial journey doesn\'t end after completing all missions. We provide ongoing resources, educational content, and personalized recommendations to help you continue growing financially. Check back regularly for new features and opportunities to improve your financial wellness.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900"
        >
          Learn More About FinancePath
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Discover how our platform helps you navigate your financial journey through personalized experiences and engaging missions.
        </motion.p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-primary-50 rounded-full mr-4">
                {section.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
            </div>
            <p className="text-gray-600">{section.content}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
          <button
            onClick={() => navigate('/quiz')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Take the Quiz
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LearnMorePage;