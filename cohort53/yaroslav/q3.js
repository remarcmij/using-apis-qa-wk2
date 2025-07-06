async function sleepy() {
  setTimeout(() => {
    const result = 42;
    console.log('I’m awake');
    return result;
  }, 1000);
}

const result = sleepy();
console.log(result);

/* Why does the sleepy() function return 'Promise {[[PromiseState]]: 'fulfilled', 
[[PromiseResult]]: undefined...' as synchronous 'result'?
I anticipated the sleepy() function to return either 'Promise {[[PromiseState]]: 
'fulfilled', [[PromiseResult]]: 42...', as it does with the code snippet below, 
or 'Promise {[[PromiseState]]: 'pending', [[PromiseResult]]: undefined...'
*/

// async function sleepy() {
//   const result = 42;
//   console.log("I’m awake");
//   return result;
// }
// const result = sleepy();
// console.log(result);
