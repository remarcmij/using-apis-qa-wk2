import { CustomPromise as Promise } from './custom/promise.js';

export function checkDoubleDigits(number) {
  return new Promise((resolve, reject) => {
    const isDoubleDigit = number >= 10 && number <= 99;
    if (isDoubleDigit) {
      resolve('This is a double digit number!');
    } else {
      reject(new Error(`Expected a double digit number but got ${number}`));
    }
  });
}

// prettier-ignore
function main() {
  checkDoubleDigits(9) // promise#1
    /* microtask#1 */ .then(
      (message) => console.log(message),
      (error) => console.log(error.message)
      // promise#2
    ); 

  checkDoubleDigits(10) // promise#3
    /* microtask#3 */.then(
      (message) => console.log(message),
      (error) => console.log(error.message)
      // promise#4
    );

  checkDoubleDigits(99) // promise#5
    /* microtask#5 */ .then(
      (message) => console.log(message),
      (error) => console.log(error.message)
      // promise#6
    );


  checkDoubleDigits(100) // promise#7
    /* microtask#7 */ .then(
      (message) => console.log(message),
      (error) => console.log(error.message)
      // promise#8

    );
    /* no microtask#8 */

}

if (process.env.NODE_ENV !== 'test') {
  main();
}

/*
Order of execution

All .then():
- microtask#1: Expected a double digit number but got 9
- microtask#3: This is a double digit number!
- microtask#5: This is a double digit number!
- microtask#7: Expected a double digit number but got 100
*/
