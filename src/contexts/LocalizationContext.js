'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LocalizationContext = createContext({});

export function LocalizationProvider({ children }) {
    const [currentLanguage, setCurrentLanguage] = useState('pt');
    const [currentCurrency, setCurrentCurrency] = useState('BRL');
    const [exchangeRates, setExchangeRates] = useState({
        USD: 1,
        BRL: 5.04,
        EUR: 0.92
    });

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch('https://open.er-api.com/v6/latest/USD');
                const data = await response.json();

                if (data.rates) {
                    setExchangeRates({
                        USD: 1,
                        BRL: data.rates.BRL,
                        EUR: data.rates.EUR
                    });
                }
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
            }
        };

        fetchExchangeRates();

        const interval = setInterval(fetchExchangeRates, 12 * 60 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        const savedCurrency = localStorage.getItem('currency');

        if (savedLanguage) setCurrentLanguage(savedLanguage);
        if (savedCurrency) setCurrentCurrency(savedCurrency);
    }, []);

    const changeCurrency = (currency) => {
        setCurrentCurrency(currency);
        localStorage.setItem('currency', currency);
    };

    const changeLanguage = (language) => {
        setCurrentLanguage(language);
        localStorage.setItem('language', language);
        const newPath = pathname.replace(`/${currentLanguage}`, `/${language}`);
        router.push(newPath);
    };

    const t = (key) => {
        if (currentLanguage === 'en') return key;

        const keys = key.split('.');
        let value = ptTranslations;

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key;
            }
        }

        return value;
    };

    const formatPrice = (price) => {
        const rate = exchangeRates[currentCurrency];
        const convertedPrice = price * rate;

        const formatOptions = {
            style: 'currency',
            currency: currentCurrency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };

        const formatter = new Intl.NumberFormat(
            currentLanguage === 'pt' ? 'pt-BR' : 'en-US',
            formatOptions
        );

        return formatter.format(convertedPrice);
    };

    return (
        <LocalizationContext.Provider value={{
            currentLanguage,
            currentCurrency,
            changeLanguage,
            changeCurrency,
            t,
            formatPrice,
            availableCurrencies: Object.keys(exchangeRates),
            availableLanguages: ['pt', 'en'],
            exchangeRates
        }}>
            {children}
        </LocalizationContext.Provider>
    );
}

export const useLocalization = () => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error('useLocalization must be used within a LocalizationProvider');
    }
    return context;
};