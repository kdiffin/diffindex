import React, { Suspense } from "react";
import ClientCards from "~/components/ClientCards";
import { SkeletonIndex } from "~/components/fetches/IndexPokemon";
import { getAllPokemon } from "~/lib/fetchCalls";

async function page() {
  const cards = await getAllPokemon();

  return <ClientCards cards={cards} />;
}

export default page;
