import { payment } from "../"

test("Returns the expected value", () => {
  const presentValue = 135000
  const interestRate = 0.005
  const periods = 360

  const result = futureValue(interestRate, periods, presentValue)
  expect(result).toEq(869.81)
});
