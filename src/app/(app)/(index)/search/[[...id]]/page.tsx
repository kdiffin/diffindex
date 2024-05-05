import React, { Suspense } from "react";
import IndexPokemonCards, {
  SearchPokemonCards,
  PokemonCardsSkeleton,
} from "~/components/fetches/PokemonGrid";
import { getAllPokemon } from "~/lib/fetches/PokemonFetches";

async function page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<PokemonCardsSkeleton />}>
      <SearchPokemonCards searchParams={params.id} />
    </Suspense>
  );
}

export default page;
