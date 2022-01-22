const fill = document.querySelector(".fill");
const empties = document.querySelectorAll(".empty");

fill.addEventListener("dragstart", dragStart);
fill.addEventListener("dragend", dragEnd);

for (let i = 0, len = empties.length; i < len; i++) {
    empties[i].addEventListener("dragover", dragOver);
    empties[i].addEventListener("dragenter", dragEnter);
    empties[i].addEventListener("dragleave", dragLeave);
    empties[i].addEventListener("drop", dragDrop);
}

function dragStart(e) {
    e.target.classList.add("hold");
    setTimeout(() => {
        e.target.classList = "invisible";
    }, 0);
}

function dragEnd(e) {
    e.target.classList = "fill";
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add("hovered");
}

function dragLeave(e) {
    e.target.classList = "empty";
}

function dragDrop(e) {
    e.target.classList = "empty";
    this.append(fill);
}
