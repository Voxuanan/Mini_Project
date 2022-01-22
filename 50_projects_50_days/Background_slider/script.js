const slides = document.querySelectorAll('.slide');
const buttonLeft = document.getElementById('left');
const buttonRight = document.getElementById('right');
const bodyEl = document.body;


let active = 0;
bodyEl.style.backgroundImage = slides[active].style.backgroundImage;

buttonLeft.addEventListener('click',() =>{
    slides.forEach(slide => slide.classList.remove('active'));
    if (active > 0 ) active--; else active = slides.length-1;
    slides[active].classList.add('active');
    bodyEl.style.backgroundImage = slides[active].style.backgroundImage;
})

buttonRight.addEventListener('click',() =>{
    slides.forEach(slide => slide.classList.remove('active'));
    if (active < slides.length-1 ) active++; else active = 0;
    slides[active].classList.add('active');
    bodyEl.style.backgroundImage = slides[active].style.backgroundImage;
})