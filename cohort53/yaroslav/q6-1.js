async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`HTTP Error ${response.status}:  ${response.statusText}`);
  } catch (error) {
    console.error(`Oops, something went wrong: ${error.message}`);
    throw error; // <== rethrow the error
  }
}

/* Does this code yield the same results in every scenario? */

function fetchData2(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          `HTTP Error ${response.status}:  ${response.statusText}`
        );
      })
      .then(resolve)
      .catch((error) => {
        console.error(`Oops, something went wrong: ${error.message}`);
        reject(error); // <== rethrow the error
      });
  });
}

const result1 = await fetchData('https://pokeapi.co/api/v2/pokemon/?limit=5');
console.log('result1', result1);

const result2 = await fetchData2('https://pokeapi.co/api/v2/pokemon/?limit=5');
console.log('result2', result2);

/* Analysis:
Wrapping the promise from fetch() in a new promise is completely unnecessary.
It does not add anything useful.
So your first (simpler) version is preferred.
*/
