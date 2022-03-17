import BigNumber from "bignumber.js";

// Determines the present value of future cash flows. 

export const presentValueAnnuity = (payment, apr, numberOfPayments) => {
  payment = BigNumber(payment);
  apr = BigNumber(apr);
  numberOfPayments = BigNumber(numberOfPayments);

  const compoundInterest = apr
    .plus(1)
    .exponentiatedBy(numberOfPayments);

  const numerator = 1 - (1 / compoundInterest);

  return payment.times(numerator / apr);
};

const presentAnnuityAnswer = presentValueAnnuity(3265.93, 0.00229166666, 360);

console.log("Present Value of an Annuity:", presentAnnuityAnswer.toString());