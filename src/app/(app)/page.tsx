import { CookingPot } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import PokemonCard from "~/components/PokemonCard";
import IndexPokemon, { SkeletonIndex } from "~/components/fetches/IndexPokemon";
import { fetchMons } from "./actions";

export default async function HomePage() {
  const data = await fetchMons({ limit: 20, offset: 0 });
  console.log(data);
  return (
    <main className="pokemon-bg container flex   h-full flex-wrap  items-center justify-center gap-12 py-12   ">
      <Suspense fallback={<SkeletonIndex />}>
        <IndexPokemon />
      </Suspense>
    </main>
  );
}