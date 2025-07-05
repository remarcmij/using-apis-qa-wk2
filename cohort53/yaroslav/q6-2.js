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

async function main() {
  try {
    const result = await fetchData('https://xkcd.now.sh/?comic=latest');
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}

main();
