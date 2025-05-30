import { CustomPromise as Promise } from '../../lib/custom-promise.js';

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
    /* microtask#1 */ .then((message) => console.log(message))       // promise#2
    /* microtask#2 */ .catch((error) => console.log(error.message)); // promise#3
    /* microtask#2 runs after microtask#1 completes */

  checkDoubleDigits(10) // promise#4
    /* microtask#4 */ .then((message) => console.log(message))       // promise#5
    /* microtask#5 */ .catch((error) => console.log(error.message)); // promise#6
    /* microtask#5 runs after microtask#4 completes */

  checkDoubleDigits(99) // promise#7
    /* microtask#7 */ .then((message) => console.log(message))       // promise#8
    /* microtask#8 */ .catch((error) => console.log(error.message)); // promise#9
    /* microtask#8 runs after microtask#7 completes */

  checkDoubleDigits(100) // promise#10
    /* microtask#10 */ .then((message) => console.log(message))       // promise#11
    /* microtask#11 */ .catch((error) => console.log(error.message)); // promise#12
    /* microtask#11 runs after microtask#10 completes */
}

main();

/*
Order of execution

8 microtasks in total, one for each .then() and one for each .catch():

4 microtasks for .then():
- microtask#1
- microtask#4: This is a double digit number!
- microtask#7: This is a double digit number!
- microtask#10

4 microtasks for .catch():
- microtask#2: Expected a double digit number but got 9
- microtask#5
- microtask#8
- microtask#11: Expected a double digit number but got 100
*/
