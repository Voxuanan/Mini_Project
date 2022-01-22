const cardHeaders = document.querySelectorAll(".card-header ");
const cardTitles = document.querySelectorAll(".card-title ");
const cardExcerpts = document.querySelectorAll(".card-excerpt");
const profileImgs = document.querySelectorAll(".profile-img");

const names = document.querySelectorAll(".name");
const date = document.querySelectorAll(".date");

const animated_bgs = document.querySelectorAll(".animated-bg");
const animated_bg_texts = document.querySelectorAll(".animated-bg-text");

const Data = [
    {
        headerImgSrc: "./girl.jpg",
        cardTitle: "Hello motherfuckers!",
        cardExcerpt:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perferendis",
        profileImgSrc: "./girl.jpg",
        name: "An Võ",
        date: " July 03, 2001",
    },
];

setTimeout(function getData() {
    Data.forEach((datum, index) => {
        cardHeaders[
            index
        ].innerHTML = `<img src="${datum.headerImgSrc}" alt="" />`;
        cardTitles[index].innerHTML = `${datum.cardTitle}`;
        cardExcerpts[index].innerHTML = `${datum.cardExcerpt}`;
        profileImgs[
            index
        ].innerHTML = `<img src="${datum.profileImgSrc}" alt="" />`;
        names[index].innerHTML = `${datum.name}`;
        date[index].innerHTML = `${datum.date}`;
    });

    animated_bgs.forEach((bg) => bg.classList.remove("animated-bg"));
    animated_bg_texts.forEach((bg) => bg.classList.remove("animated-bg-text"));
}, 2500);
