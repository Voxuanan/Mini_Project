const loadText = document.querySelector('.loading-text');
const bg = document.querySelector('.bg');

let load = 0;

let int = setInterval(blurring,30);

function blurring() {
    load++;
    if (load > 99){
        loadText.style.display = 'none';
        clearInterval(int);
    } 

    loadText.innerText = load + '%';
    loadText.style.opacity = scale(load,1,100,1,0);
    bg.style.filter =  'blur('+scale(load,1,100,30,0)+'px)';   
}

function scale(inp,min_inp,max_inp,min_out,max_out){
    return (inp - min_inp)* (max_out-min_out)/ (max_inp-min_inp) + min_out;
}
