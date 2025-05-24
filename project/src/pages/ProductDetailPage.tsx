import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Check } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { products } from '../data/products';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { userProfile, unlockBadge } = useGame();
  const [amount, setAmount] = useState(1000);
  const [calculationResult, setCalculationResult] = useState<number | null>(null);
  
  const product = products.find(p => p.id === productId);
  
  useEffect(() => {
    if (!userProfile) {
      navigate('/');
    }
    
    if (!product) {
      navigate('/products');
    }
  }, [userProfile, product, navigate]);
  
  if (!product || !userProfile) {
    return null;
  }
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setAmount(value);
  };
  
  const calculateResult = () => {
    let result = 0;
    
    if (product.calculatorType === 'cashback') {
      // Simple 2% cashback calculation
      result = amount * 0.02;
    } else if (product.calculatorType === 'savings') {
      // Simple 3% APY calculation for 1 year
      result = amount * 0.03;
    } else if (product.calculatorType === 'investment') {
      // Simple 7% annual return calculation for 1 year
      result = amount * 0.07;
    }
    
    setCalculationResult(result);
    unlockBadge('product-explorer');
  };
  
  const isRecommended = product.forTypes.includes(userProfile.type);
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate('/products')}
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        Back to Products
      </button>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-64"
              src={product.imageUrl}
              alt={product.name}
            />
          </div>
          <div className="p-8">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              {isRecommended && (
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                  Recommended
                </span>
              )}
            </div>
            
            <p className="mt-2 text-gray-600">{product.description}</p>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Benefits</h3>
              <ul className="mt-2 space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <button
                onClick={() => navigate('/application')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Apply Now
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {product.calculatorType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {product.calculatorType === 'cashback' && 'Cashback Calculator'}
            {product.calculatorType === 'savings' && 'Savings Calculator'}
            {product.calculatorType === 'investment' && 'Investment Calculator'}
          </h2>
          
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              {product.calculatorType === 'cashback' && 'Monthly Spending'}
              {product.calculatorType === 'savings' && 'Initial Deposit'}
              {product.calculatorType === 'investment' && 'Investment Amount'}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                min="100"
                max="100000"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <button
            onClick={calculateResult}
            className="w-full md:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Calculate
          </button>
          
          {calculationResult !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-4 bg-primary-50 rounded-lg"
            >
              <h3 className="text-lg font-medium text-gray-900">Your Result</h3>
              <div className="mt-2">
                {product.calculatorType === 'cashback' && (
                  <p className="text-gray-600">
                    With <span className="font-semibold">${amount}</span> in monthly spending,
                    you would earn about <span className="font-semibold text-success-600">${calculationResult.toFixed(2)}</span> in cashback rewards each month.
                  </p>
                )}
                
                {product.calculatorType === 'savings' && (
                  <p className="text-gray-600">
                    With a <span className="font-semibold">${amount}</span> deposit,
                    you would earn approximately <span className="font-semibold text-success-600">${calculationResult.toFixed(2)}</span> in interest after one year.
                  </p>
                )}
                
                {product.calculatorType === 'investment' && (
                  <p className="text-gray-600">
                    With a <span className="font-semibold">${amount}</span> investment,
                    you could potentially earn <span className="font-semibold text-success-600">${calculationResult.toFixed(2)}</span> in returns after one year.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ProductDetailPage;