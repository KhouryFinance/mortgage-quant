import BigNumber from "bignumber.js";
import { monthlyInterestRate } from "./utils.mjs";

// Determines your monthly payment for your mortgage, given the principal loan amount, APR, and number of payments to be made.

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
