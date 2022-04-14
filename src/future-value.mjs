import BigNumber from "bignumber.js";

export const futureValue = ({
  interestRate,
  payment,
  periods,
  presentValue,
}) => {
  interestRate = BigNumber(interestRate);
  periods      = BigNumber(periods);
  payment      = BigNumber(payment ?? 0);
  presentValue = BigNumber(presentValue ?? 0);

  const compoundInterestRate = interestRate.plus(1).exponentiatedBy(periods);
  const futureValueOfPresentValue = presentValue.times(compoundInterestRate);
  const paymentInterest = payment.times(compoundInterestRate.minus(1))
                                 .dividedBy(interestRate);

  return futureValueOfPresentValue.plus(paymentInterest)
};
