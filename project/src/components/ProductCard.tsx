import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, CreditCard, PiggyBank, TrendingUp, Wallet, Building, Globe } from 'lucide-react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  isRecommended: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isRecommended }) => {
  const navigate = useNavigate();

  const getProductIcon = (productId: string) => {
    switch (productId) {
      case 'cashback-credit':
      case 'premium-rewards':
      case 'travel-rewards':
        return <CreditCard className="w-16 h-16 text-primary-600" />;
      case 'high-yield-savings':
      case 'emergency-fund':
      case 'cd-ladder':
        return <PiggyBank className="w-16 h-16 text-secondary-600" />;
      case 'investment-portfolio':
      case 'growth-fund':
        return <TrendingUp className="w-16 h-16 text-green-600" />;
      case 'real-estate-fund':
        return <Building className="w-16 h-16 text-blue-600" />;
      case 'international-index':
        return <Globe className="w-16 h-16 text-purple-600" />;
      case 'balanced-account':
        return <Wallet className="w-16 h-16 text-primary-600" />;
      default:
        return <CreditCard className="w-16 h-16 text-gray-600" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className={`bg-white rounded-xl shadow-md overflow-hidden ${
        isRecommended ? 'ring-2 ring-primary-500' : ''
      }`}
    >
      {isRecommended && (
        <div className="bg-primary-500 text-white px-4 py-1 text-sm font-medium text-center">
          Recommended for Your Profile
        </div>
      )}
      
      <div className="h-48 overflow-hidden flex items-center justify-center bg-gray-50">
        {getProductIcon(product.id)}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-2 text-gray-600">{product.description}</p>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900">Benefits</h4>
          <ul className="mt-2 space-y-2">
            {product.benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-secondary-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
