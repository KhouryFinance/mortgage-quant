import BigNumber from "bignumber.js";
import { monthlyInterestRate } from "./utils.mjs";

// Determines the future value of a present investment, given an interest rate, number of payments to be made over the term (positive for accumulating investments, negative for paying off a loan), and amount paid each period.

// From a lender's perspective it determines: what is the minumum return in order to make the initial investment in the present worthwhile.

// From a borrowers perspective it determines: how much you'll end up paying over the coarse of a loan. 

// Given I need to take out 720k for my 30 year fixed rate mortgage at 4%, what will I end up paying?
// futureValueWithPayments (0.04, 360, -3437.39, 720_000) = 
  // solved - inputting the interim gets you principal paid

export const futureValueWithPayments = (
  interestRate,
  numberOfPayments,
  payment,
  presentValue = BigNumber(0), // default allows for calculations of plain future annuity
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

  return interestPaid.plus(simpleFutureValue);
};


const futureValuePaymentsAnswer = futureValueWithPayments(
  monthlyInterestRate(0.035),
  120,
  -3143.31, // negative values for paying off a loan, positive values for an investment you continually put money into
  700_000
);

console.log("Future Value of Payments:", futureValuePaymentsAnswer.toString());

// If you input the period halfway, or at any point, you'll find the amount of
// principal you still have to pay, or if you subtract the output from your
// present value (loan amount), you'll have the amount of principal you've paid
// so far