const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const form = document.getElementById("form");
const main = document.getElementById("main");
const home = document.querySelector(".home");

const search = document.querySelector(".search");
const overlayContent = document.getElementById("overlay-content");

getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
        <img src="${IMG_PATH + movie.poster_path}" alt="">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <span class="${
                movie.vote_average >= 8
                    ? "green"
                    : movie.vote_average >= 5
                    ? "orange"
                    : "red"
            }">${movie.vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            <p>${movie.overview}</p>
            <button class="see-more" id="${movie.id}">See more</button> 
        </div>`;
        main.appendChild(movieEl);

        document.getElementById(`${movie.id}`).addEventListener("click", () => {
            openNav(movie.id);
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== "") {
        getMovies(SEARCH_API + searchTerm + '"');
    } else {
        window.location.reload();
    }
});

home.addEventListener("click", () => {
    getMovies(API_URL);
});

async function openNav(id) {
    const rest = await fetch(
        "https://api.themoviedb.org/3/movie/" +
            id +
            "/videos?api_key=3fd2be6f0c70a2a598f084ddfb75487c"
    );
    const data = await rest.json();
    if (data) {
        const embed = [];
        data.results.forEach((result) => {
            if (result.site == "YouTube")
                embed.push(
                    `<iframe width="560" height="315" src="https://www.youtube.com/embed/${result.key}" title="${result.name}" frameborder="0" allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                );
        });
        if (embed.length > 0) overlayContent.innerHTML = embed.join("");
        else
            overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
        document.getElementById("myNav").style.width = "100%";
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    }
}

document.getElementById("myNav").addEventListener("click", () => {
    closeNav();
});

function closeNav() {
    overlayContent.innerHTML = "";
    document.getElementById("myNav").style.width = "0%";
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
}
