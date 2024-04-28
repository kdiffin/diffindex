import React from "react";
import { getAllPokemon } from "~/lib/fetchCalls";
import PokemonCard from "../PokemonCard";
import { Skeleton } from "../ui/skeleton";

async function IndexPokemon() {
  const data = await getAllPokemon();
  function formatOrder(order: { order: number }) {
    return "#" + ("00" + order).slice(-3);
  }
  const optimizedArray = data?.map((pokemon) => {
    return (
      <PokemonCard
        abilities={pokemon.abilities}
        key={pokemon.id}
        index={formatOrder(pokemon.order)}
        title={pokemon.name}
        types={pokemon.types}
        imageHref={
          pokemon.sprites?.front_default ? pokemon.sprites?.front_default : ""
        }
      />
    ); // This will return each item
  });

  return <>{optimizedArray}</>;
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
