import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Search } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    if (!userProfile) {
      navigate('/');
    }
  }, [userProfile, navigate]);
  
  if (!userProfile) {
    return null;
  }

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filter products based on user profile
  const recommendedProducts = filteredProducts.filter(product => 
    product.forTypes.includes(userProfile.type)
  );
  
  const otherProducts = filteredProducts.filter(product => 
    !product.forTypes.includes(userProfile.type)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900"
        >
          Personalized Financial Products
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-lg text-gray-600"
        >
          Based on your {userProfile.type} profile, we've selected these products for you.
        </motion.p>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search products"
            />
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isRecommended={true}
            />
          ))}
        </div>
      </div>

      {otherProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Other Products</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isRecommended={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;