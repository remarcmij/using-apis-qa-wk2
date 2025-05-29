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
  checkDoubleDigits(9).then(
    (message) => console.log(message),
    (error) => console.log(error.message)
  );

  checkDoubleDigits(10).then(
    (message) => console.log(message),
    (error) => console.log(error.message)
  );

  checkDoubleDigits(99).then(
    (message) => console.log(message),
    (error) => console.log(error.message)
  );

  checkDoubleDigits(100).then(
    (message) => console.log(message),
    (error) => console.log(error.message)
  );
}

if (process.env.NODE_ENV !== 'test') {
  main();
}

/* 
Questions:

1. What will be the output of the code if you run it?
2. How many promises are created during execution?
3. How many microtasks are created during execution?

Answers:

1. ...
2. ...
3. ...

*/
