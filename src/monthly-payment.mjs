import BigNumber from "bignumber.js";
import { interestRatePerPeriod } from "./utils.mjs";

// Determines your monthly payment for your mortgage, given the principal loan amount, APR, and number of payments to be made.

export const monthlyPayment = (interestRate, periods, presentValue) => {
  interestRate = BigNumber(interestRate)
  presentValue = BigNumber(presentValue)

  const monthlyInterestRate = interestRatePerPeriod(interestRate, 12);

  let compoundInterest = monthlyInterestRate
    .plus(1)
    .exponentiatedBy(periods);

  let numerator = monthlyInterestRate.times(presentValue).times(compoundInterest);
  let denominator = compoundInterest.minus(1);

  return numerator.dividedBy(denominator);
};
