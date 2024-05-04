import { Suspense } from "react";
import SearchIndex from "~/components/SearchIndex";
import IndexPokemonCards, {
  SearchIndexFallback,
  PokemonCardsSkeleton,
} from "~/components/fetches/PokemonGrid";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: string;
}) {
  return (
    <Suspense fallback={<PokemonCardsSkeleton />}>
      <IndexPokemonCards />
    </Suspense>
  );
}
