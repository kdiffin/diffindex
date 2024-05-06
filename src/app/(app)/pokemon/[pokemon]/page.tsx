import React, { Suspense } from "react";
import TypeBadge from "~/components/TypeBadge";
import {
  getPokemon,
  getPokemonPreviousAndNext,
} from "~/lib/fetches/PokemonFetches";
import { Separator } from "../../../../components/ui/separator";
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
import PokemonSprites from "~/components/sprites/PokemonSprites";

async function page({ params }: { params: { pokemon: string } }) {
  const pokemon = await getPokemon(
    "https://pokeapi.co/api/v2/pokemon/" + params.pokemon,
  );

  const pokemonName = capitalizeFirstLetter(pokemon.name);

  const stats: Stat[] = pokemon.stats.map((stat) => {
    return {
      name: capitalizeFirstLetter(stat.stat.name),
      value: stat.base_stat,
    };
  });

  return (
    <div className="container py-12 ">
      <div className="flex items-center gap-10 ">
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

          <h1 className="text-5xl font-extrabold capitalize ">
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

      <Separator className="mb-3 mt-6" />

      <div className="mt-4 grid justify-center gap-4 lg:grid-cols-2 lg:justify-normal">
        <PokemonSprites pokemon={pokemon} pokemonName={pokemonName} />

        <PokemonStats
          stats={stats}
          pokemon={pokemon}
          pokemonName={pokemonName}
        />

        <Suspense fallback={<PokemonMovesSuspense />}>
          <PokemonMoves pokemon={pokemon} pokemonName={pokemonName} />
        </Suspense>
      </div>
    </div>
  );
}

const PokemonStats: React.FC<Props> = ({ stats, pokemon, pokemonName }) => {
  const statTotal = stats.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.value;
  }, 0);

  return (
    <div className="h-full max-w-2xl rounded-md bg-background/20 p-8 shadow-md">
      <h2 className=" text-2xl font-semibold">{pokemonName}'s Stats</h2>
      <p className="mb-3 font-light italic text-zinc-800">
        These stats are non IV/EV trained, base stats at lvl 100.
      </p>
      <table className="w-full whitespace-nowrap  ">
        <thead>
          <tr>
            <th className="rounded-tl-sm bg-background/60 px-4 py-2 text-left ">
              Stat
            </th>
            <th className="rounded-tr-sm bg-background/60  py-2 text-left ">
              Range
            </th>
            <th className="py-2"></th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody className="">
          {stats.map((stat, index) => {
            // Determine the background color based on the stat name
            let bgColorClass = "";
            switch (stat.name.toLowerCase()) {
              case "hp":
                bgColorClass = "bg-red-500 ";
                break;
              case "attack":
                bgColorClass = "bg-orange-500";
                break;
              case "defense":
                bgColorClass = "bg-blue-500";
                break;
              case "special-attack":
                bgColorClass = "bg-purple-500";
                break;
              case "special-defense":
                bgColorClass = "bg-green-500";
                break;
              case "speed":
                bgColorClass = "bg-yellow-500";
                break;
              default:
                bgColorClass = "";
            }

            return (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-background/20 " : " "}
              >
                <th className="flex justify-between px-4 py-2 font-semibold">
                  <div>
                    <Link
                      target="_blank"
                      href={`https://bulbapedia.bulbagarden.net/wiki/${stat.name}`}
                      className="mr-8 "
                    >
                      {stat.name}
                    </Link>
                  </div>
                  <div>{stat.value}</div>
                </th>
                <td className={` w-full `}>
                  <div
                    className={`${bgColorClass} h-3  rounded-full pr-4`}
                    style={{ width: `${(stat.value / 255) * 100}%` }}
                  ></div>
                </td>
              </tr>
            );
          })}

          <tr className={"rounded-b-md bg-background/20  "}>
            <th className="flex justify-between   px-4 py-2 font-semibold">
              {" "}
              <div>Total</div>
              <div>{statTotal}</div>
            </th>

            <td className={` w-full pr-4   `}>
              <div
                className={`h-3 rounded-full bg-teal-500 `}
                style={{ width: `${(statTotal / 780) * 100}%` }}
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

interface Stat {
  name: string;
  value: number;
}

interface Props {
  stats: Stat[];
  pokemon: object;
  pokemonName: string;
}
export default page;
