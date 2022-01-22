const url =
    "https://gamemonetize.com/rssfeed.php?format=json&category=All&type=html5&popularity=newest&company=All&amount=All";

let data;
let from = 0;
let to = 20;
let type = "";
const rowGame = document.querySelector(".row");
const overlayContent = document.querySelector(".overlay-content");
const categoriesEl = document.querySelector(".categories");
const categories = [
    ".io",
    "2 Player",
    "3D",
    "Action",
    "Adventure",
    "Arcade",
    "Baby Hazel",
    "Bejeweled",
    "Boys",
    "Clicker",
    "Cooking",
    "Girls",
    "Hypercasual",
    "Multiplayer",
    "Puzzle",
    "Racing",
    "Shooting",
    "Soccer",
    "Sports",
    "Stickman",
];
let dataRender;
let categoriesGame;

// NAV
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
    window.scrollY >= nav.offsetHeight + 150
        ? nav.classList.add("active")
        : nav.classList.remove("active");
});

// Categories
function getGameCategory(Datum) {
    categoriesGame = Datum.tags.split(",");

    categoriesGame.forEach((categoryGame, index, arr) => {
        arr[index] = categoryGame.trim();
    });

    if (categoriesGame.indexOf(Datum.category) === -1) {
        categoriesGame.push(Datum.category);
    }
    categoriesGame = categoriesGame.filter(
        (categoryGame) => categories.indexOf(categoryGame.trim()) !== -1
    );
}

function categoryClick(e) {
    if (dataRender && !e.target.classList.contains("active")) {
        document.querySelector(".tags.active").classList.remove("active");
        e.target.classList.add("active");
        closeNav();
        rowGame.innerHTML = "";
        from = 0;
        to = 20;
        type = e.target.innerText;
        showGames(data, from, to, type);
    }
}

const div = document.createElement("div");
div.classList.add("tags");
div.classList.add("active");
div.innerText = "All Game";
div.addEventListener("click", categoryClick);

categoriesEl.appendChild(div);

categories.forEach((category) => {
    const div = document.createElement("div");
    div.classList.add("tags");
    div.innerText = category.trim();
    div.addEventListener("click", categoryClick);
    categoriesEl.appendChild(div);
});

//Game

async function getGames() {
    const res = await fetch(url);
    data = await res.json();

    if (to <= data.length) {
        dataRender = data;
        showGames(dataRender, from, to);
    }
}

function showGames(data, from, to, type = "") {
    if (data) {
        if (type != "") {
            dataRender = data.filter((Datum) => {
                getGameCategory(Datum);
                return categoriesGame.indexOf(type) !== -1;
            });
        } else dataRender = data;

        for (let i = from; i < to; i++) {
            const game = document.createElement("div");
            game.setAttribute("class", "col l-2-4 m-6 c-6 pt-10 mb-20");
            game.innerHTML = `
            <div class="card " >
                <div class="card-header "></div>
                <div class="card-content">
                    <h3
                        class="card-title "
                    ></h3>
                </div>
            </div>`;

            const cardHeaders = game.querySelector(".card-header ");
            const cardTitles = game.querySelector(".card-title ");

            cardHeaders.innerHTML = `<img src="${dataRender[i].thumb}" alt="" />`;
            cardTitles.innerHTML = `${dataRender[i].title}`;

            game.addEventListener("click", () => {
                getGameCategory(dataRender[i]);

                overlayContent.innerHTML = `  
                        <div class="flexbox wide">              
                            <div class="row">
                                <div class="col l-12 m-12 c-12 " ></div>
                                <div class="col l-12 m-12 c-12 ">
                                    <div class="unit-card" data_index="1">
                                        <p>Category</p>
                                    </div>
                                    <div class="row">
                                        ${categoriesGame
                                            .map(
                                                (categoryGame) =>
                                                    `<div class="tags see-only">${categoryGame.trim()}</div>`
                                            )
                                            .join("")}
                                    </div>
                                    <div class="unit-card" data_index="2">
                                        <p>Description</p>
                                    
                                    </div>
                                    <p> ${dataRender[i].description}</p>
                                    <div class="unit-card" data_index="3">
                                        <p>Instructions</p>
                                    </div>
                                    <p> ${dataRender[i].instructions}</p>
                                </div>
                            </div>
                        </div>`;

                const iframe = document.createElement("iframe");
                iframe.setAttribute("src", dataRender[i].url);
                iframe.setAttribute("overflow", "hidden");
                iframe.setAttribute("frameborder", 0);
                iframe.setAttribute("height", window.innerHeight * 0.85);

                iframe.setAttribute("width", "100%");
                overlayContent
                    .querySelector(".row")
                    .querySelectorAll(".col")[0]
                    .appendChild(iframe);

                openNav();
                window.addEventListener("resize", () => {
                    iframe.setAttribute("height", window.innerHeight * 0.85);
                });
            });

            rowGame.appendChild(game);
        }
    }
}

getGames();

// Auto load more
window.addEventListener("scroll", (e) => {
    if (data) {
        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
        if (scrollHeight <= scrollTop + clientHeight + 10) {
            from = to;
            to = to + 10;
            if (to <= dataRender.length) {
                showGames(dataRender, from, to, type);
            }
        }
    }
});

// Overlay
function openNav() {
    document.getElementById("myNav").style.width = "100%";
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    overlayContent.innerHTML = "";
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
}
