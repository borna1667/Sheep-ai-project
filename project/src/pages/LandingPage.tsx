import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, TrendingUp, ShieldCheck } from 'lucide-react';
import { useGame } from '../context/GameContext';
import logo from '../assets/logo.png';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useGame();
  
  React.useEffect(() => {
    if (userProfile) {
      navigate('/dashboard');
    }
  }, [userProfile, navigate]);

  const features = [
    {
      icon: <TrendingUp className="h-6 w-6 text-primary-500" />,
      title: 'Personalized Recommendations',
      description: 'Get financial products tailored to your unique profile and goals.',
    },
    {
      icon: <Award className="h-6 w-6 text-primary-500" />,
      title: 'Track Your Progress',
      description: 'Earn points and badges as you take steps toward financial wellness.',
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary-500" />,
      title: 'Secure & Simple',
      description: 'Your information is protected while you enjoy a streamlined experience.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                >
                  <span className="block">Your Path to</span>{' '}
                  <span className="block text-primary-600">Financial Wellness</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                >
                  Discover your financial personality, complete missions, and find the perfect products for your unique needs. Start your journey today.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                >
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => navigate('/quiz')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                    >
                      Start Your Journey
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => navigate('/learn-more')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Learn More
                    </button>
                  </div>
                </motion.div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center bg-gray-50">
          <img
            className="h-56 w-full object-contain sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={logo}
            alt="FinancePath Logo"
          />
        </div>
      </div>

      {/* Features section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to manage your finances
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Discover your financial personality and get personalized recommendations to help you reach your goals.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="relative"
                >
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-white text-primary-600 border border-primary-200">
                      {feature.icon}
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-primary-200">Start your journey today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => navigate('/quiz')}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;