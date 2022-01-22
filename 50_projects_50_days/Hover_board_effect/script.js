const container = document.getElementById("container");
const colors = ["#e74c3c", "#8e44ad", "#3498db", "#e67e22", "#2ecc71"];
const squareLength = 500;

for (let i = 0; i < squareLength; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.addEventListener("mouseover", () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        square.style.background = `${colors[randomIndex]}`;
        square.style.boxShadow = `0 0 2px ${colors[randomIndex]}, 0 0 10px ${colors[randomIndex]}`;
    });

    square.addEventListener("mouseout", () => {
        square.style.background = "#1d1d1d";
        square.style.boxShadow = "0 0 2px #000";
    });

    container.appendChild(square);
}
