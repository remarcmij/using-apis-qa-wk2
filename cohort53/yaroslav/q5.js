async function fetchData(url) {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  throw new Error(`HTTP Error ${response.status}:  ${response.statusText}`);
}

const result = await fetchData('https://pokeapi.co/api/v2/pokemon/?limit=5');
console.log(result);

/* 
How does the JS compiler know where the asynchronous part of the code, 
declared by the keyword await, stops? Does it trace downstream everything 
dependent on the variable response, which holds a promise?

The `await` keyword causes your code to wait for the promise of fetch to become
settled. If the promise is resolved it evaluates to the resolved value. If the
promise is rejected it throws an error with the rejection value.

It is the `async` keyword that causes `fetchData()` to return a promise and to
enable the use of the `await` keyword inside the function body.
*/
