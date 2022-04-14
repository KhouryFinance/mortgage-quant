import BigNumber from "bignumber.js";
import { interestRatePerPeriod } from "./utils.mjs";

// Determines your monthly payment for your mortgage, given the principal loan amount, APR, and number of payments to be made.
export const monthlyPayment = ({
  interestRate,
  periods,
  presentValue
}) => {
  interestRate = BigNumber(interestRate)
  presentValue = BigNumber(presentValue)

  const monthlyInterestRate = interestRatePerPeriod(interestRate, 12);
  const compoundInterest = monthlyInterestRate.plus(1).exponentiatedBy(periods);
  const numerator = monthlyInterestRate.times(presentValue).times(compoundInterest);
  const denominator = compoundInterest.minus(1);

  return numerator.dividedBy(denominator);
};
