const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username);
        createUserCard(data);
        getRepos(username);
    } catch (e) {
        if (e.response.status == 404) {
            createErrorCard("No profile with this username");
        }
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + "/repos?sort=created");
        addRepoCard(data);
    } catch (e) {
        createErrorCard("Problem fetching repos");
    }
}

function addRepoCard(repos) {
    const reposEl = document.getElementById("repos");
    if (reposEl) {
        repos.slice(0, 9).forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");
            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
        if (repos.length > 9) {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");
            repoEl.href = repos[0].owner.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = "...";
            reposEl.appendChild(repoEl);
        }
    }
}
function createUserCard(user) {
    const cardHtml = `
    <div class="card">
        <img
            src="${user.avatar_url}"
            alt=""
            class="avatar"
        />
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>
                ${user.bio}
            </p>
            <ul>
                <li>${user.followers}<strong>Followers</strong></li>
                <li>${user.following}<strong>Following</strong></li>
                <li>${user.public_repos}<strong>Repos</strong></li>
            </ul>

            <div id="repos">
            </div>
        </div>
    </div>`;

    main.innerHTML = cardHtml;
}

function createErrorCard(mess) {
    const cardHtml = `
    <div class="card">
        <h1>${mess}</h1>
    </div>`;

    main.innerHTML = cardHtml;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);
        search.value = "";
    }
});