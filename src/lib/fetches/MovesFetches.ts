import "server-only";
import { type PokeAPI } from "pokeapi-types";

export async function getMove(moveURL: string) {
  const res = await fetch(moveURL, { cache: "no-cache" });
  const data = (await res.json()) as PokeAPI.Move;

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return {
    accuracy: data.accuracy,
    power: data.power,
    type: data.type.name,
    name: data.name,
    category: data.damage_class.name,
    pp: data.pp,
  };
}

export async function getPokemonMoves(
  moves: PokeAPI.PokemonMove[],
): Promise<Moves> {
  const fullMoves = await Promise.all(
    moves.map(async (item) => {
      const moveWithData = await getMove(item.move.url);
      return moveWithData;
    }),
  );

  const usefulAttributes = fullMoves.map((move) => {
    return move;
  });

  return usefulAttributes;
}

export type Moves = Move[];

export type Move = {
  accuracy: number;
  power: number;
  type: string;
  name: string;
  category: string;
  pp: number;
};
