'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('user-info');

        if (userInfo && authService.isAuthenticated()) {
            try {
                const parsed = JSON.parse(userInfo);
                setUser(parsed);
            } catch (error) {
                console.error('Erro ao fazer JSON.parse:', error);
            }
        }

        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const { user: userData } = await authService.login(username, password);
            setUser(userData);
            localStorage.setItem('user-info', JSON.stringify(userData));
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};