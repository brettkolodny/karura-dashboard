import React from "react";

interface IProps {
  currencyName: string;
  liquidity: number;
  liquidityUSD: number;
  decimals: number;
}

const CurrencyCard: React.FC<IProps> = ({
  currencyName,
  liquidity,
  liquidityUSD,
  decimals,
}) => {
  return (
    <div className="card w-96 bg-base-300 shadow-xl border border-secondary">
      <div className="card-body">
        <h2 className="card-title">{currencyName}</h2>
        <p>{liquidity / 10 ** decimals}</p>
        <p>
          {liquidityUSD.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
    </div>
  );
};

export default CurrencyCard;
