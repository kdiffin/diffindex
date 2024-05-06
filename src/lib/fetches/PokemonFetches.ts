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

export async function getPokemonPreviousAndNext(id: number) {
  const res1 =
    id > 1
      ? await fetch("https://pokeapi.co/api/v2/pokemon/" + (id - 1))
      : undefined;
  const res2 = await fetch("https://pokeapi.co/api/v2/pokemon/" + (id + 1));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data1 = res1 ? ((await res1.json()) as PokeAPI.Pokemon) : undefined;
  const data2 = res2 ? ((await res2.json()) as PokeAPI.Pokemon) : undefined;

  let data;
  if (data1 && data2) {
    data = {
      previousMonData: { name: data1.name, id: data1.id },
      nextMonData: { name: data2.name, id: data2.id },
    };

    return data;
  }

  if (data1 && !data2) {
    data = {
      previousMonData: { name: data1.name, id: data1.id },
      nextMonData: undefined,
    };

    return data;
  }

  if (!data1 && data2) {
    data = {
      previousMonData: undefined,
      nextMonData: { name: data2.name, id: data2.id },
    };

    return data;
  }
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
