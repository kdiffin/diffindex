import { LucideGithub, Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

function Navbar() {
  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "PokemonDB",
      href: "https://pokemondb.net/pokedex/scyther",
      target: "_blank",
      className: "text-red-500",
    },
    {
      name: "PokeAPI",
      href: "https://pokeapi.co/",
      target: "_blank",
      className: "text-yellow-300",
    },
  ];

  return (
    <nav className=" left-0 top-0 flex items-center gap-2 bg-muted/20 p-5 px-12 font-pixel ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="mr-2 flex lg:hidden"
          >
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-2 w-56 bg-background/60 backdrop-blur-3xl">
          <DropdownMenuLabel>Pages</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {navItems.map((item, i) => {
              return (
                <Link key={i} href={item.href}>
                  <DropdownMenuItem>
                    <span>{item.name}</span>
                  </DropdownMenuItem>
                </Link>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link href="/" className="   text-3xl font-bold">
        DiffinDex
      </Link>

      <div className="hidden items-center gap-2 px-3 lg:flex">
        {navItems.map((item, i) => {
          return (
            <>
              <span className="pointer-events-none select-none text-accent">
                {" "}
                /{" "}
              </span>
              <Link target={item.target} key={i} href={item.href}>
                <Button
                  className={`${item.className} text-lg`}
                  variant={"link"}
                >
                  {item.name}
                </Button>
              </Link>
            </>
          );
        })}
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
