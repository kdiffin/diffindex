"use client";
import { PokeAPI } from "pokeapi-types";
import React, { useState } from "react";
import getMultipliers from "~/lib/getMultipliers";
import { Badge } from "../ui/badge";
import { invertDefenseAttackObject } from "~/lib/utils";
import TypeBadge from "../TypeBadge";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";

function PokemonTypeEffectiveness({
  pokemon,
  pokemonName,
}: {
  pokemon: PokeAPI.Pokemon;
  pokemonName: string;
}) {
  const types = pokemon.types.map((type) => type.type.name);
  const [typeToggle, setTypeToggle] = useState<"attack" | "defense">("attack");
  //   double inversion ends up in just a regular item I think (im not that good at math I jsut drew the parallel to negativity)
  const invertedMultipliers = getMultipliers(types);
  const multipliers = invertDefenseAttackObject(invertedMultipliers);

  //@ts-expect-error dont really know how to typescript this ill admit
  const renderedDefense = renderDefenseOrAttack(multipliers, "defense");
  //@ts-expect-error dont really know how to typescript this ill admit
  const renderedAttack = renderDefenseOrAttack(multipliers, "attack");

  return (
    <div className=" col-span-1 w-full  rounded-md  bg-background/20 p-8 shadow-md lg:col-span-2">
      <h2 className=" text-2xl font-semibold">
        {pokemonName}'s Type Effectiveness
      </h2>
      <div className="mt-1 flex items-center gap-2">
        <Badge
          onClick={() => setTypeToggle("attack")}
          className="cursor-pointer"
          variant={typeToggle === "attack" ? "outline" : "default"}
        >
          Attack
        </Badge>

        <Badge
          onClick={() => setTypeToggle("defense")}
          className="cursor-pointer"
          variant={typeToggle === "defense" ? "outline" : "secondary"}
        >
          Defense
        </Badge>
      </div>

      <div className="mt-4">
        <div className="flex flex-col gap-2">
          {typeToggle === "attack" ? renderedAttack : renderedDefense}
        </div>
      </div>
    </div>
  );
}

type DefenseAttackObject = Record<string, Record<string, string>>;

function renderMultiplierItems(items: string[]): JSX.Element[] {
  return items.map((item, index) => (
    <TypeBadge key={index} className="mx-1">
      {item}
    </TypeBadge>
  ));
}

function renderDefenseOrAttack(
  obj: DefenseAttackObject,
  category: string,
): JSX.Element[] {
  const jsxElements: JSX.Element[] = [];
  const selectedObj = obj[category];

  if (selectedObj) {
    for (const key in selectedObj) {
      const value = selectedObj[key];
      //@ts-expect-error dont really know how to typescript this ill admit
      const multiplierItems = renderMultiplierItems(value);
      jsxElements.push(
        <div
          key={`${category}-${key}`}
          className="inline-flex  flex-wrap items-center rounded-md bg-background/20 p-2 px-4 font-semibold"
        >
          <p className="mr-2 w-10  text-lg font-semibold">{`${key}x:`}</p>
          <Separator className=" mx-1 " orientation="vertical" />
          <div>{multiplierItems}</div>
        </div>,
      );
    }
  }

  return jsxElements;
}

export function PokemonTypeEffectivenessSkeleton() {
  return <Skeleton className="col-span-1 h-full  min-h-[286px]" />;
}

export default PokemonTypeEffectiveness;
