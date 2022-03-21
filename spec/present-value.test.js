import BigNumber from "bignumber.js";
import { presentValue } from "../"

test("Returns the expected value", () => {
  const interestRate = BigNumber(0.01).dividedBy(12)
  const payment = 643.28
  const periods = 360

  const result = presentValue(interestRate, payment, periods)
  expect(result).toEq(200000.30)
});
