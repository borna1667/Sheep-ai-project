import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'cashback-card',
    name: 'Premium Rewards Card',
    description: 'Earn cashback on every purchase and enjoy premium travel benefits with no annual fee.',
    forTypes: ['Spender'],
    benefits: [
      '3% cashback on dining and entertainment',
      '2% cashback on travel expenses',
      '1% cashback on all other purchases',
      'No foreign transaction fees',
      'Purchase protection and extended warranty',
    ],
    calculatorType: 'cashback',
  },
  {
    id: 'high-yield-savings',
    name: 'High-Yield Savings Account',
    description: 'Grow your savings faster with our competitive interest rates and zero monthly fees.',
    forTypes: ['Saver'],
    benefits: [
      'Industry-leading APY',
      'No minimum balance requirements',
      'No monthly maintenance fees',
      'FDIC insured up to $250,000',
      'Easy transfers between accounts',
    ],
    calculatorType: 'savings',
  },
  {
    id: 'investment-portfolio',
    name: 'Smart Investment Portfolio',
    description: 'Build wealth with our professionally managed investment portfolios tailored to your goals.',
    forTypes: ['Builder'],
    benefits: [
      'Diversified investment strategies',
      'Low management fees',
      'Automatic rebalancing',
      'Tax-efficient investing',
      'Personalized financial advice',
    ],
    calculatorType: 'investment',
  },
  {
    id: 'balanced-account',
    name: 'Balanced Banking Account',
    description: 'The perfect account for everyday banking with smart saving features built in.',
    forTypes: ['Spender', 'Saver'],
    benefits: [
      'No monthly fees with direct deposit',
      'Automatic roundup to savings on purchases',
      'Early paycheck access',
      'Budgeting and spending insights',
      'Fee-free ATM network',
    ],
  },
  {
    id: 'growth-fund',
    name: 'Long-Term Growth Fund',
    description: 'Set yourself up for future success with our expertly managed growth-oriented investment fund.',
    forTypes: ['Saver', 'Builder'],
    benefits: [
      'Focus on long-term capital appreciation',
      'Professionally managed portfolio',
      'Regular investment opportunities',
      'Automated contribution options',
      'Comprehensive performance reporting',
    ],
    calculatorType: 'investment',
  },
];