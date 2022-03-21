import BigNumber from "bignumber.js";
import { payment } from "../"

test("Returns the expected value", () => {
  const presentValue = 135000
  const interestRate = 0.005
  const periods = 360

  const result = payment(interestRate, periods, presentValue)
  expect(result.decimalPlaces(2)).toEqual(BigNumber(869.81))
});
