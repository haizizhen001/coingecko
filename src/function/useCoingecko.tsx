import { CoinType } from '@/types/Crypto';
import axios from 'axios';
export const useCoingecko = () => {
  const API = process.env.NEXT_PUBLIC_ORDER_API_URL || 'https://api.coingecko.com/api/v3';
  const getCoinList = async () => {
    const cachedData = getWithExpiry('coinList');
    if (cachedData) {
      return cachedData as CoinType[];
    }
    const response = await axios.get(
      `${API}/coins/list`
    );
    setWithExpiry('coinList', response.data, 24 * 60 * 60 * 1000);
    return response.data as CoinType[];
  };
  const getCoinTrend = async () => {
    const cachedData = getWithExpiry('coinTrend');
    if (cachedData) {
      return cachedData as CoinType[];
    }
    const response = await axios.get(
      `${API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&price_change_percentage=24h&locale=en`
    );
    setWithExpiry('coinTrend', response.data, 60 * 1000);
    return response.data as CoinType[];
  };
  const getPriceRange = async (symbol: string, from: number, to: number) => {
    try {
      const response = await axios.get(
        `${API}/coins/${symbol}/market_chart/range`,
        {
          params: {
            vs_currency: 'usd',
            from: from,
            to: to,
            precision: 2,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const setWithExpiry = (key: string, value: any, ttl: number) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const getWithExpiry = (key: string) => {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };
  return { getCoinList, getCoinTrend, getPriceRange };
};
