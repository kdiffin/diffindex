import { type PokeAPI } from "pokeapi-types";

const PokemonMoves: React.FC<MovesProps> = ({
  moves,
  pokemon,
  pokemonName,
}) => {
  return (
    <div className="h-full rounded-md bg-background/20 p-8 shadow-md lg:col-span-2">
      <h2 className=" text-2xl font-semibold">{pokemonName}'s Moves</h2>
    </div>
  );
};

type MovesProps = {
  moves: PokeAPI.PokemonMove[];
  pokemon: PokeAPI.Pokemon;
  pokemonName: string;
};

export default PokemonMoves;
