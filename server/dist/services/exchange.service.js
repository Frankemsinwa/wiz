import axios from 'axios';
import { logger } from '../utils/logger.js';
// For development, we can use a free API or a mock service
// Replace with a real API key in production
const EXCHANGE_RATE_API = 'https://api.exchangerate-api.com/v4/latest/';
export const getExchangeRate = async (baseCurrency, targetCurrency) => {
    try {
        const response = await axios.get(`${EXCHANGE_RATE_API}${baseCurrency}`);
        const rate = response.data.rates[targetCurrency];
        if (!rate) {
            throw new Error(`Could not find exchange rate for ${targetCurrency}`);
        }
        return rate;
    }
    catch (error) {
        logger.error('Error fetching exchange rate:', error);
        // Fallback to 1:1 if API fails (just for dev safety)
        return 1;
    }
};
//# sourceMappingURL=exchange.service.js.map