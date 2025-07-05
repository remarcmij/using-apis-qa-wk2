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
