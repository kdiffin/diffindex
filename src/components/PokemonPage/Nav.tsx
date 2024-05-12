import React, { ReactNode, Suspense } from "react";
import TypeBadge from "~/components/TypeBadge";
import {
  getPokemon,
  getPokemonNamesAndURLs,
  getPokemonPreviousAndNext,
} from "~/lib/fetches/PokemonFetches";
import { capitalizeFirstLetter, formatOrder } from "~/lib/utils";
import Link from "next/link";
import Image from "next/image";
import PokemonMoves, {
  PokemonMovesSuspense,
} from "~/components/PokemonPage/moves/PokemonMoves";
import { Badge } from "~/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { type PokeAPI } from "pokeapi-types";
import { Skeleton } from "../ui/skeleton";

export default function PokemonNav({
  pokemon,
  pokemonName,
}: {
  pokemon: PokeAPI.Pokemon;
  pokemonName: string;
}) {
  return (
    <div className="flex items-center  gap-10   ">
      <Suspense fallback={<PreviousPokemonSkeleton />}>
        <PreviousPokemonLink pokemon={pokemon} pokemonName={pokemonName} />
      </Suspense>

      <div className="mt-0.5 flex items-center gap-2">
        <div className=" mt-2 flex flex-col gap-1">
          {pokemon.types.map((type) => {
            return (
              <TypeBadge
                key={type.slot}
                className="max-w-fit px-2 font-sans text-[8px] font-bold"
              >
                {type.type.name}
              </TypeBadge>
            );
          })}
        </div>

        <h1 className="line-clamp-1 text-3xl font-extrabold capitalize sm:line-clamp-none sm:text-5xl ">
          {pokemonName}
          <sub className="ml-1 text-lg text-zinc-600 ">
            #{formatOrder(pokemon.id)}
          </sub>
        </h1>
      </div>

      <Suspense fallback={<NextPokemonSkeleton />}>
        <NextPokemonLink pokemon={pokemon} pokemonName={pokemonName} />
      </Suspense>
    </div>
  );
}
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
        <div className="mt-1 hidden text-left sm:block">
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
        <div className="mt-1 hidden text-left sm:block">
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
    <div className=" mt-2 flex  h-10  items-center">
      <ChevronLeft className="text-background/60 " />
      <div className="space-y-1">
        <Skeleton className="h-3  w-20" />
        <Skeleton className="h-3  w-12" />
      </div>
    </div>
  );
}

export function NextPokemonSkeleton() {
  return (
    <div className="ml-auto mt-2 flex  h-10  items-center">
      <div className="space-y-1">
        <Skeleton className="h-3  w-20" />
        <Skeleton className="h-3  w-12" />
      </div>

      <ChevronRight className="text-background/60 " />
    </div>
  );
}
