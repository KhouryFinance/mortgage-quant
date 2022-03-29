import BigNumber from "bignumber.js";
import { monthlyPayment } from "../"

test("Returns the expected value", () => {
  const presentValue = 135000
  const interestRate = 0.06
  const periods = 300

  const result = monthlyPayment({
    interestRate,
    periods,
    presentValue
  })

  expect(result.decimalPlaces(2)).toEqual(BigNumber(869.81))
});
