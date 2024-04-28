import React from "react";
import { getAllPokemon } from "~/lib/fetchCalls";
import PokemonCard from "../PokemonCard";
import { Skeleton } from "../ui/skeleton";

async function IndexPokemon() {
  const data = await getAllPokemon();
  function formatOrder(order: { order: number }) {
    return "#" + ("00" + order).slice(-3);
  }

  return (
    <>
      {data?.map((pokemon) => {
        return (
          <PokemonCard
            abilities={pokemon.abilities}
            key={pokemon.id}
            index={formatOrder(pokemon.order)}
            title={pokemon.name}
            types={pokemon.types}
            imageHref={`  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png
            `}
          />
        ); // This will return each item
      })}
    </>
  );
}

export function SkeletonIndex() {
  const skeletonArray = new Array(20).fill("");
  return (
    <>
      {skeletonArray.map((item, i) => {
        return (
          <Skeleton
            key={i}
            className="h-[436px] w-full sm:w-[38%] lg:w-[30%]   "
          />
        );
      })}
    </>
  );
}

export default IndexPokemon;
