import { type PokeAPI } from "pokeapi-types";
import { getPokemon, getPokemonIndex } from "./PokemonFetches";

// oh boy.... writing the comments for this one isnt gonna be fun

//returning undefined triggers evolution doesnt exist
export async function getPokemonEvolutionChain(pokemonName: string) {
  const resSpecies = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`,
  );

  if (!resSpecies.ok) {
    return undefined;
  }

  const dataSpecies = (await resSpecies.json()) as PokeAPI.PokemonSpecies;

  const res = await fetch(dataSpecies.evolution_chain.url);

  if (!res.ok) {
    return undefined;
  }

  const data = (await res.json()) as PokeAPI.EvolutionChain;
  const evolutionaryLineFirstPokemon = await getPokemonIndex(
    "https://pokeapi.co/api/v2/pokemon/" + data.chain.species.name,
  );

  const evolutionLineData = [
    {
      name: evolutionaryLineFirstPokemon.name,
      sprite: evolutionaryLineFirstPokemon.sprites.front_default,
      types: evolutionaryLineFirstPokemon.types,
      pokedexId: evolutionaryLineFirstPokemon.id,
    },
  ];

  // Function to recursively fetch evolution data
  async function fetchEvolutionChain(evolutionChain: PokeAPI.ChainLink[]) {
    if (evolutionChain && evolutionChain.length > 0) {
      for (const evolution of evolutionChain) {
        if (evolution.species?.url) {
          const jsonData = await getPokemonIndex(
            "https://pokeapi.co/api/v2/pokemon/" + evolution.species.name,
          );

          evolutionLineData.push({
            name: jsonData.name,
            sprite: jsonData.sprites.front_default,
            types: jsonData.types,
            pokedexId: jsonData.id,
          });
          await fetchEvolutionChain(evolution.evolves_to);
        }
      }
    }
  }

  await fetchEvolutionChain(data.chain.evolves_to);

  return evolutionLineData;
}

export async function getPokemonForms(pokemonName: string) {
  const resSpecies = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`,
  );

  if (!resSpecies.ok) {
    return undefined;
  }

  const dataSpecies = (await resSpecies.json()) as PokeAPI.PokemonSpecies;

  const varietiesUrlsAndNames = dataSpecies.varieties;

  const varieties = await Promise.all(
    varietiesUrlsAndNames.map(async (item) => {
      const pokemonAttributes = await getPokemonIndex(item.pokemon.url);

      return {
        name: pokemonAttributes.name,
        sprite: pokemonAttributes.sprites.front_default,
        types: pokemonAttributes.types,
      };
    }),
  );

  return varieties;
}

// function checkEvolutionDetails(evolutionDetails: PokeAPI.EvolutionDetail[]) {
//   const levelUpMethods = new Set();

//   evolutionDetails.forEach((detail) => {
//     if (detail.min_level) {
//       levelUpMethods.add(detail.min_level);
//     }
//     if (detail.min_affection) {
//       levelUpMethods.add(detail.min_affection);
//     }
//     if (detail.min_beauty) {
//       levelUpMethods.add(detail.min_beauty);
//     }
//     if (detail.min_happiness) {
//       levelUpMethods.add(detail.min_happiness);
//     }
//     levelUpMethods.add(detail.trigger.name); // Always add trigger name
//   });

//   return Array.from(levelUpMethods);
// }
