import React, { ReactNode, Suspense } from "react";
import TypeBadge from "~/components/TypeBadge";
import {
  getPokemon,
  getPokemonPreviousAndNext,
} from "~/lib/fetches/PokemonFetches";
import { capitalizeFirstLetter, formatOrder } from "~/lib/utils";
import Link from "next/link";
import Image from "next/image";
import PokemonMoves, {
  PokemonMovesSuspense,
} from "~/components/moves/PokemonMoves";
import { Badge } from "~/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { PokeAPI } from "pokeapi-types";
import { Skeleton } from "../ui/skeleton";

export async function PreviousPokemonLink({
  pokemon,
  pokemonName,
}: {
  pokemon: PokeAPI.Pokemon;
  pokemonName: string;
}) {
  const navPokemon = await getPokemonPreviousAndNext(pokemon.id);

  return navPokemon?.previousMonData ? (
    <Link
      href={"/pokemon/" + navPokemon.previousMonData.name}
      className="group mt-2  flex items-center "
    >
      <ChevronLeft className="text-background/60 " />
      <Button
        variant={"link"}
        className="px-2 text-base italic text-muted-foreground  group-hover:text-white"
      >
        <div className="mt-1 text-left">
          <p className="capitalize">{navPokemon.previousMonData.name}</p>
          <p className="text-sm">
            {" "}
            #
            {formatOrder(
              navPokemon.previousMonData.id ? navPokemon.previousMonData.id : 0,
            )}
          </p>
        </div>
      </Button>
    </Link>
  ) : null;
}
export async function NextPokemonLink({
  pokemon,
  pokemonName,
}: {
  pokemon: PokeAPI.Pokemon;
  pokemonName: string;
}) {
  const navPokemon = await getPokemonPreviousAndNext(pokemon.id);

  return navPokemon?.nextMonData ? (
    <Link
      href={"/pokemon/" + navPokemon.nextMonData.name}
      className="group ml-auto mt-2  flex items-center"
    >
      <Button
        variant={"link"}
        className="px-2 text-base italic text-muted-foreground group-hover:text-white"
      >
        <div className="mt-1 text-left">
          <p className="capitalize">{navPokemon.nextMonData.name}</p>
          <p className="text-sm">
            {" "}
            #
            {formatOrder(
              navPokemon.nextMonData.id ? navPokemon.nextMonData.id : 0,
            )}
          </p>
        </div>
      </Button>
      <ChevronRight className="text-background/60" />
    </Link>
  ) : null;
}
export function PreviousPokemonSkeleton() {
  return (
    <div className=" mt-2 flex  h-10 w-24 items-center">
      <ChevronLeft className="text-background/60 " />
    </div>
  );
}

export function NextPokemonSkeleton() {
  return (
    <div className="ml-auto mt-2 flex  h-10  items-center">
      <ChevronRight className="text-background/60 " />
    </div>
  );
}
