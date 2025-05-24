import { RecommendedSection, Badge } from '../types';

export const badges: Badge[] = [
  {
    id: 'profile-master',
    name: 'Profile Master',
    description: 'Completed your financial profile quiz',
    isUnlocked: false,
  },
  {
    id: 'product-explorer',
    name: 'Product Explorer',
    description: 'Discovered the perfect product for your needs',
    isUnlocked: false,
  },
  {
    id: 'application-pro',
    name: 'Application Pro',
    description: 'Successfully submitted your application',
    isUnlocked: false,
  },
  {
    id: 'financial-journey',
    name: 'Financial Journey',
    description: 'Completed your entire financial onboarding journey',
    isUnlocked: false,
  },
];

export const recommendedSections: RecommendedSection[] = [
  {
    id: 'spender-rewards',
    title: 'Maximize Your Rewards',
    description: 'Earn cashback on your everyday spending with these tailored products',
    productIds: ['cashback-credit', 'premium-rewards'],
    forTypes: ['Spender'],
    priority: 1,
  },
  {
    id: 'spender-lifestyle',
    title: 'Lifestyle Banking',
    description: 'Banking products that fit your active lifestyle and spending habits',
    productIds: ['balanced-account', 'travel-rewards'],
    forTypes: ['Spender'],
    priority: 2,
  },
  {
    id: 'saver-growth',
    title: 'Grow Your Savings',
    description: 'High-yield accounts and conservative investment options for steady growth',
    productIds: ['high-yield-savings', 'balanced-account'],
    forTypes: ['Saver'],
    priority: 1,
  },
  {
    id: 'saver-security',
    title: 'Secure Your Future',
    description: 'Safe and reliable financial products to protect your hard-earned money',
    productIds: ['emergency-fund', 'cd-ladder'],
    forTypes: ['Saver'],
    priority: 2,
  },
  {
    id: 'builder-investments',
    title: 'Build Wealth',
    description: 'Advanced investment products to accelerate your wealth building journey',
    productIds: ['investment-portfolio', 'growth-fund'],
    forTypes: ['Builder'],
    priority: 1,
  },
  {
    id: 'builder-diversification',
    title: 'Diversify Your Portfolio',
    description: 'Expand your investment strategy with diverse financial instruments',
    productIds: ['real-estate-fund', 'international-index'],
    forTypes: ['Builder'],
    priority: 2,
  },
];
