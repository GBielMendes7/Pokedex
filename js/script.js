const pokemonNome = document.querySelector(".pokemon_nome");
const pokemonNumero = document.querySelector(".pokemon_number");
const pokemonImagem = document.querySelector(".pokemon_image");

const pokemonTipo = document.querySelector(".pokemon_type");
const pokemonTipod = document.querySelector(".pokemon_type2");
const primeiroJogo = document.querySelector(".primeiro_jogo"); 

const form = document.querySelector(".form");
const input = document.querySelector(".input_pesquisa");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

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
 

let pesquisaPokemon = 1;

const fetchPokemon = async (pokemon) =>{
    const APIRespnse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIRespnse.status === 200){
        const data = await APIRespnse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{

    pokemonNome.innerHTML = "Procurando..."
    pokemonNumero.innerHTML = " ";

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonImagem.style.display = "block";
        pokemonNome.innerHTML = data.name;
        pokemonNumero.innerHTML = data.id;
        pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        primeiroJogo.innerHTML = data['game_indices']['0']['version']['name'];
        let tipo1 = data['types']['0']['type']['name'];
        pokemonTipo.innerHTML = tipo1;
        pokemonTipo.style.backgroundColor = colors[tipo1];
        if (data['types'].length > 1) {
            let tipo2 = data['types']['1']['type']['name'];
            pokemonTipod.innerHTML = tipo2;
            pokemonTipod.style.backgroundColor = colors[tipo2];
        } else {
            pokemonTipod.innerHTML = '';
            pokemonTipod.style.backgroundColor = ''; // Limpe o campo se não houver segundo tipo
        }
        input.value = '';
        pesquisaPokemon = data.id;
    }else{
        pokemonImagem.style.display = "none";
        pokemonNome.innerHTML = "Not found :c";
        pokemonNumero.innerHTML = " ";
    }
}


form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () =>{
    if(pesquisaPokemon > 1){
        pesquisaPokemon -= 1;
        renderPokemon(pesquisaPokemon);
    }
});

btnNext.addEventListener('click', () =>{
    pesquisaPokemon += 1;
    renderPokemon(pesquisaPokemon);

});



renderPokemon(pesquisaPokemon)