import React, { useState } from "react";
import { Pool } from "./types";

interface IProps extends Pool {
  poolNum: number;
}

const DECIMALS: Record<string, number> = {
  KUSD: 12,
  KAR: 12,
  KSM: 12,
  LKSM: 12,
  KBTC: 8,
};

const PoolRow: React.FC<IProps> = ({
  poolNum,
  currency0,
  currency1,
  liquidityHistory,
}) => {
  const [showMore, setShowMore] = useState(false);

  const token1Liquidity = liquidityHistory[0]
    ? liquidityHistory[0].token1Liquidity
    : 0;
  const token0Liquidity = liquidityHistory[0]
    ? liquidityHistory[0].token0Liquidity
    : 0;

  const usdTotalLiquidity = liquidityHistory[0]
    ? liquidityHistory[0].usdTotalLiquidity
    : 0;

  console.log(currency0, currency1, token1Liquidity, token0Liquidity);

  return (
    <table
      className="table table-zebra w-full cursor-pointer"
      onClick={() => setShowMore(!showMore)}
    >
      <thead>
        <th className="w-[256px]">Today</th>
        <th className="w-[256px]">{`${currency0}<>${currency1}`}</th>
        <th className="w-[256px]">{`${(
          Number(token0Liquidity) /
          10 ** DECIMALS[currency0]
        ).toLocaleString("en-US")} ${
          currency0 === "KUSD" ? "AUSD" : currency0
        }`}</th>
        <th className="w-[256px]">{`${(
          Number(token1Liquidity) /
          10 ** DECIMALS[currency1]
        ).toLocaleString("en-US")} ${
          currency1 === "KUSD" ? "AUSD" : currency1
        }`}</th>
        <th className="w-[256px]">
          {usdTotalLiquidity.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </th>
      </thead>
      {showMore
        ? liquidityHistory.map((history, index) => {
            return (
              <tbody key={`${currency0}<>${currency1}-${index}`}>
                <tr>
                  <th>{`${index} day(s) ago`}</th>
                  <td>{`${currency0}<>${currency1}`}</td>
                  <td>{`${(
                    Number(history.token0Liquidity) /
                    10 ** DECIMALS[currency0]
                  ).toLocaleString("en-US")} ${
                    currency0 === "KUSD" ? "AUSD" : currency0
                  }`}</td>
                  <td>{`${(
                    Number(history.token1Liquidity) /
                    10 ** DECIMALS[currency1]
                  ).toLocaleString("en-US")} ${
                    currency1 === "KUSD" ? "AUSD" : currency1
                  }`}</td>
                  <td>
                    {history.usdTotalLiquidity.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                </tr>
              </tbody>
            );
          })
        : null}
    </table>
  );
};

export default PoolRow;
