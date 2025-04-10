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
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            localStorage.setItem('auth-token', data.token);

            const userResponse = await fetch(`${API_URL}/users/1`);
            const userData = await userResponse.json();

            localStorage.setItem('user-info', JSON.stringify({
                id: userData.id,
                email: userData.email,
                username: userData.username,
                name: {
                    firstname: userData.name.firstname,
                    lastname: userData.name.lastname
                },
                phone: userData.phone,
                address: {
                    number: userData.address.number,
                    street: userData.address.street,
                    city: userData.address.city,
                    zipcode: userData.address.zipcode,
                    geolocation: userData.address.geolocation
                }
            }));

            return {
                token: data.token,
                user: userData
            };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-info');
        localStorage.removeItem('checkout-data');
    },

    isAuthenticated: () => {
        const token = localStorage.getItem('auth-token');
        const userInfo = localStorage.getItem('user-info');

        if (!token || !userInfo) {
            return false;
        }

        try {
            const userData = JSON.parse(userInfo);
            const isExpired = Date.now() - userData.timestamp > 24 * 60 * 60 * 1000;

            if (isExpired) {
                authService.logout();
                return false;
            }

            return true;
        } catch {
            return false;
        }
    },

    getToken: () => {
        return localStorage.getItem('auth-token');
    },

    getUser: () => {
        const userInfo = localStorage.getItem('user-info');
        return userInfo ? JSON.parse(userInfo) : null;
    }
};