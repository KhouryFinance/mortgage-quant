import BigNumber from "bignumber.js";

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

const presentValueAnswer = presentValue(0.05, 15, 1_000_000);

console.log("Present Value:", presentValueAnswer.toString());

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

const temporary = BigNumber(0.01).dividedBy(12);

const presentAnnuityAnswer = presentValueAnnuity(643.28, temporary, 360);

console.log("Present Value of an Annuity:", presentAnnuityAnswer.toString());

// FUTURE VALUE OF MONEY:

const futureValue = (annualInterestRate, numberOfYears, presentValue) => {
  annualInterestRate = BigNumber(annualInterestRate);
  numberOfYears = BigNumber(numberOfYears);
  presentValue = BigNumber(presentValue);

  return presentValue.times(
    annualInterestRate.plus(1).exponentiatedBy(numberOfYears)
  );
};

const futureValueAnswer = futureValue(0.01, 30, 148384.58355742485697957747);

console.log("Future Value:", futureValueAnswer.toString());

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

const futureAnnuityAnswer = futureValueAnnuity(125_000, 0.08, 5);

console.log("Future Value of an Annuity:", futureAnnuityAnswer.toString());

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

const temp = BigNumber(0.12).dividedBy(12);

const futureValuePaymentsAnswer = futureValueOfPayments(
  temp,
  360,
  -7_406,
  720_000
);

console.log("Future Value of Payments:", futureValuePaymentsAnswer.toString());

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

const futureValueMortgageAnswer = futureValueMortgage(
  360,
  0.0033333,
  2_148,
  450_000
);

console.log("Future Value Mortgage:", futureValueMortgageAnswer.toString());

// MONTHLY PAYMENT:

const monthlyPayment = (principal, interestRate, numberOfPayments) => {
  principal = BigNumber(principal);
  interestRate = BigNumber(interestRate);
  numberOfPayments = BigNumber(numberOfPayments);

  let compoundInterest = interestRate.plus(1).exponentiatedBy(numberOfPayments);

  let numerator = interestRate.times(principal).times(compoundInterest);

  let denominator = compoundInterest.minus(1);

  return numerator.dividedBy(denominator);
};

const monthlyPaymentAnswer = monthlyPayment(450000, 0.004166666666667, 360);

console.log("Monthly Payment:", monthlyPaymentAnswer.toString());

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

const amortizationPrincipal = (
  monthlyPayment,
  outstandingBalance,
  interestRate
) => {
  monthlyPayment = BigNumber(monthlyPayment);
  outstandingBalance = BigNumber(outstandingBalance);
  interestRate = BigNumber(interestRate);

  return monthlyPayment.minus(
    outstandingBalance.times(interestRate.dividedBy(12))
  );
};

// const amortPrincipalAnswer = amortizationPrincipal(2_415.7, 448_916.35, 0.05);

// console.log("Monthly Principal Due:", amortPrincipalAnswer.toString());

const amortizationArray = [];

let counter = 0;

let remainingBalance = BigNumber(450000);

let totalInterest = BigNumber(0);

let monthly = monthlyPayment(450000, 0.004166666666667, 360);

while (counter <= 360) {
  const row = [];
  row.push(monthly.toFixed(5));
  row.push(remainingBalance.toFixed(5));
  let principalPayment = amortizationPrincipal(monthly, remainingBalance, 0.05);
  row.push(principalPayment.toFixed(5));
  row.push(totalInterest.toFixed(5));
  remainingBalance = remainingBalance.minus(principalPayment);
  let interestPayment = monthly - principalPayment;
  row.push(interestPayment.toFixed(5));
  totalInterest = totalInterest.plus(interestPayment);
  let totalPrincipalPaid = 450000 - remainingBalance;
  row.push(totalPrincipalPaid.toFixed(5));
  let percentEquity = (totalPrincipalPaid / 450000) * 100;
  row.push(percentEquity.toFixed(5) + "%");
  amortizationArray.push(row);
  counter++;
}

//amortizationArray.forEach((column) => {
//column[4] = totalEquity + "%";
//let totalPrincipalPaid = (450000 - column[1]).toFixed(5);
//column[5] = totalPrincipalPaid;
//});

console.table(amortizationArray);
