

export interface CoinMarket{
  id: string;
  symbol: string;
  name: string;
  market_cap: number;
  market_cap_rank: number;
}
export interface CoinType {
  id: string;
  symbol: string;
  name: string;
}
export interface CoinData{
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}