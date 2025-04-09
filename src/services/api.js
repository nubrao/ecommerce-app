import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

const handleError = (error) => {
    if (error.response) {
        console.error('Response error:', error.response);
    } else if (error.request) {
        console.error('Request error:', error.request);
    } else {
        console.error('Error:', error.message);
    }
    throw error;
};

export const ProductService = {
    getAll: async () => {
        try {
            const response = await api.get('/products');
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    getCategories: async () => {
        try {
            const response = await api.get('/products/categories');
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    getByCategory: async (category) => {
        try {
            const response = await api.get(`/products/category/${category}`);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },
};

export default api;
