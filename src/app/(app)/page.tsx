import { CookingPot, Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import PokemonCard from "~/components/PokemonCard";
import SearchIndex from "~/components/SearchIndex";
import IndexPokemon, { SkeletonIndex } from "~/components/fetches/IndexPokemon";
import { Input } from "~/components/ui/input";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  // use typescript sdk for this

  return (
    <main className="pokemon-bg container  flex h-full flex-wrap  items-center justify-center gap-12  py-12   ">
      <Suspense fallback={<SkeletonIndex />}>
        <IndexPokemon searchParams={searchParams?.sort as string} />
      </Suspense>
    </main>
  );
}
