import BigNumber from "bignumber.js";

// Determines the future value of a present investment, given an interest rate, number of payments to be made over the term (positive for accumulating investments, negative for paying off a loan), and amount paid each period.

// From a lender's perspective it determines: what is the minumum return in order to make the initial investment in the present worthwhile.

// From a borrowers perspective it determines: how much you'll end up paying over the coarse of a loan. 

export const futureValue = (
  interestRate,
  payment = BigNumber(0), // default or 0 for lump sum calculations
  numberOfPayments,
  presentValue = BigNumber(0), // default or 0 allows for calculations of plain future annuity
) => {
  interestRate = BigNumber(interestRate);
  numberOfPayments = BigNumber(numberOfPayments);
  payment = BigNumber(payment);
  presentValue = BigNumber(presentValue);

  const compoundInterest = interestRate
    .plus(1)
    .exponentiatedBy(numberOfPayments);

  const simpleFutureValue = payment
    .times(compoundInterest.minus(1))
    .dividedBy(interestRate);

  const interestPaid = presentValue.times(compoundInterest);

  return interestPaid.plus(simpleFutureValue)
};