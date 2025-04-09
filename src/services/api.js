const BASE_URL = 'https://fakestoreapi.com';

export const ProductService = {
    getAll: async () => {
        try {
            const response = await fetch(`${BASE_URL}/products`);
            const data = await response.json();
            return data.map(product => ({
                ...product,
                isNew: Math.random() < 0.3,
                discount: Math.random() < 0.2 ? Math.floor(Math.random() * 30) + 10 : null, 
                oldPrice: product.price * 1.2 
            }));
        } catch (error) {
            console.error('Error fetching all products:', error);
            throw error;
        }
    },

    getByCategory: async (categoryId) => {
        try {
            const response = await fetch(`${BASE_URL}/products/category/${categoryId}`);
            const data = await response.json();
            return data.map(product => ({
                ...product,
                isNew: Math.random() < 0.3,
                discount: Math.random() < 0.2 ? Math.floor(Math.random() * 30) + 10 : null,
                oldPrice: product.price * 1.2
            }));
        } catch (error) {
            console.error('Error fetching products by category:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/products/${id}`);
            const product = await response.json();
            return {
                ...product,
                isNew: Math.random() < 0.3,
                discount: Math.random() < 0.2 ? Math.floor(Math.random() * 30) + 10 : null,
                oldPrice: product.price * 1.2
            };
        } catch (error) {
            console.error('Error fetching product by id:', error);
            throw error;
        }
    },

    getCategories: async () => {
        try {
            const response = await fetch(`${BASE_URL}/products/categories`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    getCategoryStats: async () => {
        try {
            const categories = await ProductService.getCategories();
            const products = await ProductService.getAll();

            return categories.map(category => ({
                id: category,
                name: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
                count: products.filter(p => p.category === category).length
            }));
        } catch (error) {
            console.error('Error fetching category stats:', error);
            throw error;
        }
    },

    search: async ({ query = '', category = 'all', page = 1, limit = 10, minPrice, maxPrice }) => {
        try {
            let products;
            if (category && category !== 'all') {
                products = await ProductService.getByCategory(category);
            } else {
                products = await ProductService.getAll();
            }

            let filteredProducts = products;

            if (query) {
                const searchTerm = query.toLowerCase();
                filteredProducts = filteredProducts.filter(product =>
                    product.title.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                );
            }

            if (minPrice !== undefined || maxPrice !== undefined) {
                filteredProducts = filteredProducts.filter(product => {
                    const price = product.price;
                    if (minPrice !== undefined && maxPrice !== undefined) {
                        return price >= minPrice && price <= maxPrice;
                    } else if (minPrice !== undefined) {
                        return price >= minPrice;
                    } else if (maxPrice !== undefined) {
                        return price <= maxPrice;
                    }
                    return true;
                });
            }

            const start = (page - 1) * limit;
            const end = start + limit;
            const paginatedProducts = filteredProducts.slice(start, end);

            return {
                data: paginatedProducts,
                total: filteredProducts.length,
                currentPage: page,
                totalPages: Math.ceil(filteredProducts.length / limit),
                hasMore: end < filteredProducts.length
            };
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    }
};
