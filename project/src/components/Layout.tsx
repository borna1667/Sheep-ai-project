import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Chatbot from './Chatbot';
import { useGame } from '../context/GameContext';

const Layout: React.FC = () => {
  const { userProfile } = useGame();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      {userProfile && <Chatbot />}
    </div>
  );
};

export default Layout;