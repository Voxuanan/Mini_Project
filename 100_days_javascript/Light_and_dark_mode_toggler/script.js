const toggleDarkMode = document.querySelector(".toggle-darkmode");
const toggleText = document.querySelector(".toggle-text");

let darkMode = localStorage.getItem("darkmode");

const endbleDarkMode = () => {
    document.body.classList.add("darkmode");
    toggleText.innerText = "Light";
    localStorage.setItem("darkmode", "enabled");
};

const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    toggleText.innerText = "Dark";
    localStorage.setItem("darkmode", "null");
};

if (darkMode == "enabled") {
    endbleDarkMode();
}

toggleDarkMode.addEventListener("click", () => {
    let darkMode = localStorage.getItem("darkmode");
    if (darkMode != "enabled") {
        endbleDarkMode();
    } else {
        disableDarkMode();
    }
});
