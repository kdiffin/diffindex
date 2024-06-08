"use client";
import { type PokeAPI } from "pokeapi-types";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getPokemonMoves } from "~/lib/fetches/MovesFetches";
import { Skeleton } from "../../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

function PokemonMoves({
  pokemon,
  pokemonName,
}: {
  pokemon: PokeAPI.Pokemon;
  pokemonName: string;
}) {
  const { isLoading, error, data } = useQuery({
    queryKey: [pokemonName + "Moves"],
    queryFn: () => getPokemonMoves(pokemon.moves),
  });

  return (
    <div className="max-h-[600px] rounded-md bg-background/20 p-8 shadow-md lg:col-span-2">
      <h2 className=" text-2xl font-semibold">{pokemonName}'s Moves</h2>
      <p className="mb-3 font-light italic text-zinc-800">
        Below is a table of all the moves this pokemon has
      </p>

      <div className=" hidden lg:block">
        {isLoading || !data ? (
          <ClientPokemonMovesSkeleton />
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>

      <div className="flex min-h-40 items-center justify-center lg:hidden">
        <p className="text-center text-muted-foreground">
          Sorry, feature not available on small devices
        </p>
      </div>
    </div>
  );
}

export function ClientPokemonMovesSkeleton() {
  return (
    <div className=" border-0">
      <div className="flex items-center py-4">
        <Skeleton className="h-10 w-full max-w-sm px-3 py-2" />
      </div>

      <Skeleton className="h-[400px] max-h-full" />
    </div>
  );
}

export function PokemonMovesSuspense() {
  return (
    <Skeleton className="h-[600px]  rounded-md  p-8 lg:col-span-2"></Skeleton>
  );
}

type MovesProps = {
  pokemon: PokeAPI.Pokemon;
  pokemonName: string;
};

export default PokemonMoves;
