import React, { useState, useEffect } from 'react';
import './App.css';
import pokedex from './imagem/pokedex.png';

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

const App = () => {
    const [pesquisaPokemon, setPesquisaPokemon] = useState(1);
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        fetchPokemon(pesquisaPokemon);
    }, [pesquisaPokemon]);

    const fetchPokemon = async (pokemon) => {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if(APIResponse.status === 200){
            const data = await APIResponse.json();
            setPokemonData(data);
        }
    }

    const handlePrev = () => {
        if(pesquisaPokemon > 1){
            setPesquisaPokemon(pesquisaPokemon - 1);
        }
    }

    const handleNext = () => {
        setPesquisaPokemon(pesquisaPokemon + 1);
    }

    return (
        <div>
            {pokemonData ? (
                <>
                  <h1 class="pokemon_data">
                    <span class="pokemon_number">{pokemonData.name}</span> - 
                    <span class="pokemon_nome">{pokemonData.id}</span>
                  </h1>

                  <img class="pokemon_image" src={pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default} alt={pokemonData.name} />
                  
                  <div class="prim_apa">
                    <h4>Primeira Aparição: </h4>
                    <span class="primeiro_jogo">{pokemonData.game_indices[0].version.name}</span>
                  </div>

                  <div class="tipos"> 
                    <span class="pokemon_type" style={{backgroundColor: colors[pokemonData.types[0].type.name]}}>{pokemonData.types[0].type.name}</span>
                    {pokemonData.types.length > 1 && (
                      <span class="pokemon_type2" style={{backgroundColor: colors[pokemonData.types[1].type.name]}}>{pokemonData.types[1].type.name}</span>
                    )}
                  </div>
                  <img class="pokedex" src={pokedex} alt="pokedex"></img>

                  
                </>
            ) : (
                <h1>Procurando...</h1>
            )}
            <div class="buttons">
              <button class="button btn-prev" onClick={handlePrev}>Anterior</button>
              <button class="button btn-next" onClick={handleNext}>Próximo</button>
            </div>
        </div>
  );
}

export default App;
