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
} from "~/components/PokemonPage/moves/PokemonMoves";
import { Badge } from "~/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  NextPokemonLink,
  NextPokemonSkeleton,
  PreviousPokemonLink,
  PreviousPokemonSkeleton,
} from "~/components/PokemonPage/Nav";
import { type PokeAPI } from "pokeapi-types";
import maleIcon from "../../../../public/maleIcon.jpeg";
import femaleIcon from "../../../../public/femaleIcon.jpeg";

function PokemonSpritesDisplay({
  pokemon,
  pokemonName,
}: {
  pokemon: PokeAPI.Pokemon;
  pokemonName: string;
}) {
  const [genderToggle, setGenderToggle] = useState("male");
  const [shinyToggle, setShinyToggle] = useState("default");

  return (
    <div className="flex max-w-2xl flex-col rounded-md bg-background/20 p-8 shadow-md">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold">{pokemonName}'s Sprites</h2>
        <button onClick={() => setGenderToggle("male")} className="ml-2">
          <Image unoptimized alt="male" src={maleIcon} width={13} height={17} />
        </button>
        <span className="pointer-events-none select-none px-1 text-sm text-accent">
          {" "}
          /{" "}
        </span>
        <button onClick={() => setGenderToggle("female")}>
          <Image
            unoptimized
            alt="female"
            src={femaleIcon}
            width={13}
            height={17}
          />
        </button>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <Badge
          onClick={() => setShinyToggle("default")}
          className="cursor-pointer"
          variant={shinyToggle === "default" ? "outline" : "default"}
        >
          Regular
        </Badge>
        <Badge
          onClick={() => setShinyToggle("shiny")}
          className="cursor-pointer"
          variant={shinyToggle === "shiny" ? "outline" : "secondary"}
        >
          Shiny
        </Badge>
      </div>
      <PokemonSprite
        genderToggle={genderToggle}
        shinyToggle={shinyToggle}
        pokemon={pokemon}
      />
    </div>
  );
}

const PokemonSprite = ({
  genderToggle,
  shinyToggle,
  pokemon,
}: {
  genderToggle: string;
  shinyToggle: string;
  pokemon: PokeAPI.Pokemon;
}) => {
  const imageHref = pokemon.sprites?.front_default
    ? pokemon.sprites.front_default
    : "No Image Yet";
  const imageHref2 = pokemon.sprites?.back_default
    ? pokemon.sprites.back_default
    : "No Image Yet";
  const imageShinyHref = pokemon.sprites?.front_shiny
    ? pokemon.sprites.front_shiny
    : "No Image Yet";
  const imageShinyHref2 = pokemon.sprites?.back_shiny
    ? pokemon.sprites.back_shiny
    : "No Image Yet";

  const femaleImageHref = pokemon.sprites?.front_female
    ? pokemon.sprites.front_female
    : "No Image Yet";
  const femaleImageHref2 = pokemon.sprites?.back_female
    ? pokemon.sprites.back_female
    : "No Image Yet";
  const femaleImageShinyHref = pokemon.sprites?.front_shiny_female
    ? pokemon.sprites.front_shiny_female
    : "No Image Yet";
  const femaleImageShinyHref2 = pokemon.sprites?.back_shiny_female
    ? pokemon.sprites.back_shiny_female
    : "No Image Yet";

  const frontSprite =
    shinyToggle === "default"
      ? genderToggle === "male"
        ? imageHref
        : femaleImageHref
      : genderToggle === "male"
        ? imageShinyHref
        : femaleImageShinyHref;

  const backSprite =
    shinyToggle === "default"
      ? genderToggle === "male"
        ? imageHref2
        : femaleImageHref2
      : genderToggle === "male"
        ? imageShinyHref2
        : femaleImageShinyHref2;

  return (
    <div className="relative flex flex-grow items-center justify-center gap-2 py-2">
      <div>
        <Image
          height={250}
          width={250}
          unoptimized
          src={frontSprite}
          className="rounded-t-xl object-cover"
          alt="No Image Yet"
        />
        <p className="text-center italic text-zinc-800">
          Frontside view of {pokemon.name}'s sprite
        </p>
      </div>
      <div>
        <Image
          height={250}
          width={250}
          unoptimized
          src={backSprite}
          className="rounded-t-xl object-cover"
          alt="No Image Yet"
        />
        <p className="text-center italic text-zinc-800">
          Backside view of {pokemon.name}'s sprite
        </p>
      </div>
    </div>
  );
};

export default PokemonSpritesDisplay;
