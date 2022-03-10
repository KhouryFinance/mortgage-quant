// Lets implement your first function
// For now we are not bothering with exporting anything because we are just
// testing our functions and seeing if they output the right stuff.
// You can check out bankroll for an implementation example in ruby:
// https://github.com/nolantait/bankroll/blob/master/lib/bankroll/present_value.rb

// Things you might want to look up to help you:
// - Annuity factor
// - Mortgage factor
// - Fixed annuities
// - Floating point math in Javascript

const presentValue = (interestRate, periods, monthlyPayment) => {
  // Here we do stuff, to start I'm just logging Hello World so when you run
  // `yarn start` from the command line it shows something
  console.log("Hello world");
};

// 1% interest rate, 30 years, $200,000
// - Use an online calculator to find the answer
// - Run `yarn start` in your console to see the output and check your answer
presentValue(0.01, 360, 200_000);
