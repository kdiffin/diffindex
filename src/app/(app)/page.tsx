import { Suspense } from "react";
import IndexPokemon, { SkeletonIndex } from "~/components/fetches/IndexPokemon";

export default async function HomePage() {
  return (
    <main className="pokemon-bg container  flex h-full flex-wrap  items-center justify-center gap-12  py-12   ">
      <Suspense
        fallback={
          <>
            <SkeletonIndex />{" "}
          </>
        }
      >
        <IndexPokemon />
      </Suspense>
    </main>
  );
}
