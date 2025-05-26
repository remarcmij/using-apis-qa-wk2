async function foo() {
  return 42;
}

async function bar() {
  // added async keyword
  const result = await foo();
  console.log(result);
}

bar();

/* 
What will be the output of the above code?

Answer: ...
*/
