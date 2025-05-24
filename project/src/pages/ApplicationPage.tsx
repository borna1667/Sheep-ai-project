import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGame } from '../context/GameContext';
import ProgressBar from '../components/ProgressBar';
import { applicationSteps } from '../data/application';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const ApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, completeMission } = useGame();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (!userProfile) {
      navigate('/');
    }
  }, [userProfile, navigate]);
  
  const currentStepData = applicationSteps[currentStep - 1];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };
  
  const isStepValid = () => {
    if (!currentStepData) return false;
    
    return currentStepData.fields.every(field => {
      if (!field.required) return true;
      const value = formData[field.id];
      return value !== undefined && value !== '';
    });
  };
  
  const handleNext = () => {
    if (currentStep < applicationSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission
      setIsComplete(true);
      
      // Trigger confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
      
      // Complete mission
      setTimeout(() => {
        completeMission('submit-application');
      }, 1000);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/products');
    }
  };
  
  const handleFinish = () => {
    navigate('/completion');
  };
  
  if (!userProfile) {
    return null;
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Application Form</h1>
        <p className="mt-2 text-lg text-gray-600">
          Complete your application to unlock the final mission.
        </p>
      </div>
      
      <ProgressBar
        currentStep={currentStep}
        totalSteps={applicationSteps.length}
        labels={applicationSteps.map(step => step.name)}
      />
      
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        {!isComplete ? (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {currentStepData.name}
            </h2>
            
            <div className="space-y-6">
              {currentStepData.fields.map(field => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  
                  {field.type === 'checkbox' ? (
                    <div className="flex items-center">
                      <input
                        id={field.id}
                        type="checkbox"
                        checked={formData[field.id] || false}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor={field.id} className="ml-2 block text-sm text-gray-900">
                        {field.label}
                      </label>
                    </div>
                  ) : field.type === 'select' ? (
                    <select
                      id={field.id}
                      value={formData[field.id] || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    >
                      <option value="">Select an option</option>
                      {field.options?.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={handleInputChange}
                      required={field.required}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={handleBack}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <ArrowLeft className="h-4 w-4 inline mr-1" />
                Back
              </button>
              
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isStepValid()
                    ? 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {currentStep < applicationSteps.length ? (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 inline ml-1" />
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success-100">
              <CheckCircle className="h-10 w-10 text-success-600" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-gray-900">Application Submitted!</h2>
            <p className="mt-2 text-gray-600">
              Thank you for completing your application. We've successfully received your information.
            </p>
            <div className="mt-8">
              <button
                onClick={handleFinish}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                View Your Completion
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ApplicationPage;