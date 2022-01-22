const labels = document.querySelectorAll('.form-group label');


Array.from(labels).forEach(label =>{
    let temp = 0;
    let result = '';
    for(let i = 0; i<label.innerText.length; i++){
        result += `<span style="transition-delay: ${temp}ms;">${label.innerText[i]}</span>`;
        temp += 50;
    }
    label.addEventListener('click',()=>{
        label.closest('.form-group').querySelector('input').focus();
    })
    label.innerHTML = result;
})