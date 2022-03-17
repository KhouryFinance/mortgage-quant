import BigNumber from "bignumber.js";
import { monthlyPayment } from "./monthly-payment.mjs";

// The following function determines the amount of your monthly payment that goes towards principal:

const amortizationPrincipal = ( 
  monthlyPayment,
  outstandingBalance, 
  interestRate
) => {
  monthlyPayment = BigNumber(monthlyPayment);
  outstandingBalance = BigNumber(outstandingBalance);
  interestRate = BigNumber(interestRate);

  return monthlyPayment.minus(
    outstandingBalance.times(interestRate.dividedBy(12))
  );
};

// This builds the rows for the array:

const buildRow = ({
  payment,
  balance,
  principal,
  totalInterest,
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
  row.push(format(balance));
  row.push(format(principal));
  row.push(format(totalInterest));
  row.push(format(interest));
  row.push(format(totalPrincipal));
  row.push(format(percentEquity) + "%");
  return row;
};

// These are the calculations that determine the values for the amortization table:

const calculateRow = (payment, totalInterest, balance, loanAmount) => {
  let principal = amortizationPrincipal(payment, balance, 0.05);
  let interest = payment - principal;
  balance = balance.minus(principal);
  totalInterest = totalInterest.plus(interest);
  let totalPrincipal = BigNumber(loanAmount).minus(balance);
  let percentEquity = totalPrincipal.dividedBy(loanAmount).times(100);

  const row = buildRow({
    payment,
    balance,
    principal,
    totalInterest,
    interest,
    totalPrincipal,
    percentEquity,
  });

  return { row, balance, totalInterest };
};

// This function iterates over the terms and creates the table:

export const amortizationSchedule = (loanAmount, months, apr) => {
  let counter = 0;
  let remainingBalance = BigNumber(loanAmount);
  let totalInterest = BigNumber(0);
  let monthly = monthlyPayment(loanAmount, apr, 360);
  const amortizationArray = [];

  while (counter < months) {
    const result = calculateRow(
      monthly,
      totalInterest,
      remainingBalance,
      loanAmount
    );
    remainingBalance = result.balance;
    totalInterest = result.totalInterest;
    amortizationArray.push(result.row);
    counter++;
  }

  console.table(amortizationArray);
};
