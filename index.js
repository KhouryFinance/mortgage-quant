import BigNumber from "bignumber.js";

// Lets implement your first function
// For now we are not bothering with exporting anything because we are just
// testing our functions and seeing if they output the right stuff.
// You can check out bankroll for an implementation example in ruby:
// https://github.com/nolantait/bankroll/blob/master/lib/bankroll/present_value.rb

// Things you might want to look up to help you:
// - Annuity factor
// - Mortgage factor
// - Fixed annuities
// - Floating point math in Javascript


export const presentValue = (annualInterestRate, numberOfYears, futureValue) => {
  futureValue = BigNumber(futureValue);
  annualInterestRate = BigNumber(annualInterestRate);
  numberOfYears = BigNumber(numberOfYears);
  return futureValue.dividedBy((annualInterestRate.plus(1)).exponentiatedBy(numberOfYears));
};

const presentValueAnswer = presentValue(0.01, 30, 200_000);

console.log('Present Value:', presentValueAnswer.toString());



const futureValue = (annualInterestRate, numberOfYears, presentValue) => {
  annualInterestRate = BigNumber(annualInterestRate);
  numberOfYears = BigNumber(numberOfYears);
  presentValue = BigNumber(presentValue);

  return presentValue.times((annualInterestRate.plus(1)).exponentiatedBy(numberOfYears));
};

const futureValueAnswer = futureValue(0.01, 30, 148384.58355742485697957747);

console.log('Future Value:', futureValueAnswer.toString());



// I'm buying a home, putting down 50k down payment, 500k loan, 4% interest rate, over 30 years

// $773,536.02

// payment arguments - necessary


// FutureValue over N periods =
// periodicPayment[(1 + interestRate) ** periods - 1] / interestRate

const futureValueOfPayments = (annualInterestRate, numberOfPayPeriods,  periodicPayment) => {
  annualInterestRate = BigNumber(annualInterestRate);
  numberOfPayPeriods = BigNumber(numberOfPayPeriods);
  periodicPayment = BigNumber(periodicPayment);

  return periodicPayment.times(((annualInterestRate.plus(1)).exponentiatedBy(numberOfPayPeriods).minus(1)).dividedBy(annualInterestRate));
};

const futureValuePaymentsAnswer = futureValueOfPayments(0.05, 5, 1_000);

console.log('Future Value of Payments:', futureValuePaymentsAnswer.toString());


// Verified the above with examples, gives the future value of payments but isn't what Nolan has in his ruby code, doesn't output relevant answer


// TRANSLATING THE RUBY CODE:



const futureValueMortgage = (numberOfPayPeriods, annualInterestRate, periodicPayment, newPresentValue) => {
  numberOfPayPeriods = BigNumber(numberOfPayPeriods);
  annualInterestRate = BigNumber(annualInterestRate);
  periodicPayment = BigNumber(periodicPayment);
  newPresentValue = BigNumber(newPresentValue);

  let effectiveRate = (annualInterestRate.plus(1)).exponentiatedBy(numberOfPayPeriods);

  effectiveRate = BigNumber(effectiveRate);

  return (effectiveRate.times(newPresentValue)).plus(periodicPayment.times((annualInterestRate.times(0)).plus(1)).times(effectiveRate.minus(1)).dividedBy(annualInterestRate));
};

const futureValueMortgageAnswer = futureValueMortgage(30, 0.04, 2_148, 450_000);

console.log('Future Value Mortgage:', futureValueMortgageAnswer.toString());