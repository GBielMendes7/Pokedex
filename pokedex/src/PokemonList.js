import React, { useState, useEffect } from 'react';
import './PokemonList.css';

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
}

function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=386');
      const data = await response.json();

      // Agora, para cada Pokémon, buscamos seus dados individuais
      const promises = data.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json()));
      const allPokemonData = await Promise.all(promises);

      setPokemonData(allPokemonData);
    };

    fetchAllPokemon();
  }, []);

  const getGeneration = (id) => {
    if (id <= 151) {
      return 'Geração 1';
    } else if (id <= 251) {
      return 'Geração 2';
    } else if (id <= 386) {
      return 'Geração 3';
    } // Continue para as outras gerações
  };

  return (
    <div>
      <div className='container'>
      {pokemonData.map((pokemon) => (
        <div className='card'>
          <div key={pokemon.id}>
            <h2>{pokemon.id}-{pokemon.name}</h2>
            <div className='teste'>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>

            <div className="tipos">
            <p className="pokemon_type" style={{ backgroundColor: colors[pokemon.types[0].type.name] }}>
              {pokemon.types[0].type.name}
            </p>

            {pokemon.types[1] && (
              <p className="pokemon_type2" style={{ backgroundColor: colors[pokemon.types[1].type.name] }}>
                {pokemon.types[1].type.name}
              </p>
              )} 
            
            </div>
            <div className='geracao'>
              <p>{getGeneration(pokemon.id)}</p>
              <p>Pokemon: {pokemon.game_indices[0].version.name}</p>

            </div>

          </div>
        </div>
      ))}

      </div>
    </div>
  );
}

export default PokemonList;
