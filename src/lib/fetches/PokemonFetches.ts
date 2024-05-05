import "server-only";
import { type PokeAPI } from "pokeapi-types";

export async function getPokemonNamesAndURLs() {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=200000&offset=0`,
    { cache: "force-cache" },
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<PokeAPI.NamedAPIResourceList>;
}

export async function getPokemon(pokemonURL: string) {
  const res = await fetch(pokemonURL);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<PokeAPI.Pokemon>;
}

export async function getAllPokemon(): Promise<PokeAPI.Pokemon[]> {
  const data = await getPokemonNamesAndURLs();

  const pokemons = await Promise.all(
    data.results.map(async (item: { url: string }) => {
      const pokemonAttributes = await getPokemon(item.url);
      return pokemonAttributes;
    }),
  );

  return pokemons;
}