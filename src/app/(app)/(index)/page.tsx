import { Suspense } from "react";
import SearchIndex from "~/components/SearchIndex";
import IndexPokemon, {
  SearchIndexFallback,
  SkeletonIndex,
} from "~/components/fetches/PokemonGrid";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: string;
}) {
  return (
    <Suspense fallback={<SkeletonIndex />}>
      <IndexPokemon />
    </Suspense>
  );
}
