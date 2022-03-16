# MortgageQuant

MortgageQuant is a JavaScript suite of mortgage calculators that allows home
buyers to get a more robust vision of their finances.

This library acts as a practical and educational resource, elaborating on
financial concepts while allowing for a clear and customizable method for data
analysis. 

# Installation

    yarn add mortgage-quant

or

    npm install mortgage-quant


# Usage

## A note about decimals in JavaScript
JavaScript has a tough time handling decimals due to the garbled translation 
from binary (base 2) to our workaday number system (base 10).

For instance the code:

```javascript
	let result = (0.1 + 0.2 === 0.3);
	console.log(result);
```

Evaluates to false due to to 0.1 + 0.2 = 0.30000000000000004. This is due to 
the translation from binary.
	
In order to get some actual precision there's a few methods, with one of the 
simplest being to use a library like we're doing, 
such as [bignumber.js](https://github.com/MikeMcl/bignumber.js/)

Bignumber.js and other modules like it cleanly translate decimals from binary 
to base-10, please refer to their documentation for implementation instructions.

Without a tool like BigNumber, our functions above would be dramatically 
inaccurate. 

## Present Value - Lump Sum:

```javascript
import { presentValue } from 'mortgage-quant';

const futureValue = 200_000; 
const annualInterestRate = 0.01; 
const numberOfYears = 30; 

const myPresentValue = presentValue(futureValue, annualInterestRate, numberOfYears);

console.log(myPresentValue);
// returns 148_384.58355742485697957747
```


## About Present Value - Lump Sum
Present value is the current value of money you expect in the future, given a 
specified rate of return and time period (specifically in months for this 
function).

The purpose of any present value calculation is to determine the dollar amount
it would take to reach a future value with a one-time investment, 
over a period of time, with a specific interest rate.

---

## Future Value - Lump Sum:

```javascript
import { futureValue } from 'mortgage-quant';

const presentValue = 148_384.58355742485697957747; 
const annualInterestRate = 0.01;
const numberOfYears = 30;

const myFutureValue = futureValue(presentValue, annualInterestRate, numberOfYears);

console.log(myFutureValue);
// returns 200000.000000000004071073225607124555368865704...

```
## About Future Value - Lump Sum:
Future value is the yield of any flat investment made today, given a present 
value (lump investment), an annual interest rate, and the number of years you 
intend to invest. 

As we can see both present and future value functions output their reverse with 
miniscule inaccuracies. The reasons for these inaccuracies is explained above.


## Present Value of an Annuity

```javascript
import { presentValueAnnuity } from 'mortgage-quant';

const payment = 7_406; 
const interestRate = 0.01;
const numberOfPayments = 360;

const myPresentValueAnnuity = presentValueAnnuity(payment, interestRate, numberOfPayments);

console.log(myPresentValueAnnuity);
// returns 

```

# About Present Value of an Annuity

While the previous present value function dealt with lump sums, present value 
of an annuity deals with a continuous stream of payments.

In the context of mortgages, present value of an annuity gives us the lender's 
perspective: will the return from the stream of payments be higher than the 
present amount that I'm lending?

With respect to the time value of money, present cash is more valuable than the 
same amount paid over time, given the opportunity cost of not investing it 
elsewhere.

This equation allows lenders to check the viability of a mortgage; what a 
stream of mortgage payments will eventually return over time, and to show the 
investor whether the price they're paying is above or below expected value.

In simple terms, the present value of an annuity is the value of all future 
annuity payments. It calculates the present value of future cash flows.

Given a monthly payment, an interest rate, and the number of payments to be 
made, the present value of an annuity will output your total loan amount.


## Future Value of an Annuity




## Monthly Payment

```javascript
import { monthlyPayment } from 'mortgage-quant';

const principal = 720_000; 
const interestRate = 0.01;
const numberOfPayments = 360;

const myMonthlyPayment = monthlyPayment(principal, interestRate, numberOfPayments);

console.log(myMonthlyPayment);
// returns 

```

## About Monthly Payment

The purpose of this function is to determine your monthly payment given a 
mortgage amount, monthly compounding interest rate, and number of payments over 
the course of the mortgage.

Determining your monthly payment is necssary when using other calculators, such 
as amortization schedules.



