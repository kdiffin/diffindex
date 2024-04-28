/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Badge } from "~/components/ui/badge";
import { getPokemon } from "~/lib/fetchCalls";
import { Separator } from "../../../../components/ui/separator";
import { capitalizeFirstLetter } from "~/lib/utils";
import Link from "next/link";
import Image from "next/image";

async function page({ params }: { params: { pokemon: string } }) {
  // LEFT TO DO: ADD EVOLUTION,  ADD TYPE EFFECTIVENESS, ADD FORMS, ADD MOVES, ADD POKEDEX ENTRIES
  const pokemon = await getPokemon(
    "https://pokeapi.co/api/v2/pokemon/" + params.pokemon,
  );
  const pokemonName = capitalizeFirstLetter(pokemon.name);
  const moves = pokemon.moves;

  const stats: Stat[] = pokemon.stats.map((stat) => {
    return {
      name: capitalizeFirstLetter(stat.stat.name),
      value: stat.base_stat,
    };
  });

  function PokemonSprite() {
    const imageHref = pokemon.sprites?.front_default
      ? pokemon.sprites?.front_default
      : "No Image Yet";
    const imageHref2 = pokemon.sprites?.back_default
      ? pokemon.sprites?.back_default
      : "No Image Yet";

    return (
      <div className="max-w-2xl rounded-md bg-background/20 p-8 shadow-md">
        <h2 className=" text-2xl font-semibold">{pokemonName}'s Sprites</h2>

        <div className="mt-1">
          <Badge>Regular</Badge>{" "}
          <Badge
            variant={"secondary"}
            className="pointer-events-none opacity-20"
          >
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

  return (
    <div className="container py-12 ">
      <h1 className="text-5xl font-extrabold  capitalize">{pokemonName}</h1>
      <Separator className="mb-3 mt-6" />
      <p className="py-2 text-2xl font-semibold text-muted-foreground">
        #
        {pokemon.order > 999
          ? ("000" + pokemon.order).slice(-4)
          : ("00" + pokemon.order).slice(-3)}
      </p>{" "}
      <div className="flex  items-center gap-1">
        {pokemon.types.map((type) => {
          return (
            <Badge key={type.slot} className="capitalize ">
              {type.type.name}
            </Badge>
          );
        })}
      </div>
      <div className="mt-4 grid justify-center gap-4 lg:grid-cols-2 lg:justify-normal">
        <PokemonSprite />

        <PokemonStats
          stats={stats}
          pokemon={pokemon}
          pokemonName={pokemonName}
        />

        <PokemonMoves
          moves={moves}
          pokemon={pokemon}
          pokemonName={pokemonName}
        />
      </div>
    </div>
  );
}

const PokemonMoves: React.FC<Props> = ({ moves, pokemon, pokemonName }) => {
  return (
    <div className="h-full rounded-md bg-background/20 p-8 shadow-md lg:col-span-2">
      <h2 className=" text-2xl font-semibold">{pokemonName}'s Moves</h2>
    </div>
  );
};

const PokemonStats: React.FC<Props> = ({ stats, pokemon, pokemonName }) => {
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
        <tbody>
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
                <td className={` ${index % 2 === 0 ? "w-full" : "w-full "}`}>
                  <div
                    className={`${bgColorClass} h-4 rounded-full`}
                    style={{ width: `${(stat.value / 255) * 100}%` }}
                  ></div>
                </td>
              </tr>
            );
          })}
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
