import BigNumber from "bignumber.js";
import { monthlyInterestRate } from "./monthly-interest-rate.mjs";

export const monthlyPayment = (principal, apr, numberOfPayments) => {
  const monthlyInterest = monthlyInterestRate(apr);
  principal = BigNumber(principal);
  apr = BigNumber(apr);
  numberOfPayments = BigNumber(numberOfPayments);
  let compoundInterest = monthlyInterest
    .plus(1)
    .exponentiatedBy(numberOfPayments);
  let numerator = monthlyInterest.times(principal).times(compoundInterest);
  let denominator = compoundInterest.minus(1);
  return numerator.dividedBy(denominator);
};
