export const ExchangeRateService = {
    getLatestRates: async () => {
        try {
            const response = await fetch('https://open.er-api.com/v6/latest/USD');
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates');
            }

            return {
                timestamp: data.time_last_update_utc,
                base: data.base_code,
                rates: {
                    USD: 1,
                    BRL: data.rates.BRL,
                    EUR: data.rates.EUR
                }
            };
        } catch (error) {
            console.error('Exchange rate fetch error:', error);
            return null;
        }
    }
};