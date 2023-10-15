import React from "react";
import { Text } from "react-native";

export const formatValue = (value: string, decimals = 10) => {
  return Number.parseFloat(value).toFixed(decimals);
};

export const Balance = ({
  balance,
  decimals,
  symbol,
}: {
  balance: string;
  decimals?: number;
  symbol?: string;
}) => {
  return (
    <Text>
      {formatValue(balance, decimals)} {symbol}
    </Text>
  );
};
