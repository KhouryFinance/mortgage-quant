import BigNumber from "bignumber.js";

export { futureValueWithPayments as futureValue } from "./src/future-value-with-payments.mjs";
export { presentValueAnnuity as presentValue } from "./src/present-value-annuity.mjs";
export { monthlyPayment as payment } from "./src/monthly-payment.mjs";
export { amortizationSchedule } from "./src/amortization-schedule.mjs";
export { monthlyInterestRate } from "./src/utils.mjs";


// FUTURE TOTAL COST OF A FIXED RATE MORTGAGE
// Monthly payments * # of months
// doesn't account for variable rates

const futureValueMortgage = (
  numberOfPayPeriods,
  annualInterestRate,
  periodicPayment,
  newPresentValue
) => {
  numberOfPayPeriods = BigNumber(numberOfPayPeriods);
  annualInterestRate = BigNumber(annualInterestRate);
  periodicPayment = BigNumber(periodicPayment);
  newPresentValue = BigNumber(newPresentValue);

  let effectiveRate = annualInterestRate
    .plus(1)
    .exponentiatedBy(numberOfPayPeriods);

  return effectiveRate
    .times(newPresentValue)
    .plus(
      periodicPayment
        .times(annualInterestRate.times(0).plus(1))
        .times(effectiveRate.minus(1))
        .dividedBy(annualInterestRate)
    );
};
