const downBtn = document.querySelector(".down-button");
const upBtn = document.querySelector(".up-button");
const sliderContainer = document.querySelector(".slider-container");
const leftSlide = document.querySelector(".left-slide");
const rightSlide = document.querySelector(".right-slide");
const slideLength = leftSlide.querySelectorAll("div").length;

let activeSlideIndex = 0;

// Phần tử thứ cuối của left-slide đi với phần tử 0 của right-slider
leftSlide.style.top = `-${(slideLength - 1) * 100}vh`;

downBtn.addEventListener("click", () => changeSlide("down"));

upBtn.addEventListener("click", () => changeSlide("up"));

function changeSlide(direction) {
    const slideHeight = sliderContainer.clientHeight;
    if (direction === "up") {
        activeSlideIndex =
            activeSlideIndex < slideLength - 1 ? activeSlideIndex + 1 : 0;
    } else if (direction === "down") {
        activeSlideIndex =
            activeSlideIndex > 0 ? activeSlideIndex - 1 : slideLength - 1;
    }

    rightSlide.style.transform = `translateY(-${
        activeSlideIndex * slideHeight
    }px)`;
    leftSlide.style.transform = `translateY(+${
        activeSlideIndex * slideHeight
    }px)`;
}

window.addEventListener("resize", () => {
    const slideHeight = sliderContainer.clientHeight;
    rightSlide.style.transform = `translateY(-${
        activeSlideIndex * slideHeight
    }px)`;
    leftSlide.style.transform = `translateY(+${
        activeSlideIndex * slideHeight
    }px)`;
});
