const API_URL = 'https://fakestoreapi.com';

export const cartService = {
    getAllCarts: async () => {
        try {
            const response = await fetch(`${API_URL}/carts`);
            if (!response.ok) throw new Error('Failed to fetch carts');
            return response.json();
        } catch (error) {
            console.error('Error fetching carts:', error);
            throw error;
        }
    },

    getUserCarts: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/carts/user/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch user carts');
            return response.json();
        } catch (error) {
            console.error('Error fetching user carts:', error);
            throw error;
        }
    },

    getCartById: async (cartId) => {
        try {
            const response = await fetch(`${API_URL}/carts/${cartId}`);
            if (!response.ok) throw new Error('Failed to fetch cart');
            return response.json();
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    },

    addCart: async (cart) => {
        try {
            const response = await fetch(`${API_URL}/carts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cart),
            });
            if (!response.ok) throw new Error('Failed to add cart');
            return response.json();
        } catch (error) {
            console.error('Error adding cart:', error);
            throw error;
        }
    },

    updateCart: async (cartId, cart) => {
        try {
            const response = await fetch(`${API_URL}/carts/${cartId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cart),
            });
            if (!response.ok) throw new Error('Failed to update cart');
            return response.json();
        } catch (error) {
            console.error('Error updating cart:', error);
            throw error;
        }
    },

    deleteCart: async (cartId) => {
        try {
            const response = await fetch(`${API_URL}/carts/${cartId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete cart');
            return response.json();
        } catch (error) {
            console.error('Error deleting cart:', error);
            throw error;
        }
    },
};