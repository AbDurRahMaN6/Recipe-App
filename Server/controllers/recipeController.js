const axios = require('axios');
const { getDB } = require('../config/db');
const mongodb = require('mongodb');

const fetchCategories = async (req, res) => {
    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        res.json(response.data.categories); 
    } catch (error) {
        console.error('Error fetching categories:', error); 
        res.status(500).json({ message: 'Failed to fetch categories' }); 
    }
};

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

const getFavoriteRecipes = async (req, res) => {
    const db = getDB();
    const userId = req.user.id;

    try {
        const user = await db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ favorites: user.favorites });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ message: 'Failed to fetch favorite items' });
    }
};

const removeFavoriteRecipe = async (req, res) => {
    const { recipeId } = req.body;
    const db = getDB();
    const userId = req.user.id;

    try {
        const result = await db.collection('users').updateOne(
            { _id: new mongodb.ObjectId(userId) },
            { $pull: { favorites: recipeId } }
        );

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: 'Recipe not found in favorites' });
        }

        res.json({ message: 'Recipe removed from favorites' });
    } catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ message: 'Failed to remove favorite item' });
    }
};

module.exports = { fetchCategories, addFavoriteRecipe, getFavoriteRecipes, removeFavoriteRecipe };
