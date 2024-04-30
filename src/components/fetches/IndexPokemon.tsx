import React, { Suspense } from "react";
import { getAllPokemon } from "~/lib/fetchCalls";
import PokemonCard from "../PokemonCard";
import { Skeleton } from "../ui/skeleton";
import { formatOrder } from "~/lib/utils";
import { matchSorter } from "match-sorter";
import SearchIndex from "../SearchIndex";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import ClientCards from "../ClientCards";

async function IndexPokemon() {
  const data = await getAllPokemon();

  return (
    <>
      <ClientCards cards={data} />/
    </>
  );
}

export function SkeletonIndex() {
  const skeletonArray = new Array(20).fill("");
  return (
    <>
      {skeletonArray.map((item, i) => {
        return (
          <Skeleton
            key={i}
            className="h-[436px] w-full sm:w-[38%] lg:w-[30%]   "
          />
        );
      })}
    </>
  );
}

export function SearchIndexFallback() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="  flex w-full max-w-screen-lg items-center gap-1  rounded-lg bg-background/20 px-6   ">
        {" "}
        <Search className="text-white" size={18} />
        <Input
          disabled
          className="w-full border-0 bg-transparent  py-6 placeholder:text-white"
          placeholder="Search..."
        />
      </div>
    </div>
  );
}

export default IndexPokemon;
