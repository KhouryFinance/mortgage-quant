import BigNumber from "bignumber.js";

export const monthlyInterestRate = (apr) => {
  return BigNumber(apr).dividedBy(12);
};
