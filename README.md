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

## Present Value:

```javascript
import {presentValue, presentValueAnswer} from 'mortgage-quant';

const futureValue = 200_000; 
const annualInterestRate = 0.01; 
const numberOfYears = 30; 

const myPresentValue = presentValue(futureValue, annualInterestRate, numberOfYears);

console.log(myPresentValue);
// returns 148_384.58355742485697957747
```


## About Present Value
Present value is the current value of money you expect in the future, given a 
specified rate of return and time period (specifically in months for this 
function).

The purpose of any present value calculation is to determine the dollar amount
it would take to reach a future value, over a period of time, with a specific
interest rate.

---

## Future Value:

```javascript
import {futureValue, futureValueAnswer} from 'mortgage-quant';

const presentValue = 148_384.58355742485697957747; 
const annualInterestRate = 0.01;
const numberOfYears = 30;

const myFutureValue = futureValue(presentValue, annualInterestRate, years);

console.log(myFutureValue);
// returns 200000.000000000004071073225607124555368865704...

```
## About Future Value:
Future value is the yield of any investment made today, given a present value,
an annual interest rate, and the number of years you intend to invest. 

As we can see both present and future value functions output their reverse with 
miniscule inaccuracies. The reasons for these minute inaccuracies is explained 
below.



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

