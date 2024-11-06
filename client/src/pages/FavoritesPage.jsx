import React, { useEffect, useState } from 'react';
import RecipeList from '../components/Recipe/RecipeList';
import { Box, Typography } from '@mui/material';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);

    const fetchAllRecipes = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='); 
        const data = await response.json();
        setAllRecipes(data.meals || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchAllRecipes();
  }, []);

  const handleFavoriteToggle = (recipe) => {
    const updatedFavorites = favorites.some((fav) => fav.id === recipe.id)
      ? favorites.filter((fav) => fav.id !== recipe.id)
      : [...favorites, recipe];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const favoriteRecipes = allRecipes.filter((recipe) =>
    favorites.some((fav) => fav.id === recipe.id)
  );

  return (
    <Box sx={{ backgroundColor: '#f9f4f4', minHeight: '100vh', padding: 2 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3 }}>
        Favorite Recipes
      </Typography>
      <RecipeList recipes={favoriteRecipes} onFavoriteToggle={handleFavoriteToggle} />
    </Box>
  );
};

export default FavoritesPage;
