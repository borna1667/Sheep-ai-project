import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronDown } from 'lucide-react';
import { chatbotQuestions } from '../data/chatbot';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setSelectedQuestion(null);
  };

  const selectQuestion = (id: string) => {
    setSelectedQuestion(id);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 md:right-8 w-80 md:w-96 bg-white rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="bg-primary-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-medium">Financial Assistant</h3>
              <button onClick={toggleChatbot} className="text-white hover:text-gray-200">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 h-80 overflow-y-auto">
              <div className="relative mb-4">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full p-3 bg-gray-100 rounded-lg flex justify-between items-center text-left"
                >
                  <span>
                    {selectedQuestion 
                      ? chatbotQuestions.find(q => q.id === selectedQuestion)?.question 
                      : 'Select a question'}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {chatbotQuestions.map(question => (
                      <button
                        key={question.id}
                        onClick={() => selectQuestion(question.id)}
                        className="w-full p-3 text-left hover:bg-gray-100 border-b border-gray-100 last:border-0"
                      >
                        {question.question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {selectedQuestion && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary-50 p-4 rounded-lg"
                >
                  <p className="text-gray-800">
                    {chatbotQuestions.find(q => q.id === selectedQuestion)?.answer}
                  </p>
                </motion.div>
              )}
              
              {!selectedQuestion && (
                <div className="text-center text-gray-500 mt-10">
                  <p>Please select a question above to get helpful information about our financial services.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChatbot}
        className={`fixed bottom-4 right-4 md:right-8 p-4 rounded-full shadow-lg z-50 ${
          isOpen ? 'bg-red-500 text-white' : 'bg-primary-600 text-white'
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </>
  );
};

export default Chatbot;