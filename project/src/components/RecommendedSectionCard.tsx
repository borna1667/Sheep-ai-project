import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';
import { RecommendedSection } from '../types';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';

interface RecommendedSectionCardProps {
  section: RecommendedSection;
  index: number;
}

const RecommendedSectionCard: React.FC<RecommendedSectionCardProps> = ({ section, index }) => {
  const navigate = useNavigate();
  
  const sectionProducts = products.filter(product => 
    section.productIds.includes(product.id)
  );
  
  const handleClick = () => {
    navigate('/products');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
      onClick={handleClick}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              <div className="flex items-center text-sm text-primary-600">
                <span className="px-2 py-1 bg-primary-100 rounded-full text-xs font-medium">
                  Recommended
                </span>
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          {section.description}
        </p>
        
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Featured Products:
          </p>
          {sectionProducts.slice(0, 2).map((product, idx) => (
            <div key={product.id} className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-primary-400 rounded-full mr-2"></div>
              {product.name}
            </div>
          ))}
          {sectionProducts.length > 2 && (
            <div className="text-sm text-primary-600 font-medium">
              +{sectionProducts.length - 2} more products
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {sectionProducts.length} product{sectionProducts.length !== 1 ? 's' : ''} available
            </span>
            <motion.div
              className="flex items-center text-primary-600 text-sm font-medium"
              whileHover={{ x: 2 }}
            >
              Explore
              <ChevronRight className="w-4 h-4 ml-1" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendedSectionCard;
