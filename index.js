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