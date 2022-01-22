const ripples = document.querySelectorAll(".ripple");

ripples.forEach((ripple) => {
    ripple.addEventListener("click", function (e) {
        const x = e.clientX;
        const y = e.clientY;

        const buttonTop = e.target.closest(".ripple").offsetTop;
        const buttonLeft = e.target.closest(".ripple").offsetLeft;

        const xInside = x - buttonLeft;
        const yInside = y - buttonTop;
        const span = document.createElement("span");
        span.setAttribute("class", "circle");
        span.style.top = yInside + "px";
        span.style.left = xInside + "px";
        this.appendChild(span);
        setTimeout(() => span.remove(), 500);
    });
});
