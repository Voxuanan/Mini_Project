const poke_container = document.getElementById("poke-container");
const btn = document.querySelector(".btn");

const isAutoLoadMore = document.querySelector("#isAutoLoadMore");
let pokemon_count = 60;
const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
};

const main_types = Object.keys(colors);

const fetchPokemons = async (from, to) => {
    for (let i = from; i <= to; i++) {
        await getPokemon(i);
    }
};

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, "0");

    const poke_types = pokemon.types.map((type) => type.type.name);
    const type = main_types.find((type) => poke_types.indexOf(type) > -1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
    </div>
    `;

    pokemonEl.innerHTML = pokemonInnerHTML;

    poke_container.appendChild(pokemonEl);
};

fetchPokemons(1, pokemon_count);

btn.addEventListener("click", () => {
    if (pokemon_count <= 898) {
        const temp = pokemon_count + 1;
        pokemon_count = pokemon_count + 30;
        if (pokemon_count > 898) pokemon_count = 898;
        fetchPokemons(temp, pokemon_count);
    }
});

// Auto load more
window.addEventListener("scroll", (e) => {
    if (isAutoLoadMore.checked) {
        const { scrollHeight, scrollTop, clientHeight } =
            document.documentElement;
        if (scrollHeight <= scrollTop + clientHeight + 10) {
            if (pokemon_count <= 898) {
                const temp = pokemon_count + 1;
                pokemon_count = pokemon_count + 30;
                if (pokemon_count > 898) pokemon_count = 898;
                fetchPokemons(temp, pokemon_count);
            }
        }
    }
});

isAutoLoadMore.addEventListener("change", (e) => {
    if (e.target.checked) btn.style.visibility = "hidden";
    else btn.style.visibility = "visible";
});
