import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RecipesPage from './pages/RecipesPage';
import FavoritesPage from './pages/FavoritesPage';
import { useAuth } from './contexts/AuthContext'; 

const App = () => {
  const { user } = useAuth(); 

  return (
    <Router>
      {user && <Navbar />} 

      <Routes>
        <Route path="/" element={user ? <RecipesPage /> : <LoginPage />} />
        <Route path="/login" element={user ? <RecipesPage /> : <LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/favorites" element={user ? <FavoritesPage /> : <LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
