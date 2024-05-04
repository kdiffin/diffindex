"use client";
import { toast, useToast } from "~/components/ui/use-toast";
import React, { useRef } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useDebouncedCallback } from "use-debounce";

function SearchPokemon() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  function updateSearch(searchValue: string) {
    if (searchValue.length > 1) {
      router.push("/search/" + searchValue.toLowerCase());
      return;
    }

    console.log(searchValue.length);

    toast({
      title: "Not specific enough",
      description: "Please enter in more than 1 character to search.",
    });
  }

  return (
    <div className="sticky top-10 z-40 flex w-full items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateSearch(inputRef.current ? inputRef.current.value : "");
        }}
        className="  flex w-full  max-w-screen-lg items-center gap-1 rounded-lg bg-background/40  px-6 backdrop-blur-3xl   "
      >
        <Search className="text-white" size={18} />

        <Input
          ref={inputRef}
          defaultValue={searchParams.get("q")?.toString()}
          className=" border-0 bg-transparent py-6 placeholder:text-white "
          placeholder="Search..."
        />
        <button className="" type="submit"></button>
      </form>
    </div>
  );
}

export default SearchPokemon;
