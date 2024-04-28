export const fetchPokemon = async ({
  limit = 34,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<object>;
};

export async function getPokemonNamesAndURLs() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20000000&offset=0",
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<object>;
}

export async function getPokemon(pokemonURL: string) {
  const res = await fetch(pokemonURL);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<object>;
}

export async function getAllPokemon() {
  const data = await getPokemonNamesAndURLs();

  if ("results" in data && Array.isArray(data.results)) {
    const pokemons: object[] = await Promise.all(
      data.results.map(async (item: { url: string }) => {
        const pokemonAttributes = await getPokemon(item.url);
        return pokemonAttributes;
      }),
    );

    return pokemons;
  } else {
    throw new Error(
      "Invalid data format: results property is missing or not an array.",
    );
  }
}
