import React from "react";
import { SearchComponent } from "~/components/fetches/PokemonGrid";
import { getAllPokemon } from "~/lib/fetchCalls";

async function page({ params }: { params: { id?: string } }) {
  return <SearchComponent searchParams={params.id ?? ""} />;
}

export default page;
