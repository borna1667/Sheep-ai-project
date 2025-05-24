import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Layout from './components/Layout';

// Import pages
import LandingPage from './pages/LandingPage';
import QuizPage from './pages/QuizPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ApplicationPage from './pages/ApplicationPage';
import CompletionPage from './pages/CompletionPage';
import LearnMorePage from './pages/LearnMorePage';

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:productId" element={<ProductDetailPage />} />
            <Route path="application" element={<ApplicationPage />} />
            <Route path="completion" element={<CompletionPage />} />
            <Route path="learn-more" element={<LearnMorePage />} />
          </Route>
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;