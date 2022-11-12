import axios from 'axios';
import React, { ReactNode, useEffect, useState } from 'react';


interface PokedexProps {

}

interface PokemonListInterface {
  name: string;
  url: string;
}


const Pokedex: React.FC<PokedexProps> = () => {
  const [pokemons, setPokemons] = useState<PokemonListInterface[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<PokemonListInterface | undefined>(undefined);
  const [selectedPokemonsDetails, setSelectedPokemonsDetails] = useState<any | undefined>(undefined);
  

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon')
      .then((response) => setPokemons(response.data.results))
  }, []);

  useEffect(() => {

    if (!selectedPokemons) return

    axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemons.name}`)
    .then((response) => setSelectedPokemonsDetails(response.data))
    // effect
    // return () => {
    //   cleanup
    // }
  }, [selectedPokemons]);

  return (
    <div>
      <h1>Pokedex</h1>

      Pokemons:

      {pokemons.map((pokemon) => <button onClick={() => setSelectedPokemons(pokemon)}>{pokemon.name}</button>)}

      <h2>
        Pokemon Selecionado: <br/>
        {selectedPokemons?.name || ' Nenhum Pokemon Selecionado'}
      </h2>

      {JSON.stringify(selectedPokemonsDetails, undefined, 2)}
    </div>
  );
};

export default Pokedex;