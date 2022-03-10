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

```javascript
import {presentValue} from 'mortgage-quant';

const futureValue = 1_000_000;
const discountRate = 0.111;
const numberOfYears = 5;

const myPresentValue = presentValue(futureValue, discountRate, numberOfYears);

console.log(myPresentValue);
// returns 590_785.33

```
