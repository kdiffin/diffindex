"use client";
import Image from "next/image";
import React, { memo } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Check, Plus } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { type PokeAPI } from "pokeapi-types";

const PokemonCard = memo(function PokemonCard({
  title,
  imageHref,
  types,
  index,
  abilities,
}: {
  title: string;
  types: PokeAPI.PokemonType[];
  imageHref: string;
  index: string;
  abilities: PokeAPI.PokemonAbility[];
}) {
  const [ref, inView, entry] = useInView();

  const pokemonTypes = types.map((type, i) => {
    return (
      <Badge key={i} className="min-w-fit  uppercase">
        {type.type.name}
      </Badge>
    );
  });

  const pokemonAbilities = abilities.map((ability, i) => {
    return (
      <>
        <Button variant={"link"} className="min-w-fit px-1 pl-0 uppercase ">
          {ability.ability.name}
        </Button>
        <span className="text-primary-foreground "> / &nbsp;</span>
      </>
    );
  });

  return inView ? (
    <Card
      ref={ref}
      className=" h-[510px] w-full  overflow-hidden rounded-xl border-transparent bg-card/20 font-pixel sm:w-[40%] lg:w-[30%]   "
    >
      <>
        <CardHeader className=" mb-3  h-64 w-full ">
          <Image
            unoptimized
            height={300}
            width={300}
            src={imageHref}
            className="  mx-auto h-64 w-full     rounded-t-xl  object-cover"
            alt="a"
          />
        </CardHeader>
        <CardContent className="min-w-0  gap-4  pt-8">
          <div className="">
            <div className=" flex w-full flex-none items-center text-sm">
              <span className="mr-2 font-sans font-semibold text-accent">
                #{index}
              </span>
            </div>

            <div className="relative flex w-full min-w-0 items-center justify-between ">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className=" relative      line-clamp-1    flex-[0.6]  text-sm">
                      {pokemonAbilities}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="bg-muted">
                    <span className="        text-xs">{pokemonAbilities}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="ml-auto flex flex-[0.5] items-center justify-end gap-1">
                {pokemonTypes}
              </div>
            </div>
          </div>

          <h2 className=" -mx-6  -my-1 mt-2 border-y border-border/20 px-6 py-2 font-pixel text-2xl font-semibold capitalize text-accent ">
            {title}
          </h2>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full ">
            <Link href={`/pokemon/${title}`}>
              <PokeballSvg /> View
              <p className="capitalize">&nbsp;{title}</p>
            </Link>
          </Button>
        </CardFooter>
      </>
    </Card>
  ) : null;
});

function PokeballSvg() {
  return (
    <svg
      viewBox="0 0 512 512"
      data-name="Layer 1"
      className="-ml-2 mr-2 h-6 w-6 fill-white text-white "
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title />
      <path
        className="fill-white text-white"
        d="M450.46,256.09C449.35,175.17,399.81,102.71,324,73.79,247.59,44.67,157.49,69,105.82,132.13,54.4,195,46.61,285.58,88.49,355.68c41.8,69.95,123.74,106,203.55,91.63,91-16.37,156.14-98.12,158.35-189.14A20.16,20.16,0,0,0,450.46,256.09ZM119.05,174.38C152.76,118,220.23,87,285,99.43c69.4,13.29,120.43,70.47,128.83,139H318.41c-8.26-27.36-32-48-62.62-48-29.65,0-55.15,20.65-63.11,48H97.74A158,158,0,0,1,119.05,174.38ZM286.13,256.1c-2,38.75-60.67,39.4-60.67,0S284.17,217.33,286.13,256.1Zm24,149.79C246.85,428.58,175,408.74,132.3,356.82a157.53,157.53,0,0,1-34.57-83H192.6c7.91,27.39,33.7,48,63.19,48,30.67,0,54.36-20.68,62.62-48h95.45C406.61,333,367.54,385.32,310.14,405.89Z"
      />
    </svg>
  );
}

export default PokemonCard;
