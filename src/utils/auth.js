export const validateAuth = () => {
    try {
        const token = localStorage.getItem('auth-token');
        const userInfo = localStorage.getItem('user-info');

        if (!token || !userInfo) {
            return { isValid: false, user: null };
        }

        try {
            const userData = JSON.parse(userInfo);
            return {
                isValid: true,
                token,
                user: userData
            };
        } catch {
            return { isValid: false, user: null };
        }
    } catch {
        return { isValid: false, user: null };
    }
};