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

The purpose of any present value calculation is to determine the investment
it would take to reach a future value with a one-time investment, 
over a period of time, with a specific interest rate.

This function can help people who want to save up for a down payment determine 
how much they'd need to invest, at a particular interest rate, for a specific 
period of time, in order to save up for a down payment (future value).

Example:

Let's say you want to save up for a down payment of $100,000 -- but you only 
have a windfall of cash to invest, and can't make continuous payments into your 
investment over time.

Let's also say that you want to earn this down payment in 10 years.

How much would you need to put into an investment to earn your $100k down 
payment, with interest rates at 3.25%?

const futureValue = 100_000; 
const annualInterestRate = 0.0325; 
const numberOfYears = 10; 

Present Value = $72,627.22

So $72,627.22 is the amount of the present investment you'd need to make to 
earn your $100,000 over 10 years, with an APR of 3.25%. 



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

This function can help home buyers determine whether or not it's worthwhile to 
pay for discount points. 

Example:

Let's take a simple example of a $1,000,000 30 year fixed mortgage with a 3% 
interest rate, and a $4216,04 monthly payment. 

Let's assume you have the opportunity to pay for 3 discount points -- which 
usually cost 1% of the total loan amount per discount point. Let's say these 
points will lower your interest rate by 0.25%. 

At a $30,000 cost for a savings of $133.63 per month, are the mortgage points 
worth it?

Case 1 (without points): $1,517,774.52 total mortgage cost
Case 2 (with points): $1,469,668.25 total mortgage cost

So by paying $30k now, you'll save $48,106.27 on your mortgage costs
over 30 years, saving you a total of $18,106.27.

Seems solid. If you're planning on living in this home for 30 years this seems 
like a no brainer right? 

Wrong.

Present value shows us that this isn't necessarily the case, due to the time 
value of money.

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

---


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

Example: 

const payment = 3265.93; 
const interestRate = 0.0275;
const numberOfPayments = 360;

Total Loan Amount = 800,000

--NOTE TO NOLAN - FUNCTION DOES NOT OUTPUT THIS, SOMETHING WENT WRONG--

---


## Future Value with Payments

```javascript
import { futureValueWithPayments } from 'mortgage-quant';

const interestRate = 0.04;
const numberOfPayments = 360;
const payment = -3437.39;
const presentValue = 720_000;

const myFutureValueWithPayments = 
futureValueWithPayments(interestRate, numberOfPayments, payment, presentValue);

console.log(myFutureValueWithPayments);
// returns 

```

## About Future Value with Payments:

This function determines the future value of a present investment, similar to 
the future value lump sum mentioned above -- however, this function also takes 
into account continuous payments. 

These continuous payments must be positive or negative, depending on the 
perspective of the user. 

In the case of a person wanting to determine the future return on a lump sum 
investment, with continuous deposits, given an interest rate and a period of 
time -- the payment should be a positive number.

In the case of a lender wanting to determine what the minimum return is in order 
to make an investment worthwhile -- the payment should be a negative number. 

In order to find out the future value of an annuity, without any present 
investment, simply leave the present value blank -- as we've set it to default 
to 0.


---


## Monthly Payment

```javascript
import { monthlyPayment } from 'mortgage-quant';

const principal = 800_000; 
const apr = 0.05;
const numberOfPayments = 360;

const myMonthlyPayment = monthlyPayment(principal, apr, numberOfPayments);

console.log(myMonthlyPayment);
// returns 

```

## About Monthly Payment

The purpose of this function is to determine your monthly payment given a 
mortgage amount, monthly compounding interest rate, and number of payments over 
the course of the mortgage.

Determining your monthly payment is necssary when using other calculators, such 
as the amortization schedule below.

Example:

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


--- 


## Amortization Schedule


```javascript
import { amortizationSchedule } from 'mortgage-quant';

const loanAmount = 800000;
const months = 360; 
const apr = 0.05;

const myAmortizationSchedule = amortizationSchedule(
  loanAmount, 
  months, 
  apr
  );

console.log(myAmortizationSchedule);
// returns 

```

## About Amortization Schedule:

An amortization schedule gives mortgage borrowers a full view into their 
financial outlook.

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
- Total equity -- OUR FUNCTION DOES NOT INCLUDE DOWN PAYMENT AS PART OF EQUITY

for every month of your loan.

