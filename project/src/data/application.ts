import { ApplicationStep } from '../types';

export const applicationSteps: ApplicationStep[] = [
  {
    id: 'personal-info',
    name: 'Personal Information',
    fields: [
      {
        id: 'fullName',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Enter your full name',
        required: true,
      },
      {
        id: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'your@email.com',
        required: true,
      },
      {
        id: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: '+385 xx xxx xxxx',
        required: true,
      },
      {
        id: 'dob',
        label: 'Date of Birth',
        type: 'date',
        required: true,
      },
    ],
  },
  {
    id: 'financial-info',
    name: 'Financial Information',
    fields: [
      {
        id: 'income',
        label: 'Annual Income (EUR)',
        type: 'number',
        placeholder: 'Enter your annual income in EUR',
        required: true,
      },
      {
        id: 'employment',
        label: 'Employment Status',
        type: 'select',
        required: true,
        options: [
          'Full-time',
          'Part-time',
          'Self-employed',
          'Student',
          'Retired',
          'Unemployed',
        ],
      },
      {
        id: 'housing',
        label: 'Housing Situation',
        type: 'select',
        required: true,
        options: ['Own', 'Rent', 'Living with family', 'Other'],
      },
      {
        id: 'expenses',
        label: 'Monthly Expenses (EUR)',
        type: 'number',
        placeholder: 'Estimate your monthly expenses in EUR',
        required: true,
      },
    ],
  },
  {
    id: 'verification',
    name: 'Verification',
    fields: [
      {
        id: 'oib',
        label: 'OIB (Personal Identification Number)',
        type: 'text',
        placeholder: 'Enter your 11-digit OIB',
        required: true,
      },
      {
        id: 'agreement',
        label: 'I agree to the terms and conditions',
        type: 'checkbox',
        required: true,
      },
      {
        id: 'consent',
        label: 'I consent to credit check',
        type: 'checkbox',
        required: true,
      },
      {
        id: 'marketing',
        label: 'I would like to receive product updates and offers',
        type: 'checkbox',
        required: false,
      },
    ],
  },
];