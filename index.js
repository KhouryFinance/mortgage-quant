import BigNumber from "bignumber.js";
import { monthlyInterestRate } from "./src/utils.mjs";

export { futureValue } from "./src/future-value-lump-sum.mjs";
export { futureValueWithPayments } from "./src/future-value-with-payments.mjs";
export { presentValue } from "./src/present-value-lump-sum.mjs";
export { presentValueAnnuity } from "./src/present-value-annuity.mjs";
export { monthlyPayment } from "./src/monthly-payment.mjs";
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

let myFutureValueMortgage = futureValueMortgage(360, monthlyInterestRate(0.0275), -3265.93, 800000);

console.log(myFutureValueMortgage.toFixed(4));