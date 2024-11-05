const axios = require('axios');
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb'); // Import ObjectId from mongodb
const mongodb = require('mongodb');


// Fetch recipe categories
const fetchCategories = async (req, res) => {
    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        res.json(response.data.categories); // Send the categories in the response
    } catch (error) {
        console.error('Error fetching categories:', error); // Log the error for debugging
        res.status(500).json({ message: 'Failed to fetch categories' }); // Send a 500 error response
    }
};


// const addFavoriteRecipe = async (req, res) => {
//     const { recipeId } = req.body; // Get the recipe ID from request body
//     const db = getDB();
//     const userId = req.user.id; // Get user ID from decoded JWT
//     console.log('User ID from token:', userId);

//     try {
//         // Fetch the user to check existing favorites
//         const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });


//         // Check if user exists
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         // Log current favorites for debugging
//         console.log('Current favorites:', user.favorites); 

//         // Check if the recipeId is already in favorites
//         if (user.favorites.includes(recipeId)) {
//             return res.status(400).json({ message: 'Recipe is already a favorite.' });
//         }

//         // Update the user document to add the recipe ID to the favorites array
//         const result = await db.collection('users').updateOne(
//             { _id: new ObjectId(userId) }, // Correctly use ObjectId here
//             { $addToSet: { favorites: recipeId } } // Add recipeId to favorites without duplicates
//         );

//         // Check if the update was successful
//         if (result.modifiedCount === 0) {
//             return res.status(400).json({ message: 'No changes made. Recipe might already be a favorite.' });
//         }

//         res.json({ message: 'Recipe added to favorites' }); // Success response
//     } catch (error) {
//         console.error('Error adding favorite:', error); // Log the error for debugging
//         res.status(500).json({ message: 'Failed to add favorite', error: error.message }); // Send a 500 error response
//     }
// };

const addFavoriteRecipe = async (req, res) => {
    const { recipeId } = req.body;
    const db = getDB();
    const userId = req.user.id;

    try {
        const user = await db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.favorites.includes(recipeId)) {
            return res.status(400).json({ message: 'Recipe is already a favorite.' });
        }

        const result = await db.collection('users').updateOne(
            { _id: new mongodb.ObjectId(userId) },
            { $addToSet: { favorites: recipeId } }
        );

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: 'No changes made. Recipe might already be a favorite.' });
        }

        res.json({ message: 'Recipe added to favorites' });
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ message: 'Failed to add favorite', error: error.message });
    }
};


// Export the functions to use in your routes
module.exports = { fetchCategories, addFavoriteRecipe };
