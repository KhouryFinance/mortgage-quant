import BigNumber from "bignumber.js";
import { futureValue } from "../"

test("Returns the expected value", () => {
  const presentValue = 0
  const interestRate = BigNumber(0.01).dividedBy(12)
  const payment = 1608.20
  const periods = 360

  const result = futureValue({interestRate, payment, periods, presentValue})
  expect(result.decimalPlaces(2)).toEqual(BigNumber(674846.1))
});
