async function get3Pokemon() {
  try {
    const prom1 = fetch('https://pokeapi.co/api/v2/pokemon/1xyz').then((res) =>
      res.json()
    );
    const prom2 = fetch('https://pokeapi.co/api/v2/pokemon/2').then((res) =>
      res.json()
    );
    const prom3 = fetch('https://pokeapi.co/api/v2/pokemon/3').then((res) =>
      res.json()
    );
    const results = await Promise.all([prom1, prom2, prom3]);
    printPokemon(results);
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
  }
}

function printPokemon(results) {
  for (let pokemon of results) {
    console.log(pokemon.name);
  }
}

get3Pokemon();
