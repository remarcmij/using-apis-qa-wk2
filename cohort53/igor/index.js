const VALID_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=5';
const INVALID_URL = 'https://pokeapi.co/api/v2/pokemons/?limit=5';

async function fetchJSON(url) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}

function renderResults(pokemons) {
  const errorElement = document.querySelector('#error');
  errorElement.innerText = '';

  const pokemonsElement = document.querySelector('#json');
  pokemonsElement.innerText = JSON.stringify(pokemons, null, 2);
}

function renderError(err) {
  const pokemonsElement = document.querySelector('#json');
  pokemonsElement.innerText = '';

  const errorElement = document.querySelector('#error');
  errorElement.innerText = err;
}

function main() {
  const loadingIndicator = document.querySelector('.loading-indicator');

  const button = document.querySelector('#button');
  button.addEventListener('click', async () => {
    const option = document.querySelector('#option');
    const url = option.checked ? INVALID_URL : VALID_URL;

    try {
      // Just before doing the fetch, sShow the loading indicator by removing
      // the CSS class that sets display: none on the div containing the
      // loading indicator
      loadingIndicator.classList.remove('hide');
      const data = await fetchJSON(url);
      renderResults(data);
    } catch (error) {
      renderError(error.message);
    } finally {
      // Hide the loading indicator when the fetch is done, either successfully
      // or unsuccessfully.
      loadingIndicator.classList.add('hide');
    }
  });
}

window.addEventListener('load', main);
