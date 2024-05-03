"use client";
import { matchSorter } from "match-sorter";
import { PokeAPI } from "pokeapi-types";
import React, { Suspense, useMemo, useState } from "react";
import PokemonCard from "./PokemonCard";
import { formatOrder } from "~/lib/utils";
import { useParams, useSearchParams } from "next/navigation";
import { useDebounce, useDebouncedCallback } from "use-debounce";

function ClientCards({ cards }: { cards: PokeAPI.Pokemon[] }) {
  const params = useParams<{ id: string }>();

  const filteredArray = useMemo(() => {
    return cards.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(params.id ?? ""),
    );
  }, [cards, params.id]);

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
