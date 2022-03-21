import BigNumber from "bignumber.js";

// This futureValue function works with any given interest rate, monthly or yearly, as well as any compounding period. 

// The purpose of this function is to determine the future value of a single lump sum investment made now.

export const futureValue = (periodicRate, compoundingPeriods, presentValue) => {
  periodicRate = BigNumber(periodicRate);
  compoundingPeriods = BigNumber(compoundingPeriods); 
  presentValue = BigNumber(presentValue);

  return presentValue.times(
    periodicRate.plus(1).exponentiatedBy(compoundingPeriods)
  );
};

// const futureValueAnswer = futureValue(0.0246, 30, 30000);

// console.log("Future Value:", futureValueAnswer.toString());
