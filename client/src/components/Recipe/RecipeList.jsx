import React from 'react';
import RecipeItem from './RecipeItem';
import { Grid } from '@mui/material';

const RecipeList = ({ recipes, onFavoriteToggle, isFavorite }) => (
  <Grid container spacing={2} sx={{ padding: 2 }}>
    {recipes.map((recipe) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
        <RecipeItem
          recipe={recipe}
          onFavoriteToggle={onFavoriteToggle}  
          isFavorite={isFavorite}  
        />
      </Grid>
    ))}
  </Grid>
);

export default RecipeList;
