import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { FavoriteBorder, Favorite } from '@mui/icons-material';

const RecipeItem = ({ recipe, onFavoriteToggle, isFavorite }) => {
  return (
    <Card sx={{ boxShadow: 'none', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
      <CardMedia
        component="img"
        height="150"
        image={recipe.image || '/placeholder.png'}
        alt={recipe.title}
        sx={{
          borderRadius: '16px',
          margin: 'auto',
          width: '80%',
          marginTop: 2,
        }}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Soups
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          {recipe.title}
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          to={`/recipe/${recipe.id}`}
          sx={{ marginTop: 1, color: '#ff4081', borderColor: '#ff4081' }}
        >
          View Recipe
        </Button>
        <Button
          onClick={() => onFavoriteToggle(recipe.id)}
          sx={{ marginTop: 1, color: '#ff4081', borderColor: '#ff4081' }}
        >
          {isFavorite(recipe.id) ? (
            <Favorite sx={{ color: '#ff4081' }} />
          ) : (
            <FavoriteBorder sx={{ color: '#ff4081' }} />
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeItem;
