"use client";
import { matchSorter } from "match-sorter";
import { PokeAPI } from "pokeapi-types";
import React, { Suspense } from "react";
import PokemonCard from "./PokemonCard";
import { formatOrder } from "~/lib/utils";
import { useSearchParams } from "next/navigation";
import { useDebounce, useDebouncedCallback } from "use-debounce";

function ClientCards({ cards }: { cards: PokeAPI.Pokemon[] }) {
  const params = useSearchParams();
  const filteredArray = matchSorter(cards, params.get("search") ?? "", {
    keys: ["name"],
  });

  const optimizedArray = filteredArray.map((pokemon) => {
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

  return <>{optimizedArray}</>;
}

export default ClientCards;
