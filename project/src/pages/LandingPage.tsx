import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, TrendingUp, ShieldCheck, ChevronRight, User, Briefcase, LineChart, ArrowRight, Check } from 'lucide-react';
import { useGame } from '../context/GameContext';
import otpLogo from '../assets/otpbanka-transparent.png';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useGame();
  
  React.useEffect(() => {
    if (userProfile) {
      navigate('/dashboard');
    }
  }, [userProfile, navigate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const personalityTypes = [
    {
      type: 'Spender',
      icon: <User className="h-8 w-8 text-white" />,
      description: 'You enjoy experiences and immediate enjoyment. Focus on finding ways to maximize value while still enjoying life.',
      color: 'bg-primary-600'
    },
    {
      type: 'Saver',
      icon: <Briefcase className="h-8 w-8 text-white" />,
      description: 'You prioritize security and future needs. Discover strategies to optimize your savings and ensure financial stability.',
      color: 'bg-secondary-500'
    },
    {
      type: 'Builder',
      icon: <LineChart className="h-8 w-8 text-white" />,
      description: 'You concentrate on growth and wealth accumulation. Explore investment opportunities tailored to your goals.',
      color: 'bg-primary-500'
    }
  ];

  const features = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Personalized Recommendations',
      description: 'Get financial products tailored to your unique profile and goals. We analyze your preferences to suggest the best options.',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Track Your Progress',
      description: 'Earn points and badges as you take steps toward financial wellness. Visualize your journey to financial success.',
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: 'Secure & Simple',
      description: 'Your information is protected while you enjoy a streamlined experience. Bank with confidence and peace of mind.',
    },
  ];

  const benefits = [
    'Personalized banking solutions',
    'Expert financial guidance',
    'Transparent fee structure',
    'Advanced online banking tools'
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero section with curved wave design */}
      <div className="relative">
        {/* Green gradient background with wave pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-600 to-primary-700 h-[700px] md:h-[750px]">
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,288L48,272C96,256,192,224,288,224C384,224,480,256,576,272C672,288,768,288,864,272C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 md:pt-16 md:pb-32">
          <div className="flex flex-col items-center text-center">
            {/* Centered content */}
            <motion.div 
              className="w-full max-w-2xl"
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
            >
              <div className="mb-4 md:mb-6 flex justify-center">
                <div className="bg-white/90 p-2 md:p-3 rounded-full shadow-lg">
                  <img src={otpLogo} alt="OTP Banka" className="h-20 md:h-20" />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Your Partner for<br />
                <span className="text-secondary-300">Financial Success</span>
              </h1>
              
              <p className="mt-3 md:mt-4 text-lg text-white/90 max-w-xl mx-auto">
                Discover your financial personality, explore personalized recommendations, and find the perfect banking products for your unique needs with OTP Banka.
              </p>
              
              <motion.div 
                className="mt-6 md:mt-8 mb-4 md:mb-6 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/quiz')}
                  className="px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-xl shadow-lg shadow-primary-900/20 flex items-center justify-center transition-all"
                >
                  Start Your Journey
                  <ChevronRight className="ml-2 h-5 w-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/learn-more')}
                  className="px-8 py-4 bg-white hover:bg-gray-50 text-primary-700 font-medium rounded-xl shadow-lg shadow-primary-900/10 flex items-center justify-center transition-all"
                >
                  Learn More
                </motion.button>
              </motion.div>

              <motion.div 
                className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8 md:mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-secondary-300" />
                    </div>
                    <p className="ml-2 text-sm text-white font-medium">{benefit}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Financial Personality Types Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Discover Your Financial Personality</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Everyone has a unique approach to managing money. Find out which type describes you best and get tailored recommendations.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personalityTypes.map((type, index) => (
              <motion.div
                key={type.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300"
              >
                <div className={`${type.color} p-6 flex justify-center`}>
                  <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                    {type.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">{type.type}</h3>
                  <p className="mt-3 text-gray-600">{type.description}</p>
                  <div className="mt-6">
                    <button
                      onClick={() => navigate('/quiz')}
                      className="text-primary-600 font-medium flex items-center hover:text-primary-800 transition-colors"
                    >
                      Learn if this is you
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-base text-primary-600 font-semibold uppercase tracking-wide">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              A better way to manage your finances
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Discover how OTP Banka helps you achieve your financial goals with personalized recommendations.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-gray-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 -translate-x-20 -translate-y-20 opacity-10">
              <svg width="404" height="384" fill="none" viewBox="0 0 404 384" className="text-primary-500">
                <defs>
                  <pattern id="testimonial-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="404" height="384" fill="url(#testimonial-pattern)" />
              </svg>
            </div>
            <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12 overflow-hidden">
              <div className="absolute top-0 right-0 h-full w-1/2 bg-primary-50 opacity-50 rounded-l-full transform translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-3/5 pr-0 md:pr-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose OTP Banka?</h2>
                    <p className="text-lg text-gray-600 mb-8">
                      We're dedicated to providing personalized financial guidance that helps you achieve your goals. 
                      Our innovative approach starts with understanding your unique financial personality.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-md bg-primary-100 flex items-center justify-center text-primary-600">
                          <Check className="h-4 w-4" />
                        </div>
                        <p className="ml-3 text-gray-600">Tailored financial advice</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-md bg-primary-100 flex items-center justify-center text-primary-600">
                          <Check className="h-4 w-4" />
                        </div>
                        <p className="ml-3 text-gray-600">Modern banking solutions</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-md bg-primary-100 flex items-center justify-center text-primary-600">
                          <Check className="h-4 w-4" />
                        </div>
                        <p className="ml-3 text-gray-600">Competitive interest rates</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-md bg-primary-100 flex items-center justify-center text-primary-600">
                          <Check className="h-4 w-4" />
                        </div>
                        <p className="ml-3 text-gray-600">Innovative digital tools</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate('/quiz')}
                      className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-all"
                    >
                      Start Your Journey
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.button>
                  </div>
                  <div className="md:w-2/5 mt-8 md:mt-0">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg h-full bg-gradient-to-br from-primary-600 to-primary-700 flex flex-col items-center justify-center p-8 text-center">
                      <div className="mb-6 text-white/90">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 24H6C6 14.0589 14.0589 6 24 6V14C18.4772 14 14 18.4772 14 24Z" fill="currentColor"/>
                          <path d="M34 24H42C42 14.0589 33.9411 6 24 6V14C29.5228 14 34 18.4772 34 24Z" fill="currentColor"/>
                          <path d="M24 42V34C29.5228 34 34 29.5228 34 24H42C42 33.9411 33.9411 42 24 42Z" fill="currentColor"/>
                          <path d="M24 42V34C18.4772 34 14 29.5228 14 24H6C6 33.9411 14.0589 42 24 42Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <p className="text-xl font-medium text-white mb-6">
                        "OTP Banka helped me understand my financial habits and find the perfect savings account for my needs."
                      </p>
                      <p className="text-white/80 font-medium">
                        - Ana K., OTP Banka Customer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-700 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative px-8 py-12 md:p-12 lg:px-16 lg:py-16">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block">
                <svg width="404" height="384" fill="none" viewBox="0 0 404 384" className="text-secondary-500 opacity-20">
                  <defs>
                    <pattern id="cta-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <rect x="0" y="0" width="4" height="4" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="404" height="384" fill="url(#cta-pattern)" />
                </svg>
              </div>
              
              <div className="relative lg:flex lg:items-center lg:justify-between">
                <div className="lg:w-2/3">
                  <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    <span className="block">Ready to discover your</span>
                    <span className="block text-secondary-300">financial personality?</span>
                  </h2>
                  <p className="mt-4 text-lg text-white/80 max-w-xl">
                    Take our quick quiz to get personalized product recommendations and start your journey to financial success with OTP Banka.
                  </p>
                </div>
                <div className="mt-8 lg:mt-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/quiz')}
                    className="px-10 py-5 bg-secondary-500 hover:bg-secondary-600 text-white font-medium text-lg rounded-xl shadow-lg shadow-primary-900/30 flex items-center justify-center transition-all"
                  >
                    Get Started
                    <ChevronRight className="ml-2 h-6 w-6" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <img src={otpLogo} alt="OTP Banka" className="h-10" />
            </div>
            <p className="mt-4 md:mt-0 text-gray-500 text-sm">
              © {new Date().getFullYear()} OTP Banka. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;