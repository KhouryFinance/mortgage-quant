import BigNumber from "bignumber.js";

// Determines the present value of future cash flows. 

export const presentValue = (interestRate, payment, periods) => {
  payment = BigNumber(payment);
  interestRate = BigNumber(interestRate);
  periods = BigNumber(periods);

  const compoundInterest = interestRate
    .plus(1)
    .exponentiatedBy(periods);

  const numerator = 1 - (1 / compoundInterest);

  return payment.times(numerator / interestRate);
};
