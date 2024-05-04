"use client";

import React, { useRef } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useDebouncedCallback } from "use-debounce";

function SearchIndex() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  function updateSorting(searchValue: string) {
    router.push("/search/" + searchValue);
  }

  return (
    <div className="flex w-full items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateSorting(inputRef.current ? inputRef.current.value : "");
        }}
        className="  flex w-full max-w-screen-lg items-center gap-1  rounded-lg bg-background/20 px-6   "
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

export default SearchIndex;
