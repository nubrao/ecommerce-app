import api from './api';

export const ProductService = {
    getAllProducts: async () => {
        const response = await api.get("/products");
        return response.data;
    },

    getImagesForCarousel: async () => {
        const products = await ProductService.getAllProducts();
        return products.map(product => product.image);
    }
};
