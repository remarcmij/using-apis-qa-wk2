# ChatGPT Prompt

How can I add paging to a vanilla JavaScript web application that uses the Pokemon API?

## Response

To add paging (pagination) to a vanilla JavaScript web application using the Pokémon API, you can leverage the API’s built-in limit and offset query parameters.

⸻

🧩 Overview of Pagination with the Pokémon API

The API endpoint:

<https://pokeapi.co/api/v2/pokemon?limit=20&offset=0>

- `limit` specifies how many Pokémon to return.
- `offset` is the index of the first Pokémon to return (0-based).

For example:

- First 20 Pokémon: `?limit=20&offset=0`
- Next 20: `?limit=20&offset=20`
- And so on…

⸻

✅ Step-by-Step Implementation in Vanilla JavaScript

1. HTML Setup

```html
<div id="pokemon-list"></div>
<div id="pagination">
  <button id="prev-btn" disabled>Previous</button>
  <span id="page-info"></span>
  <button id="next-btn">Next</button>
</div>
```

⸻

2. JavaScript Logic

```js
const limit = 20;
let offset = 0;
let totalCount = 0;

const pokemonList = document.getElementById("pokemon-list");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageInfo = document.getElementById("page-info");

async function fetchPokemon(offset) {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const res = await fetch(url);
  const data = await res.json();
  totalCount = data.count;
  return data.results;
}

function renderPokemonList(pokemonArray) {
  pokemonList.innerHTML = pokemonArray
    .map(p => `<div>${p.name}</div>`)
    .join("");
}

function updatePaginationControls() {
  prevBtn.disabled = offset === 0;
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(totalCount / limit);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  nextBtn.disabled = offset + limit >= totalCount;
}

async function loadPage() {
  const data = await fetchPokemon(offset);
  renderPokemonList(data);
  updatePaginationControls();
}

prevBtn.addEventListener("click", () => {
  if (offset >= limit) {
    offset -= limit;
    loadPage();
  }
});

nextBtn.addEventListener("click", () => {
  if (offset + limit < totalCount) {
    offset += limit;
    loadPage();
  }
});

// Load initial page
loadPage();
```

⸻

🛠 Optional Enhancements

- Add a loading spinner during fetches.
- Include Pokémon images by fetching each individual Pokémon’s data (/pokemon/{name}).
- Support jump-to-page input.

Would you like an example with image thumbnails and types included as well?
