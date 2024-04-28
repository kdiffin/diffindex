"use server";

import { fetchPokemon } from "~/lib/fetchCalls";

export async function fetchMons({ limit = 30, offset }) {
  const data = await fetchPokemon({ limit: limit, offset: offset });
  return data;
}
