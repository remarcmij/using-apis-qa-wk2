async function sleepy() {
  await new Promise((r) => setTimeout(r, 1000));
  console.log('I’m awake');
}
const result = sleepy();
console.log(result);
console.log(await result);

/* Analysis:
Using `await` at the module level requires that NodeJS recognizes your JavaScript
file as a ECMAScript module. There are two way of doing this.

1. Specify the module type in the file package.json;

{
  ... 
  "type": "module"
  ...
}

2. Rename to file use the extension .mjs, e.g. q4.mjs

Without either of the two ways, NodeJS does not consider the file as an 
(ECMAScript) module and will complain about `await`.
*/
