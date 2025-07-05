async function fetchData(url) {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  throw new Error(`HTTP Error ${response.status}:  ${response.statusText}`);
}

const result = await fetchData('https://pokeapi.co/api/v2/pokemon/?limit=5');
console.log(result);
