async function foo() {
  return 42;
}

function bar() {
  const result = await foo();
  console.log(result);
}

bar();

/* 
What will be the output of the above code?

Answer: ...
*/