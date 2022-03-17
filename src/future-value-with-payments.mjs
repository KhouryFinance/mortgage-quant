import BigNumber from "bignumber.js";
import { monthlyInterestRate } from "./utils.mjs";

// Determines the future value of a present investment, given an interest rate, number of payments to be made over the term (positive for accumulating investments, negative for paying off a loan), and amount paid each period.

// From a lender's perspective it determines: what is the minumum return in order to make the initial investment in the present worthwhile.

// From a borrowers perspective it determines: how much you'll end up paying over the coarse of a loan. 

// Given I need to take out 720k for my 30 year fixed rate mortgage at 4%, what will I end up paying?
// futureValueWithPayments (0.04, 360, -3437.39, 720_000) = 
  // ?????? - gives 0, which isn't what I expected, and isn't useful to people. It simply states that at these payments with this interest, you'll pay off your loan. Doesn't include interest paid over the period, as amortization does.

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


// const futureValuePaymentsAnswer = futureValueWithPayments(
  //monthlyInterestRate(0.04),
  //360,
  //-3437.39, // negative values for paying off a loan, positive values for an investment you continually put money into
  //720_000
//);

// console.log("Future Value of Payments:", futureValuePaymentsAnswer.toString()//);