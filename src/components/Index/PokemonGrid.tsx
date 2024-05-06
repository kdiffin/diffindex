import React, { Suspense } from "react";
import {
  getAllPokemon,
  getPokemon,
  getPokemonNamesAndURLs,
} from "~/lib/fetches/PokemonFetches";
import PokemonCard from "../PokemonCard";
import { Skeleton } from "../ui/skeleton";
import { formatOrder } from "~/lib/utils";
import { matchSorter } from "match-sorter";
import SearchPokemon from "../SearchPokemon";
import { Divide, Search } from "lucide-react";
import { Input } from "../ui/input";

async function IndexPokemonCards() {
  const data = await getAllPokemon();

  return (
    <>
      {data.map((pokemon) => {
        return (
          <PokemonCard
            abilities={pokemon.abilities}
            key={pokemon.id}
            index={formatOrder(pokemon.id)}
            title={pokemon.name}
            types={pokemon.types}
            imageHref={
              pokemon.sprites?.front_default
                ? pokemon.sprites?.front_default
                : ""
            }
          />
        );
      })}
    </>
  );
}

export async function SearchPokemonCards({
  searchParams,
}: {
  searchParams: string;
}) {
  const pokemonNames = await getPokemonNamesAndURLs();

  const filteredFetches = matchSorter(
    pokemonNames.results,
    searchParams ?? "",
    {
      keys: [(item) => item.name.replace(/-/g, " ")],
      threshold: matchSorter.rankings.CONTAINS,
    },
  );

  const pokemons = await Promise.all(
    filteredFetches.map(async (item: { url: string }) => {
      const pokemonAttributes = await getPokemon(item.url);
      return pokemonAttributes;
    }),
  );

  const optimizedArray = pokemons.map((pokemon) => {
    return (
      <PokemonCard
        abilities={pokemon.abilities}
        key={pokemon.id}
        index={formatOrder(pokemon.id)}
        title={pokemon.name}
        types={pokemon.types}
        imageHref={
          pokemon.sprites?.front_default ? pokemon.sprites?.front_default : ""
        }
      />
    ); // This will return each item
  });

  return (
    <>
      {optimizedArray.length > 0 ? (
        optimizedArray
      ) : (
        <span className=" place-items-center text-center text-2xl  italic text-muted-foreground">
          No such pokemon...
        </span>
      )}
    </>
  );
}

export function PokemonCardsSkeleton() {
  const skeletonArray = new Array(20).fill("");
  return (
    <>
      {skeletonArray.map((item, i) => {
        return (
          <Skeleton
            key={i}
            className="h-[510px] w-full sm:w-[38%] lg:w-[30%]   "
          />
        );
      })}
    </>
  );
}

export function SearchPokemonFallback() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="  flex w-full max-w-screen-lg items-center gap-1  rounded-lg bg-background/20 px-6   ">
        {" "}
        <Search className="text-white" size={18} />
        <Input
          disabled
          className="w-full border-0 bg-transparent  py-6 placeholder:text-white"
          placeholder="Search..."
        />
      </div>
    </div>
  );
}

export default IndexPokemonCards;
