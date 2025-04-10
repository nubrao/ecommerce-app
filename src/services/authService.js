const API_URL = 'https://fakestoreapi.com';

export const authService = {
    login: async (username, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const { token } = await response.json();

            const usersResponse = await fetch(`${API_URL}/users`);
            const users = await usersResponse.json();
            const userData = users.find(u => u.username === username);

            if (!userData) {
                throw new Error('User not found');
            }

            return { token, userData };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }
};