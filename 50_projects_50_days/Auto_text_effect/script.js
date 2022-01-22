const textEl = document.getElementById("text");
const speedEl = document.getElementById("speed");
const text = ["Hello motherfucker!", "I'm An, I'm a developer!", "Nice to meet you!"];
let idx = 1;
let idxText = 0;
let speed = 300 / speedEl.value;

(function writeText() {
    textEl.innerText = text[idxText].slice(0, idx);
    if (idx < text[idxText].length) {
        idx++;
        setTimeout(writeText, speed);
    } else {
        idx = 0;
        setTimeout(writeText, 1000);
        if (idxText < text.length - 1) {
            idxText++;
        } else {
            idxText = 0;
        }
    }
})();

speedEl.addEventListener("input", () => (speed = 300 / speedEl.value));
