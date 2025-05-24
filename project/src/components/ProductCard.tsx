import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

interface ProductCardProps {
  product: Product;
  isRecommended: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isRecommended }) => {
  const navigate = useNavigate();

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
        <img
          src={logo}
          alt="FinancePath Logo"
          className="w-32 h-32 object-contain mx-auto"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-2 text-gray-600">{product.description}</p>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900">Benefits</h4>
          <ul className="mt-2 space-y-2">
            {product.benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-success-500 mr-2 flex-shrink-0 mt-0.5" />
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