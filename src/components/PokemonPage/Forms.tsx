import Image from "next/image";
import { type PokeAPI } from "pokeapi-types";
import React from "react";
import { getPokemonForms } from "~/lib/fetches/PokemonEvolutions";
import { capitalizeFirstLetter, formatOrder } from "~/lib/utils";
import TypeBadge from "../TypeBadge";
import { ArrowRight, Divide } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

async function PokemonForms({
  pokemon,
  pokemonName,
}: {
  pokemon: PokeAPI.Pokemon;
  pokemonName: string;
}) {
  const data = await getPokemonForms(pokemon.name);

  return (
    <div className="col-span-1  h-full max-w-2xl rounded-md bg-background/20 p-8 shadow-md">
      <h2 className=" text-2xl font-semibold">{pokemonName}'s Forms</h2>
      <div className="flex flex-col items-center justify-center py-3 ">
        <div className="  flex items-center  ">
          {data && data.length > 1 ? (
            data.map((item, index) => {
              const pokemonName = capitalizeFirstLetter(item.name);
              const pokemonTypes = item.types.map((type, i) => {
                return (
                  <TypeBadge className="text-xs" key={i}>
                    {type.type.name}
                  </TypeBadge>
                );
              });

              return index < 3 ? (
                <div key={item.name} className=" flex">
                  {index > 0 ? (
                    <ArrowRight className=" mx-4 mt-10" size={30} />
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

                    <p className="my-1.5  text-center text-xl leading-tight text-white group-hover:underline ">
                      {pokemonName}
                    </p>

                    <div className="flex items-center gap-1">
                      {pokemonTypes}
                    </div>
                  </Link>
                </div>
              ) : null;
            })
          ) : (
            <div className="grid h-[200px] flex-grow place-items-center">
              <h2 className=" text-lg font-semibold italic text-muted-foreground">
                Pokemon has no extra forms
              </h2>
            </div>
          )}
        </div>
      </div>{" "}
    </div>
  );
}

export function PokemonFormsSkeleton() {
  return <Skeleton className="col-span-1 h-full  min-h-[300px]" />;
}

export default PokemonForms;