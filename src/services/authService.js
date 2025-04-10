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

            const data = await response.json();
            
            if (data.token) {
                localStorage.setItem('auth-token', data.token);
                localStorage.setItem('user-info', JSON.stringify(data.user));
            }

            const usersResponse = await fetch(`${API_URL}/users`);
            const users = await usersResponse.json();
            const userData = users.find(u => u.username === username);
            const token = localStorage.getItem('auth-token');

            if (!userData) {
                throw new Error('User not found');
            }

            return { token, userData };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
    
    logout: () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-info');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('auth-token');
    },

    getToken: () => {
        return localStorage.getItem('auth-token');
    },

    getUser: () => {
        const userInfo = localStorage.getItem('user-info');
        return userInfo ? JSON.parse(userInfo) : null;
    }
};