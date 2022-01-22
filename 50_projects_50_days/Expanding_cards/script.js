const panels = document.querySelectorAll('.panel');

panels.forEach(function(panel) {
    panel.addEventListener('click',() =>{
        removePanelActive();
        panel.classList.add('active');
    })
})

function removePanelActive() {
    panels.forEach(function(panel){
        panel.classList.remove('active');
    })
}