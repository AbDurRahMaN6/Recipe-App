const express = require('express');
const { fetchCategories, addFavoriteRecipe } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware'); // Corrected import

const router = express.Router();

// Route to fetch recipe categories
router.get('/categories', fetchCategories);

// Route to add a favorite recipe (requires authentication)
router.post('/favorites', authMiddleware, addFavoriteRecipe); // Use authMiddleware here

// Export the router
module.exports = router;
