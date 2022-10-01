const pokemonNome = document.querySelector(".pokemon_nome");
const pokemonNumero = document.querySelector(".pokemon_number");
const pokemonImagem = document.querySelector(".pokemon_image");

const form = document.querySelector(".form");
const input = document.querySelector(".input_pesquisa");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

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