const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');



smallCups.forEach( (smallCup, index) => {
 
    smallCup.addEventListener('click',() =>{
        if ((smallCups[index].classList.contains('full')) && ((index == smallCups.length-1) || (!smallCups[index].nextElementSibling.classList.contains('full')) )){
            smallCups[index].classList.remove('full');
        } else {
            smallCups.forEach((smallCup1, index1) => {   
                if (index1 <= index) smallCup1.classList.add('full');
                else smallCup1.classList.remove('full');
            });  
        }
        updateBigCups()
    })
})

function updateBigCups(){
    const smallFullCups = document.querySelectorAll('.cup-small.full');
    if (smallFullCups.length === 0){
        percentage.style.visibility = 'hidden';
        percentage.style.height = 0;
        percentage.innerText ='';
    } else {
        percentage.style.visibility = 'visible';
        percentage.innerText = (smallFullCups.length)/(smallCups.length)*100+'%'; 
        percentage.style.height = (smallFullCups.length)/(smallCups.length)*330+'px';
    }

    if (smallFullCups.length == smallCups.length){
        remained.style.visibility = 'hidden';
        remained.style.height = 0;
    } else {
        liters.innerText = (0.25*smallCups.length)-(0.25*smallFullCups.length)+'L';
        remained.style.visibility = 'visible';
    }
}

updateBigCups()
