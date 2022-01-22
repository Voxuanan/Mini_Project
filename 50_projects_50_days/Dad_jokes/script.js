const jokeEl = document.getElementById('joke');
const jokeBtnEl = document.getElementById('jokeBtn');

generateJoke()

// Promise
// function generateJoke(){
//     const config = {
//         headers:{
//             Accept: 'application/json',
//         },
//     }

//     fetch('https://icanhazdadjoke.com', config)
//         .then(response => response.json())    
//         .then(data => {
//             jokeEl.innerHTML = data.joke;
//         })
//         .catch(err => jokeEl.innerHTML = err.message)
// }


// await/ async
async function generateJoke(){
    const config = {
        headers:{
            Accept: 'application/json',
        },
    }

    try{
        const response = await fetch('https://icanhazdadjoke.com', config)
        const data = await response.json();
        jokeEl.innerHTML =  data.joke;
    } catch(e){
        jokeEl.innerHTML = e.message;
    }

        
}

jokeBtnEl.addEventListener('click',() =>{
    generateJoke();
})
