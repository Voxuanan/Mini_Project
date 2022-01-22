const Buttons = document.querySelectorAll('.faq-toggle');

Buttons.forEach(button =>{
    button.addEventListener('click',() =>{
        button.closest('.faq').classList.toggle('active');
    })
})