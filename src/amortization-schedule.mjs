import BigNumber from "bignumber.js";
import { monthlyPayment } from "./monthly-payment.mjs";

// This function iterates over the terms and creates the table:

export const amortizationSchedule = (
  presentValue,
  interestRate,
  periods,
) => {
  let counter = 0;
  const amortizationArray = [];

  let remainingBalance = BigNumber(presentValue);
  let totalInterestPaid = BigNumber(0);
  let payment = monthlyPayment({
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

    const result = {
      payment: row.row[0],
      balance: row.row[1],
      principal: row.row[2],
      totalInterest: row.row[3],
      interest: row.row[4],
      totalPrincipal: row.row[5],
      percentEquity: row.row[6]
    }

    amortizationArray.push(result);
  }

  return amortizationArray;
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

const buildRow = ({
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

  const row = [];
  row.push(format(payment));
  row.push(format(remainingBalance));
  row.push(format(principal));
  row.push(format(totalInterestPaid));
  row.push(format(interest));
  row.push(format(totalPrincipal));
  row.push(format(percentEquity) + "%");
  return row;
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

  const row = buildRow({
    payment,
    remainingBalance,
    principal,
    totalInterestPaid,
    interest,
    totalPrincipal,
    percentEquity,
  });

  return { row, remainingBalance, totalInterestPaid };
};
