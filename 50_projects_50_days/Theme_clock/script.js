const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondEl = document.querySelector(".second");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const toggle = document.querySelector(".toggle");
const needle = document.querySelectorAll(".needle");

const htmlEl = document.documentElement;

toggle.addEventListener("click", () => {
    htmlEl.classList.toggle("dark");
    toggle.innerText = htmlEl.classList.contains("dark")
        ? "Light mode"
        : "Dark mode";
});

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

function setTime() {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const hours = time.getHours();
    const date = time.getDate();
    const hoursForClock = hours % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    if (hours == 0) needle[0].style.transition = "none";
    else needle[0].style.transition = "all 0.5s ease-in";
    if (minutes == 0) needle[1].style.transition = "none";
    else needle[1].style.transition = "all 0.5s ease-in";
    if (seconds == 0) needle[2].style.transition = "none";
    else needle[2].style.transition = "all 0.5s ease-in";

    hourEl.style.transform = `translate(-50%, -100%) rotate(${
        (hours / 12) * 360
    }deg)`;
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${
        (minutes / 60) * 360
    }deg)`;
    secondEl.style.transform = `translate(-50%, -100%) rotate(${
        (seconds / 60) * 360
    }deg)`;
    timeEl.innerText = `${hoursForClock}:${
        minutes < 10 ? `0${minutes}` : minutes
    } ${hours < 12 ? "AM" : "PM"}`;
    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
}

setTime();

setInterval(setTime, 1000);
