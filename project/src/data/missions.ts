import { Mission, Badge } from '../types';

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

export const missions: Mission[] = [
  {
    id: 'complete-profile',
    name: 'Complete Your Profile',
    description: 'Take our quick quiz to discover your financial personality',
    isCompleted: false,
    points: 100,
    badgeId: 'profile-master',
  },
  {
    id: 'explore-product',
    name: 'Explore Products',
    description: 'Find the perfect financial products for your needs',
    isCompleted: false,
    points: 150,
    badgeId: 'product-explorer',
  },
  {
    id: 'submit-application',
    name: 'Submit Application',
    description: 'Complete a simple application to get started',
    isCompleted: false,
    points: 250,
    badgeId: 'application-pro',
  },
];