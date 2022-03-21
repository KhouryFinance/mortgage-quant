import BigNumber from "bignumber.js";

// Determines the amount of money you'd need to invest now as a lump sum in order to reach a specified return expressed as futureValue.

export const presentValue = (
  apr,
  numberOfYears,
  futureValue
) => {
  futureValue = BigNumber(futureValue);
  apr = BigNumber(apr);
  numberOfYears = BigNumber(numberOfYears);
  return futureValue.dividedBy(
    apr.plus(1).exponentiatedBy(numberOfYears)
  );
};

// const presentValueAnswer = presentValue(0.0325, 10, 100_000);

// console.log("Present Value:", presentValueAnswer.toString());

