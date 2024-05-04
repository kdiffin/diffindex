import React, { Suspense } from "react";
import IndexPokemon, {
  SearchComponent,
} from "~/components/fetches/PokemonGrid";
import { getAllPokemon } from "~/lib/fetchCalls";

async function page() {
  return <IndexPokemon />;
}

export default page;
