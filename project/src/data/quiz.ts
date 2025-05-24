import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'How would you describe your approach to money?',
    options: [
      {
        text: 'I enjoy spending on experiences and things that make me happy',
        value: 'spender',
        type: 'Spender',
        score: 10,
      },
      {
        text: 'I prioritize saving for the future and rarely make impulse purchases',
        value: 'saver',
        type: 'Saver',
        score: 10,
      },
      {
        text: 'I focus on investments and growing my wealth over time',
        value: 'builder',
        type: 'Builder',
        score: 10,
      },
    ],
  },
  {
    id: 'q2',
    question: 'When you receive unexpected money, what\'s your first instinct?',
    options: [
      {
        text: 'Treat myself to something I\'ve been wanting',
        value: 'spend',
        type: 'Spender',
        score: 15,
      },
      {
        text: 'Put it directly into my savings account',
        value: 'save',
        type: 'Saver',
        score: 15,
      },
      {
        text: 'Look for investment opportunities to grow it',
        value: 'invest',
        type: 'Builder',
        score: 15,
      },
    ],
  },
  {
    id: 'q3',
    question: 'What\'s your primary financial goal right now?',
    options: [
      {
        text: 'Balancing my budget while enjoying life',
        value: 'balance',
        type: 'Spender',
        score: 20,
      },
      {
        text: 'Building an emergency fund and saving for major expenses',
        value: 'emergency',
        type: 'Saver',
        score: 20,
      },
      {
        text: 'Creating multiple income streams and growing net worth',
        value: 'growth',
        type: 'Builder',
        score: 20,
      },
    ],
  },
  {
    id: 'q4',
    question: 'How do you feel about financial risk?',
    options: [
      {
        text: 'I prefer convenience and don\'t think much about risk',
        value: 'low_risk_awareness',
        type: 'Spender',
        score: 15,
      },
      {
        text: 'I avoid risk and prefer guaranteed returns',
        value: 'risk_averse',
        type: 'Saver',
        score: 15,
      },
      {
        text: 'I\'m comfortable with calculated risks for better returns',
        value: 'calculated_risk',
        type: 'Builder',
        score: 15,
      },
    ],
  },
  {
    id: 'q5',
    question: 'What would you do with a significant pay raise?',
    options: [
      {
        text: 'Upgrade my lifestyle and enjoy the fruits of my labor',
        value: 'lifestyle_upgrade',
        type: 'Spender',
        score: 25,
      },
      {
        text: 'Keep living as I do now and save the difference',
        value: 'save_more',
        type: 'Saver',
        score: 25,
      },
      {
        text: 'Invest most of it and look for opportunities to grow wealth',
        value: 'invest_more',
        type: 'Builder',
        score: 25,
      },
    ],
  },
];