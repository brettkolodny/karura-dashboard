import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Currency, Pool } from "./types";
import CurrencyCard from "./CurrencyCard";
import PoolRow from "./PoolRow";

const KARURA_QUERY = gql`
  query KaruraStats {
    currencies {
      currencyName
      liquidityHistory(orderBy: timestamp_DESC, limit: 1) {
        liquidity
        liquidityUSD
      }
      decimals
    }
    pools {
      currency0
      currency1
      liquidityHistory(orderBy: timestamp_DESC, limit: 7) {
        usdTotalLiquidity
        token1Liquidity
        token0Liquidity
        timestamp
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(KARURA_QUERY);
  const [currencies, setCurrencies] = useState<Currency[]>();
  const [pools, setPools] = useState<Pool[]>();

  useEffect(() => {
    if (data) {
      console.log(JSON.stringify(data.pools));
      setCurrencies(data.currencies as Currency[]);
      setPools(data.pools as Pool[]);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="flex flex-col justify-center items-center w-screen min-h-screen overflow-x-hidden my-16">
      <h1 className="text-6xl font-bold mb-16">Karura Stats</h1>
      <h2 className="flex justify-start text-4xl font-bold mb-7">Tokens</h2>
      <div className="flex flex-row flex-wrap justify-center items-center gap-4 mb-16">
        {currencies
          ? currencies.map((currency) => {
              return (
                <CurrencyCard
                  currencyName={currency.currencyName}
                  decimals={currency.decimals}
                  liquidity={Number(currency.liquidityHistory[0].liquidity)}
                  liquidityUSD={currency.liquidityHistory[0].liquidityUSD}
                  key={`currency-${currency.currencyName}`}
                />
              );
            })
          : null}
      </div>
      <h2 className="flex justify-start text-4xl font-bold mb-7">Pools</h2>
      <div className="flex flex-col w-full max-w-7xl gap-4">
        {pools
          ? pools.map((pool, index) => {
              return (
                <PoolRow
                  key={`${pool.currency0}<>${pool.currency1}`}
                  poolNum={index + 1}
                  currency0={pool.currency0}
                  currency1={pool.currency1}
                  liquidityHistory={pool.liquidityHistory}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

export default App;
