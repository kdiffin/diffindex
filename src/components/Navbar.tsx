import { LucideGithub, Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <nav className=" left-0 top-0 flex items-center gap-2 bg-muted/20 p-5 px-12 font-pixel ">
      <Link href="/" className="   text-3xl font-bold">
        DiffinDex
      </Link>

      <div className="hidden items-center gap-2 px-3 sm:flex">
        <span className="pointer-events-none select-none text-accent"> / </span>
        <Button asChild variant="link" className="mt-1   px-0">
          <Link href="/home" className=" text-xl">
            Home
          </Link>
        </Button>
        <span className="pointer-events-none select-none text-accent"> / </span>

        <Button asChild variant="link" className="mt-1  px-0  text-green-800">
          <Link
            target="_blank"
            href="https://bulbapedia.bulbagarden.net"
            className="text-xl text-green-800"
          >
            Bulbapedia{" "}
          </Link>
        </Button>
        <span className="pointer-events-none select-none text-accent"> / </span>

        <Button asChild variant="link" className="mt-1   px-0">
          <Link
            target="_blank"
            href="https://smogon.com"
            className="text-xl text-red-800"
          >
            Smogon{" "}
          </Link>
        </Button>
        <span className="pointer-events-none select-none text-accent"> / </span>
      </div>

      <Link
        href={"https://github.com/kdiffin"}
        className="ml-auto"
        target="_blank"
      >
        <LucideGithub />
      </Link>
    </nav>
  );
}

export default Navbar;
