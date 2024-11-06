const express = require('express');
const { fetchCategories, addFavoriteRecipe, getFavoriteRecipes, removeFavoriteRecipe } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

router.get('/categories', fetchCategories);

router.post('/favorites', authMiddleware, addFavoriteRecipe);

router.get('/favorites', authMiddleware, getFavoriteRecipes);

router.delete('/favorites', authMiddleware, removeFavoriteRecipe);

module.exports = router;
