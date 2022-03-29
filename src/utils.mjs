import BigNumber from "bignumber.js";

export const interestRatePerPeriod = (apr, periods) => {
  return BigNumber(apr).dividedBy(periods);
};
