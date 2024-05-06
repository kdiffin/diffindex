"use client";
import React, { Suspense, useState } from "react";
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
import {
  NextPokemonLink,
  NextPokemonSkeleton,
  PreviousPokemonLink,
  PreviousPokemonSkeleton,
} from "~/components/sprites/PokemonNav";
import { type PokeAPI } from "pokeapi-types";

export default function PokemonSprites({
  pokemon,
  pokemonName,
}: {
  pokemon: PokeAPI.Pokemon;
  pokemonName: string;
}) {
  const [shinyToggle, setShinyToggle] = useState<"default" | "shiny">(
    "default",
  );
  const imageHref = pokemon.sprites?.front_default
    ? pokemon.sprites.front_default
    : "No Image Yet";
  const imageHref2 = pokemon.sprites?.back_default
    ? pokemon.sprites?.back_default
    : "No Image Yet";

  return (
    <div className="max-w-2xl rounded-md bg-background/20 p-8 shadow-md">
      <h2 className=" text-2xl font-semibold">{pokemonName}'s Sprites</h2>

      <div className="mt-1">
        <Badge>Regular</Badge>{" "}
        <Badge variant={"secondary"} className="pointer-events-none opacity-20">
          Shiny
        </Badge>
      </div>

      <div className="relative  flex  items-center justify-center gap-2 ">
        <div>
          <Image
            height={250}
            width={250}
            unoptimized
            src={imageHref}
            className="      rounded-t-xl  object-cover"
            alt="No Image Yet"
          />
          <p className="text-center italic text-zinc-800">
            {" "}
            Frontside view of {pokemonName}'s sprite
          </p>
        </div>
        <div>
          <Image
            height={250}
            unoptimized
            width={250}
            src={imageHref2}
            className="  muted-foreground        rounded-t-xl  object-cover"
            alt="No Image Yet"
          />
          <p className="text-center italic text-zinc-800">
            {" "}
            Backside view of {pokemonName}'s sprite
          </p>
        </div>
      </div>
    </div>
  );
}
