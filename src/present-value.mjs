import BigNumber from "bignumber.js";

// Determines the present value of future cash flows. 

export const presentValue = ({
  interestRate,
  payment,
  periods
}) => {
  payment      = BigNumber(payment);
  interestRate = BigNumber(interestRate);
  periods      = BigNumber(periods);

  const one = BigNumber(1)
  const compoundInterest = interestRate.plus(one).exponentiatedBy(periods);
  const compoundGrowth = one.minus(one.dividedBy(compoundInterest));
  const interestContribution = compoundGrowth.dividedBy(interestRate)

  return payment.times(interestContribution);
};
