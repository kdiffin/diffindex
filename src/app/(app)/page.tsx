import { Suspense } from "react";
import SearchIndex from "~/components/SearchIndex";
import IndexPokemon, {
  SearchIndexFallback,
  SkeletonIndex,
} from "~/components/fetches/IndexPokemon";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: string;
}) {
  return (
    <main className="pokemon-bg container  flex h-full flex-wrap  items-center justify-center gap-12  py-12   ">
      <Suspense fallback={<SearchIndexFallback />}>
        <SearchIndex />
      </Suspense>

      <Suspense fallback={<SkeletonIndex />}>
        <IndexPokemon searchParams={searchParams ? searchParams : ""} />
      </Suspense>
    </main>
  );
}
