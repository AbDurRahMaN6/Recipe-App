import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);

export const fetchRecipes = () => api.get('/recipes/categories');
export const fetchRecipeById = (id) => api.get(`/recipes/${id}`);

export const fetchFavorites = () => api.get('/favorites');
export const addFavorite = (id) => api.post('/favorites', { recipeId: id }); 
export const removeFavorite = (id) => api.delete('/favorites', { data: { recipeId: id } }); 

export const fetchRecipe = async (category) => {
  try {
    const url = category ? `/api/recipes?category=${category}` : '/api/recipes';
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};