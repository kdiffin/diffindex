import { Suspense } from "react";
import IndexPokemonCards, {
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
