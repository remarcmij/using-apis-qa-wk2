// This code demonstrates how to use the Fetch API with an AbortController
// to cancel a request if it takes too long.

const ABORT_TIMEOUT_MS = 1000;
const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=5';

async function getPokemons() {
  const controller = new AbortController();
  const fetchBtn = document.querySelector('#fetch-btn');
  const output = document.querySelector('#output');

  // Disable button and show loading
  fetchBtn.disabled = true;
  output.textContent = 'Loading...';

  // Set up abort after timeout
  const timeoutId = setTimeout(() => controller.abort(), ABORT_TIMEOUT_MS);

  try {
    const response = await fetch(POKEMON_URL, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId); // Clear abort timeout if fetch completes

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    const pokemons = await response.json();
    output.textContent = JSON.stringify(pokemons, null, 2);
  } catch (err) {
    if (err.name === 'AbortError') {
      output.textContent = 'Aborted! (The request took too long)';
    } else {
      output.textContent = err.message;
    }
  } finally {
    fetchBtn.disabled = false; // Re-enable button
  }
}

function main() {
  document.querySelector('#fetch-btn').addEventListener('click', getPokemons);
}

window.addEventListener('load', main);
