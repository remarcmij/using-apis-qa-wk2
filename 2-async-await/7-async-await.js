async function foo() {
  throw new Error('Oops, something went wrong...');
}

async function bar() {
  try {
    const result = await foo();
    console.log(result);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

bar();

/* 
What will be the output of the above code?

Answer: ...
*/
