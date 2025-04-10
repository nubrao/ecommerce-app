'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import { userService } from '@/services/userService';
import Cookies from 'js-cookie';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = Cookies.get('auth-token');
        const userId = Cookies.get('user-id');

        if (token && userId) {
            loadUser(userId);
        } else {
            setLoading(false);
        }
    }, []);

    const loadUser = async (userId) => {
        try {
            const userData = await userService.getById(userId);
            setUser(userData);
        } catch (error) {
            console.error('Error loading user:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            setLoading(true);
            setError(null);
            const { token, userData } = await authService.login(username, password);

            Cookies.set('auth-token', token, { expires: 7 });
            Cookies.set('user-id', userData.id, { expires: 7 });

            setUser(userData);
            return userData;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        Cookies.remove('auth-token');
        Cookies.remove('user-id');
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}