// Comment out the import statement to use native Promises
import { CustomPromise as Promise } from './custom/promise.js';

async function main(number) {
  console.log('<<< main starting >>>');

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(42), 2000);
  });

  try {
    // Try this also while leaving out `await`: an easy mistake to make
    const value = await promise;
    console.log('value:', value);
  } catch (err) {
    console.log('error:', err.message);
  }

  console.log('<<< main ending >>>');
}

main();

// Questions:
// 1. What will be the output of the above code?
// 2. How many promises will be created in total?
