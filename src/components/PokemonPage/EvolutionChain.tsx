import Image from "next/image";
import { PokeAPI } from "pokeapi-types";
import React from "react";
import { getPokemonEvolutionChain } from "~/lib/fetches/PokemonEvolutions";
import { capitalizeFirstLetter, formatOrder } from "~/lib/utils";
import { Button } from "../ui/button";
import TypeBadge from "../TypeBadge";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

async function PokemonEvolutionChain({
  pokemon,
}: {
  pokemon: PokeAPI.Pokemon;
}) {
  const data = await getPokemonEvolutionChain(pokemon.name);

  return (
    <div className="col-span-1  h-full max-w-2xl rounded-md bg-background/20 p-8 shadow-md">
      <h2 className=" text-2xl font-semibold">Evolution Chain</h2>

      <div className="flex flex-col place-items-center py-3 ">
        <div className="  flex flex-col items-center sm:flex-row  ">
          {data && data.length > 1 ? (
            data.map((item, index) => {
              const order = formatOrder(item.pokedexId);
              const pokemonName = capitalizeFirstLetter(item.name);
              const pokemonTypes = item.types.map((type, i) => {
                return (
                  <TypeBadge className="text-xs" key={i}>
                    {type.type.name}
                  </TypeBadge>
                );
              });

              return (
                <div key={item.pokedexId} className="flex flex-col sm:flex-row">
                  {index > 0 ? (
                    <>
                      <ArrowRight
                        className="mx-4 mt-10 hidden sm:block"
                        size={30}
                      />
                      <ArrowDown
                        className=" mx-auto my-10 flex  sm:hidden"
                        size={30}
                      />
                    </>
                  ) : (
                    <> </>
                  )}{" "}
                  <Link
                    href={`/pokemon/${item.name}`}
                    className={`group relative flex flex-col items-center justify-center  `}
                  >
                    <div className="relative rounded-full    border border-background/60">
                      {item.sprite ? (
                        <Image
                          height={120}
                          width={120}
                          unoptimized
                          src={item.sprite}
                          className="  rounded-t-xl    object-cover"
                          alt="No Image Yet"
                        />
                      ) : (
                        <div className="h-[120px] w-[120px] object-cover" />
                      )}
                    </div>

                    <p className="mt-2 text-center text-sm  text-muted-foreground">
                      #{order}
                    </p>

                    <p className="my-1.5 -mt-1 text-center text-xl leading-tight text-white group-hover:underline ">
                      {pokemonName}
                    </p>

                    <div className="flex items-center gap-1">
                      {pokemonTypes}
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="grid h-[200px] flex-grow place-items-center">
              <h2 className=" text-lg font-semibold italic text-muted-foreground">
                Pokemon has no evolutions
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PokemonEvolutionChainSkeleton() {
  return <Skeleton className="col-span-1 h-full  min-h-[300px]" />;
}

export default PokemonEvolutionChain;
