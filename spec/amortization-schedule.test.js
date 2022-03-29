import { formatSchedule, amortizationSchedule } from "../"

test("returns the expected first and last payment", () => {
  const presentValue = 135000
  const interestRate = 0.05
  const periods = 300

  const schedule = amortizationSchedule({
    presentValue,
    interestRate,
    periods
  })

  const formattedSchedule = formatSchedule(schedule)

  const firstPayment = formattedSchedule[0]
  const lastPayment = formattedSchedule[schedule.length - 1]

  expect(firstPayment).toEqual({
    payment: '789.20',
    remainingBalance: '134773.30',
    principal: '226.70',
    totalInterestPaid: '562.50',
    interest: '562.50',
    totalPrincipal: '226.70',
    percentEquity: '0.17%'
  })

  expect(lastPayment).toEqual({
    payment: '789.20',
    remainingBalance: '0.00',
    principal: '785.92',
    totalInterestPaid: '101758.97',
    interest: '3.27',
    totalPrincipal: '135000.00',
    percentEquity: '100.00%'
  })
})
