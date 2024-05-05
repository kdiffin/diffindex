import { type PokeAPI } from "pokeapi-types";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getPokemonMoves } from "~/lib/fetches/MovesFetches";

const PokemonMoves: React.FC<MovesProps> = async ({ pokemon, pokemonName }) => {
  const moves = await getPokemonMoves(pokemon.moves);

  return (
    <div className="max-h-[600px] rounded-md bg-background/20 p-8 shadow-md lg:col-span-2">
      <h2 className=" text-2xl font-semibold">{pokemonName}'s Moves</h2>
      <p className="mb-3 font-light italic text-zinc-800">
        Below is a table of all the moves this pokemon has
      </p>

      <DataTable  columns={columns} data={moves} />
    </div>
  );
};

type MovesProps = {
  pokemon: PokeAPI.Pokemon;
  pokemonName: string;
};

export default PokemonMoves;
