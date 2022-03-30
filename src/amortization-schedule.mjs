import BigNumber from "bignumber.js";
import { monthlyPayment } from "./monthly-payment.mjs";

export const formatSchedule = (schedule) => {
  return schedule.map((row) => formatRow(row))
}

// This function iterates over the terms and creates the table:

export const amortizationSchedule = ({
  presentValue,
  interestRate,
  periods,
}) => {
  const scheduleOfPayments = [];

  let remainingBalance = BigNumber(presentValue);
  let totalInterestPaid = BigNumber(0);
  const payment = monthlyPayment({
    presentValue,
    interestRate,
    periods
  });

  for(let counter = 0; counter < periods; counter++) {
    const row = calculateRow({
      payment,
      remainingBalance,
      presentValue,
      totalInterestPaid,
      interestRate
    });

    remainingBalance = row.remainingBalance;
    totalInterestPaid = row.totalInterestPaid;

    scheduleOfPayments.push(row);
  }

  return scheduleOfPayments;
};

// The following function determines the amount of your monthly payment that goes towards principal:

const amortizationPrincipal = ({
  payment,
  remainingBalance,
  interestRate
}) => {
  return payment.minus(
    remainingBalance.times(
      BigNumber(interestRate).dividedBy(12)
    )
  );
};

// This builds the rows for the array:

const formatRow = ({
  payment,
  remainingBalance,
  principal,
  totalInterestPaid,
  interest,
  totalPrincipal,
  percentEquity,
}) => {
  const format = (number) => {
    const formattedNumber = number.toFixed(2);
    return formattedNumber;
  };

  return {
    payment: format(payment),
    remainingBalance: format(remainingBalance),
    principal: format(principal),
    totalInterestPaid: format(totalInterestPaid),
    interest: format(interest),
    totalPrincipal: format(totalPrincipal),
    percentEquity: format(percentEquity) + "%"
  }
};

// These are the calculations that determine the values for the amortization table:

const calculateRow = ({
  payment,
  totalInterestPaid,
  remainingBalance,
  presentValue,
  interestRate
}) => {
  let principal = amortizationPrincipal({
    payment,
    remainingBalance,
    interestRate
  });
  let interest = payment - principal;

  remainingBalance = remainingBalance.minus(principal);
  totalInterestPaid = totalInterestPaid.plus(interest);

  let totalPrincipal = BigNumber(presentValue).minus(
    remainingBalance
  );
  let percentEquity = totalPrincipal
    .dividedBy(presentValue)
    .times(100);

  return {
    payment,
    remainingBalance,
    principal,
    totalInterestPaid,
    interest,
    totalPrincipal,
    percentEquity,
  };
};
