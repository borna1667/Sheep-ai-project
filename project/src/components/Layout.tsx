import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Chatbot from './Chatbot';
import { useGame } from '../context/GameContext';

const Layout: React.FC = () => {
  const { userProfile } = useGame();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      {userProfile && <Chatbot />}
    </div>
  );
};

export default Layout;