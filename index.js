import BigNumber from "bignumber.js";

export { amortizationSchedule } from "./src/amortization-schedule.mjs";

// Lets implement your first function
// For now we are not bothering with exporting anything because we are just
// testing our functions and seeing if they output the right stuff.
// You can check out bankroll for an implementation example in ruby:
// https://github.com/nolantait/bankroll/blob/master/lib/bankroll/present_value.rb

// PRESENT VALUE OF MONEY:

export const presentValue = (
  annualInterestRate,
  numberOfYears,
  futureValue
) => {
  futureValue = BigNumber(futureValue);
  annualInterestRate = BigNumber(annualInterestRate);
  numberOfYears = BigNumber(numberOfYears);
  return futureValue.dividedBy(
    annualInterestRate.plus(1).exponentiatedBy(numberOfYears)
  );
};

// Present Value of an Annuity

const presentValueAnnuity = (payment, interestRate, numberOfPayments) => {
  payment = BigNumber(payment);
  interestRate = BigNumber(interestRate);
  numberOfPayments = BigNumber(numberOfPayments);

  const compoundInterest = interestRate
    .plus(1)
    .exponentiatedBy(numberOfPayments);

  const numerator = 1 - 1 / compoundInterest;

  return payment.times(numerator / interestRate);
};

// FUTURE VALUE OF MONEY:

const futureValue = (annualInterestRate, numberOfYears, presentValue) => {
  annualInterestRate = BigNumber(annualInterestRate);
  numberOfYears = BigNumber(numberOfYears);
  presentValue = BigNumber(presentValue);

  return presentValue.times(
    annualInterestRate.plus(1).exponentiatedBy(numberOfYears)
  );
};

// FUTURE VALUE OF AN ANNUITY:

const futureValueAnnuity = (payment, interestRate, numberOfPayments) => {
  payment = BigNumber(payment);
  interestRate = BigNumber(interestRate);
  numberOfPayments = BigNumber(numberOfPayments);

  const compoundInterest = interestRate
    .plus(1)
    .exponentiatedBy(numberOfPayments);

  return payment.times(compoundInterest.minus(1).dividedBy(interestRate));
};

// FUTURE VALUE OF PAYMENTS:

const futureValueOfPayments = (
  interestRate,
  numberOfPayments,
  payment,
  presentValue
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

// Verified the above with examples, gives the future value of payments but isn't what Nolan has in his ruby code, doesn't output relevant answer because it doesn't contain PRESENT VALUE OR PAYMENT AMOUNTS

// FUTURE TOTAL COST OF A FIXED RATE MORTGAGE
// Monthly payments * # of months
// doesn't account for variable rates

const futureValueMortgage = (
  numberOfPayPeriods,
  annualInterestRate,
  periodicPayment,
  newPresentValue
) => {
  numberOfPayPeriods = BigNumber(numberOfPayPeriods);
  annualInterestRate = BigNumber(annualInterestRate);
  periodicPayment = BigNumber(periodicPayment);
  newPresentValue = BigNumber(newPresentValue);

  let effectiveRate = annualInterestRate
    .plus(1)
    .exponentiatedBy(numberOfPayPeriods);

  return effectiveRate
    .times(newPresentValue)
    .plus(
      periodicPayment
        .times(annualInterestRate.times(0).plus(1))
        .times(effectiveRate.minus(1))
        .dividedBy(annualInterestRate)
    );
};

// AMORTIZATION
// Create some sort of map, array or chart with the following columns/arguments:
// Month, Beginning Balance, Interest, Principal, Payment Amount, Ending Balance, Equity
// Payments will be heavily weighted towards paying off interest at the start
// What proportion? How is the weighting calculated?
// The flow of the schedule:
// Month 1 | Beginning Balance = 200,000 | Interest Rate 6%/12 = 0.005 | Monthly Payment = 16,687.71
// Apply the .005 interest rate to the balance, which is 1,000: subtract this from the monthly payment
// Monthly Payment - Monthly Interest = Principal Payment (687.71)
// We then subtract Principal Payment from the balance = 199,312.29
// We then loop it, applying the interest rate to the new balance, and printing out the row values for each month
// Every month the interest gets lower, and the amount paid to principal gets higher, as well as their equity in the home
// Early Payoff, needs flexibility
