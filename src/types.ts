export interface Currency {
  currencyName: string;
  liquidityHistory: CurrLiquidity[];
  decimals: number;
}

interface CurrLiquidity {
  liquidity: string;
  liquidityUSD: number;
}

export interface Pool {
  currency0: string;
  currency1: string;
  liquidityHistory: PoolLiquidity[];
}

interface PoolLiquidity {
  usdTotalLiquidity: number;
  token0Liquidity: string;
  token1Liquidity: string;
  timestamp: string;
}
