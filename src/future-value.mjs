import BigNumber from "bignumber.js";

export const futureValue = ({
  interestRate,
  payment,
  periods,
  presentValue,
}) => {
  interestRate = BigNumber(interestRate);
  periods = BigNumber(periods);
  payment = BigNumber(payment ?? 0);
  presentValue = BigNumber(presentValue ?? 0);

  const compoundInterest = interestRate
    .plus(1)
    .exponentiatedBy(periods);

  const simpleFutureValue = payment
    .times(compoundInterest.minus(1))
    .dividedBy(interestRate);

  const interestPaid = presentValue.times(compoundInterest);

  return interestPaid.plus(simpleFutureValue)
};
