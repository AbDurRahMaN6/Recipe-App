import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../services/api';
import RecipeList from '../components/Recipe/RecipeList';
import { Button, Box } from '@mui/material';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = ['Beef', 'Pasta', 'Chicken', 'Lamb', 'Pork'];

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetchRecipes(activeCategory); 
        setRecipes(response.data); 
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    loadRecipes();
  }, [activeCategory]); 

  const toggleFavorite = (recipeId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(recipeId)) {
        return prevFavorites.filter((id) => id !== recipeId);
      } else {
        return [...prevFavorites, recipeId];
      }
    });
  };

  const isFavorite = (recipeId) => favorites.includes(recipeId);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div style={{ backgroundColor: '#f9f4f4', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start', 
          padding: '10px 0',
          overflowX: 'auto', 
          backgroundColor: '#f9f4f4', 
          marginLeft: '70px', 
        }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryClick(category)} 
            sx={{
              margin: '0 10px',
              borderColor: '#ff4081',
              color: activeCategory === category ? 'white' : '#ff4081',
              backgroundColor: activeCategory === category ? '#ff4081' : 'white', 
              borderRadius: '25px',
              padding: '8px 16px', 
              fontSize: '14px', 
              minWidth: '100px', 
              border: activeCategory === category ? '2px solid #ff4081' : '2px solid #ff4081', 
              '&:hover': {
                backgroundColor: activeCategory === category ? '#ff4081' : 'white', 
                color: activeCategory === category ? 'white' : '#ff4081',
              },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      <RecipeList
        recipes={recipes}
        onFavoriteToggle={toggleFavorite}
        isFavorite={isFavorite}
      />
    </div>
  );
};

export default RecipesPage;
