const EXAMPLE_API = 'http://localhost:3030/pokemons';

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

function renderData(jsonData) {
  const root = document.querySelector('#data');
  const pre = document.createElement('pre');
  root.appendChild(pre);
  pre.textContent = JSON.stringify(jsonData, null, 2);
}

function renderError(err) {
  const root = document.querySelector('#data');
  const h1 = document.createElement('h1');
  h1.textContent = err.message;
  root.appendChild(h1);
}

async function getPokemons() {
  try {
    const jsonData = await fetchData(EXAMPLE_API);
    renderData(jsonData);
  } catch (err) {
    renderError(err);
  }
}

document.querySelector('#fetch').addEventListener('click', getPokemons);
