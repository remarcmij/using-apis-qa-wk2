function baz() {
  throw new Error('baz error');
}

function foo() {
  return new Promise((resolve, reject) => {
    const result = baz();
    resolve(result);
  });
}

async function bar() {
  try {
    const result = await foo();
    console.log('result', result);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

bar();

/* 
What will be the output of the above code?

Answer: ...
*/
