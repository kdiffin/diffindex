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

// these  fetch for pokemon/id page
export async function getPokemonPreviousAndNext(id: number) {
  // make 2 fetches, one for the pokemon thats previous and one for the pokemon thats next
  // ID is the pokedex order of the mon
  const res1 =
    id > 1
      ? await fetch("https://pokeapi.co/api/v2/pokemon/" + (id - 1))
      : undefined;
  const res2 = await fetch("https://pokeapi.co/api/v2/pokemon/" + (id + 1));
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

export async function getPokemon(pokemonURL: string) {
  const res = await fetch(pokemonURL);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<PokeAPI.Pokemon>;
}

// these fetches for index page
export async function getPokemonIndex(pokemonURL: string) {
  const data = await getPokemon(pokemonURL);

  return {
    abilities: data.abilities,
    name: data.name,
    id: data.id,
    order: data.order,
    sprites: data.sprites,
    types: data.types,
  };
}

export async function getAllPokemon(): Promise<GetAllPokemon[]> {
  const data = await getPokemonNamesAndURLs();

  const pokemons = await Promise.all(
    data.results.map(async (item: { url: string }) => {
      const pokemonAttributes = await getPokemonIndex(item.url);
      return pokemonAttributes;
    }),
  );

  return pokemons;
}

type GetAllPokemon = {
  abilities: PokeAPI.PokemonAbility[];
  name: string;
  id: number;
  order: number;
  sprites: PokeAPI.PokemonSprites;
  types: PokeAPI.PokemonType[];
};
