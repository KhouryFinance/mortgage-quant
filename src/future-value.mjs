import BigNumber from "bignumber.js";

export const futureValue = ({
  interestRate,
  payment: BigNumber(0), // default or 0 for lump sum calculations
  periods,
  presentValue: BigNumber(0), // default or 0 allows for calculations of plain future annuity
}) => {
  interestRate = BigNumber(interestRate);
  periods = BigNumber(periods);
  payment = BigNumber(payment);
  presentValue = BigNumber(presentValue);

  const compoundInterest = interestRate
    .plus(1)
    .exponentiatedBy(periods);

  const simpleFutureValue = payment
    .times(compoundInterest.minus(1))
    .dividedBy(interestRate);

  const interestPaid = presentValue.times(compoundInterest);

  return interestPaid.plus(simpleFutureValue)
};