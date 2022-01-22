const keys = document.querySelectorAll('.key');

for (let i = 0; i < keys.length-1; i++) {
    key = keys[i];
    key.style.display = 'none';
}

window.addEventListener('keydown',(e) =>{
    for (let i = 0; i < keys.length-1; i++) {
        keys[i].style.display = 'inline-flex';
        switch (i){
            case 0: keys[0].innerHTML =
                        `${e.key === ' '? 'Space': e.key}
                        <small>event.key</small>`
                    break;
            case 1: keys[1].innerHTML = 
                        `${e.keyCode}
                        <small>event.keyCode</small>`
                    break;
            case 2: keys[2].innerHTML =
                        `${e.code ==="" ? '&nbsp': e.code }
                        <small>event.code</small>`
                    break;
            default:;
        }
    }
    console.log(e.code);
    keys[keys.length-1].style.display = 'none';
})