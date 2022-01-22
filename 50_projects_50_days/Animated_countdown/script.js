const numsEl = document.querySelector(".nums");
const counter = document.querySelector(".counter");
const finalMessage = document.querySelector(".final");
const replay = document.querySelector("#replay");

time = 3;

(function createSecondSpan(time = 0) {
    for (let i = time; i >= 0; i--) {
        const span = document.createElement("span");
        span.innerText = i + "";
        numsEl.appendChild(span);
    }
})(time);

const nums = numsEl.querySelectorAll("span");

function resetDOM() {
    counter.classList.remove("hide");
    finalMessage.classList.remove("show");

    nums.forEach((num) => {
        num.classList.value = "";
    });

    nums[0].classList.add("in");
}

function runAnimation() {
    resetDOM();
    nums.forEach((num) => {
        num.addEventListener("animationend", (e) => {
            if (e.animationName === "rotateIn") {
                num.classList.remove("in");
                num.classList.add("out");
            } else if (
                e.animationName === "rotateOut" &&
                num.nextElementSibling
            ) {
                num.nextElementSibling.classList.add("in");
            } else {
                counter.classList.add("hide");
                finalMessage.classList.add("show");
            }
        });
    });
}

runAnimation();
replay.addEventListener("click", runAnimation);
