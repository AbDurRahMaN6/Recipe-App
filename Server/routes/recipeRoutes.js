const express = require('express');
const { fetchCategories, addFavoriteRecipe } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

router.get('/categories', fetchCategories);

router.post('/favorites', authMiddleware, addFavoriteRecipe); 

module.exports = router;
