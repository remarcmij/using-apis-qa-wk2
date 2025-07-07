async function sleepy() {
  setTimeout(() => {
    const result = 42;
    console.log('I’m awake');
    return result;
  }, 1000);
}

const result = sleepy();
console.log(result);

/* Analysis:
I guess you want the sleepy function to return a promise that is resolved to 42
after 1000ms. The return statement inside the setTimeout callback sets the 
return value of the callback, not the value of sleepy function. Thw sleepy 
function does not have a return statement, therefore its returns a promise that 
is immediately resolved to `undefined`. That why you get the output:

Promise {undefined}
(after 1 sec) I'm awake

To create a promise that resolves after the timeout you need to use
new Promise() like in the code below.
*/

async function sleepy2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = 42;
      console.log('I’m awake too');
      resolve(result);
    }, 1000);
  });
}

const result2 = await sleepy2();
console.log(result2);
