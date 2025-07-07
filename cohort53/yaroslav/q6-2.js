async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      // If you leave the `await` keyword and response.json() returns a rejected
      // promise then the catch block in fetchData will not catch it. Instead
      // the function will just return the rejected promise. It will however be
      // caught in the next higher level up catch block, which sits in your
      // main function.
      return await response.json();
    }
    throw new Error(`HTTP Error ${response.status}:  ${response.statusText}`);
  } catch (error) {
    console.error(`Oops, something went wrong: ${error.message}`);
    throw error; // <== rethrow the error
  }
}

async function main() {
  try {
    const result = await fetchData('https://xkcd.now.sh/?comic=latest');
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}

main();

/*
Is the async keyword identical to the combination of words: 'return new Promise', 
which ensures the creation of the promise of the fetchData function, let's call 
it an external promise?

The async keyword causes the function to return a promise. How that promise
is created internally in the JavaScript engine we can not see. It is probably
compiled C code that does this.

The await keyword does not create a promise. Instead, it waits for the promise
on which it is used to settle. It the promise is resolved, it evaluates to the
resolved value. It the promise is rejected it throw an error using the
rejection value.
*/
