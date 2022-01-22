const splitLeft = document.querySelector('.split.left');
const splitRight = document.querySelector('.split.right');
const container = document.querySelector('.container');

splitLeft.addEventListener('mouseenter', function() {
    container.classList.add('hover-left');
});

splitLeft.addEventListener('mouseleave', function() {
    container.classList.remove('hover-left');
});

splitRight.addEventListener('mouseenter', function() {
    container.classList.add('hover-right');
})

splitRight.addEventListener('mouseleave', function() {
    container.classList.remove('hover-right');

});


