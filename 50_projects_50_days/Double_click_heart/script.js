const pictureEl = document.querySelector(".picture");
const countLiked = document.querySelector("#times");

let count = 0;
// pictureEl.addEventListener("dblclick", (e) => {
// const x = e.clientX;
// const y = e.clientY;

// const offsetTop = e.target.closest(".picture").offsetTop;
// const offsetLeft = e.target.closest(".picture").offsetLeft;

// const xInside = x - offsetLeft;
// const yInside = y - offsetTop;
// const heart = document.createElement("i");
// heart.setAttribute("class", "fas fa-heart");
// heart.style.top = yInside + "px";
// heart.style.left = xInside + "px";
// pictureEl.appendChild(heart);
// countLiked.innerText = ++count;
// setTimeout(() => heart.remove(), 1000);
// });

// hàm double click tự tạo từ hàm click
// -> ưu điểm: có thể spam liên tục chứ không cần chờ 1 khoảng như dblclick
// có thể double click ở 2 position khác nhau
let clickTime = 0;
pictureEl.addEventListener("click", (e) => {
    if (clickTime === 0) {
        clickTime = new Date().getTime();
    } else {
        if (new Date().getTime() - clickTime < 800) {
            const x = e.clientX;
            const y = e.clientY;

            const offsetTop = e.target.closest(".picture").offsetTop;
            const offsetLeft = e.target.closest(".picture").offsetLeft;

            const xInside = x - offsetLeft;
            const yInside = y - offsetTop;
            const heart = document.createElement("i");
            heart.setAttribute("class", "fas fa-heart");
            heart.style.top = yInside + "px";
            heart.style.left = xInside + "px";
            pictureEl.appendChild(heart);
            countLiked.innerText = ++count;
            setTimeout(() => heart.remove(), 1000);
        } else clickTime = new Date().getTime();
    }
});
