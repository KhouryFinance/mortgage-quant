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

Without a tool like BigNumber, our functions below would have varying levels 
of inaccuracy.

---

# About Present Value 

This present value function deals with annuity payments, the sort of payments 
you make while paying off your mortgage -- not to be confused with other present 
value calculations which take into account lump sum investments.

In the context of mortgages, present value of an annuity gives us the lender's 
perspective: will the return from the stream of payments be higher than the 
present amount that I'm lending?

With respect to the time value of money, present cash is more valuable than the 
same amount paid over time, given the opportunity cost of not investing it 
elsewhere.

This equation allows lenders to check the viability of a mortgage; what a 
stream of mortgage payments will eventually return over time, and to show the 
investor whether the price they're paying is above or below expected value, 
taking into account the time value of money. 

In other words it outputs the maximum loan amount that would be viable given 
the future stream of payments that the borrower will be paying:

## Present Value 

```javascript
import { presentValue } from 'mortgage-quant';

const payment = 3_265.93; 
const interestRate = 0.00229166666;
const periods = 360;

const myPresentValue = presentValue({payment, interestRate, periods});

console.log(myPresentValue);
// returns $800,000, the minimum loan amount that would be presently worth the 
// future annuity payments that total $1,175,734.8 (payment * numberOfPayments)

```

---

## About Future Value - With lump sum investment:
Future value is the yield of any flat investment made today, given a present 
value (lump investment), an annual interest rate, and the number of years you 
intend to invest. 

In the mortgage context this function can help home buyers determine whether or 
not it's worthwhile to pay for discount points (discount points lower the 
interest rate over the course of your loan in exchange for a lump sum paid in
the present):

### Example:

Let's take a simple example of a:
- $1,000,000 30 year fixed mortgage with a 
- 3% interest rate, and a 
- $4216,04 monthly payment. 

Let's assume you have the opportunity to pay for 3 discount points -- which 
usually cost 1% of the total loan amount per discount point. Let's say these 
points will lower your interest rate by 0.25%. 

At a $30,000 cost for a savings of $133.63 per month, are the mortgage points 
worth it?

- Case 1 (without points): $1,517,774.52 total mortgage cost

- Case 2 (with points): $1,469,668.25 total mortgage cost

So by paying $30k now, you'll save $48,106.27 on your mortgage costs
over 30 years. Leaving you total savings of of $18,106.27.

This seems solid. If you're planning on living in this home for 30 years this 
seems like a no brainer right? 

Wrong.

You could be investing that $30k elsewhere, and what would that be worth over
30 years?

Let's take the example of a fairly safe investment: 30 year treasury bonds.

At 2.46% APR, what could your $30k earn you over 30 years?

presentValue = 30,000; 
annualInterestRate = 0.0246;
numberOfYears = 30;

Future Value: $62,194.47

As we can observe, the return from a relatively low yield investment like bonds 
will still return more than purchasing mortgage points with a difference of 
$14,088.20 in profit.


## Future Value - Lump Sum:

```javascript
import { futureValue } from 'mortgage-quant';

const interestRate = 0.0246; // annual rate
const payment = 0; // set payment to 0 for lump sum calculations
const periods = 30; // compounded annually over 30 years
const presentValue = 30_000; // initial investment

const myFutureValue = futureValue({
  interestRate,
  payment,
  periods,
  presentValue
});

console.log(myFutureValue);
// returns 62_194.47 -- the return from your 30 year investment into bonds

```

---

## About Future Value (with Annuity):

This function determines the future value of a present investment, similar to 
the future value lump sum mentioned above -- however, this function also takes 
into account continuous payments. 

These continuous payments must be positive or negative, depending on the 
perspective of the user. 

For the use case of a mortgage borrower, we use a negative number since the 
loan payments are counted as a cost. 

This function can tell you how much the remaining principal on your loan is, at 
any specified time period.

### Example:

Let’s say you want to figure out how much principal you’ve paid off 10 years 
into your 30 year fixed rate mortgage:

- with an interest rate of 3.5%,
- number of payments being 360,
- a monthly payment of $3,143.31,
- and a mortgage amount of $700,000:



## Future Value with Annuity

```javascript
import { futureValue } from 'mortgage-quant';

const interestRate = 0.035;
const payment = -3143.31; // negative due to it being a payment, not investment
const periods = 120; // 10 years into your loan (10yrs * 12 months)
const presentValue = 700_000;

const myFutureValue = 
futureValue({interestRate, periods, payment, presentValue});

console.log(myFutureValue);
// returns $541,988.53 -- the remaining principal of your loan yet to be paid off

```

---


## About Monthly Payment

The purpose of this function is to determine your monthly payment given a 
mortgage amount, monthly compounding interest rate, and number of payments over 
the course of the mortgage.

Determining your monthly payment is necessary when using other calculators, such 
as the amortization schedule below.

### Example:

You want to buy a home worth $1,000,000, and you're able to put 20% down. The 
30 year fixed rate mortgage looks most appealing to you, with an APR of 5%.

What will your monthly payment be?

const principal = 800_000; 
const apr = 0.05;
const numberOfPayments = 360;

Monthly Payment = $4294.57

It's also easy to calculate the amount you'll pay on the lifetime of your loan 
if you're on a 30 year fixed rate mortgage: simply multiply the monthly payment 
by 360 -- the amount of months you pay. 

Total Mortgage Cost = $1,546,045.2 

The amortization schedule below outputs this data as well, including how much 
of your payment goes into principal and interest at every point of payment, as 
well as total interest paid and your equity stake for every month of your 
mortgage.


## Monthly Payment

```javascript
import { monthlyPayment } from 'mortgage-quant';

const presentValue = 800_000; // principal loan amount
const interestRate = 0.05; // annual interest rate
const periods = 360; // number of payments you'll make

const myMonthlyPayment = monthlyPayment({presentValue, interestRate, periods});

console.log(myMonthlyPayment);
// returns $4294.57

```

--- 


## About Amortization Schedule:

An amortization schedule gives borrowers a full view into their mortgage over 
time.

With just a few simple inputs, this function will populate an array featuring 
your payments at every period of your mortgage. 

This particular amortization schedule is designed for 30 year fixed mortgages, 
and details your:
- Monthly payment
- Remaining balance
- Amount paid into principal
- Total principal paid
- Amount paid into interest
- Total interest paid
- Total equity

for every payment period (month) of your loan.


## Amortization Schedule


```javascript
import { formatSchedule, amortizationSchedule } from 'mortgage-quant';

const presentValue = 800_000; // your loan amount
const interestRate = 0.05 // interest rate (annual)
const periods = 360 // amount of times you'll be making payments (30 years * 12)

// returns the raw numeric values as BigNumber
const schedule = amortizationSchedule({
  presentValue, 
  periods, 
  interestRate
});

// returns the values formatted as strings
const formattedSchedule = formatSchedule(schedule);


console.log(formattedSchedule);
// returns [
// {
//  payment: '4_294.57',
//  remainingBalance: '799_038.76',
//  principal: '961.24',
//  totalInterestPaid: '3_333.33',
//  interest: '3_333.33',
//  totalPrincipal: '961.24',
//  percentEquity: '0.12%'
// },
// ... 358 more payments
// ];

```

