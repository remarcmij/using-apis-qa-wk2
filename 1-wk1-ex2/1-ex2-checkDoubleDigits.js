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
function main() {
  checkDoubleDigits(9)
    .then((message) => console.log(message))
    .catch((error) => console.log(error.message));

  checkDoubleDigits(10)
    .then((message) => console.log(message))
    .catch((error) => console.log(error.message));

  checkDoubleDigits(99)
    .then((message) => console.log(message))
    .catch((error) => console.log(error.message));

  checkDoubleDigits(100)
    .then((message) => console.log(message))
    .catch((error) => console.log(error.message));
}

main();

/*
Order of execution

All .then():
- microtask#1
- microtask#4: This is a double digit number!
- microtask#7: This is a double digit number!
- microtask#10

All .catch():
- microtask#2: Expected a double digit number but got 9
- microtask#5
- microtask#8
- microtask#11: Expected a double digit number but got 100
*/
