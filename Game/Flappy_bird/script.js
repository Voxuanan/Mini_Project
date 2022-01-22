const canvas = document.getElementById("gamezone");
const context = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("best");

const birdImg = new Image();
const background = new Image();
const topPipe = new Image();
const bottomPipe = new Image();
birdImg.src = "src/bird.png";
background.src = "src/background.png";
topPipe.src = "src/toppipe.png";
bottomPipe.src = "src/botpipe.png";

var isHold = 0;
var x = 0;
var best = 0;
var losse = 0;
var score = 0;
var pipeDistance = 140;
var distanceToBottomPipe;
var bird = {
    x: background.width / 5,
    y: background.height / 2,
};
var pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0,
};

function run() {
    if (x > 0) {
        bird.y -= 13;
        if (bird.y < 0) bird.y = 0;
        x--;
    }
    if (pipe[0].x <= -topPipe.width - 5) pipe.shift();
    context.drawImage(background, 0, 0);
    context.drawImage(birdImg, bird.x, bird.y);
    for (let i = 0; i < pipe.length; i++) {
        distanceToBottomPipe = topPipe.height + pipeDistance;
        context.drawImage(topPipe, pipe[i].x, pipe[i].y);
        context.drawImage(
            bottomPipe,
            pipe[i].x,
            pipe[i].y + distanceToBottomPipe
        );
        pipe[i].x -= 5;

        if (pipe[i].x == canvas.width / 2) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * topPipe.height) - topPipe.height,
            });
        }
        if (pipe[i].x == bird.x) score++;
        if (
            bird.y + birdImg.height >= canvas.height ||
            (bird.x + birdImg.width >= pipe[i].x &&
                bird.x <= pipe[i].x + topPipe.width &&
                (bird.y <= pipe[i].y + topPipe.height ||
                    bird.y + birdImg.height >=
                        pipe[i].y + distanceToBottomPipe))
        ) {
            scoreEl.innerText = `Press enter to restart`;
            losse = 1;
            isHold = 0;
            for (let j = i + 1; j < pipe.length; j++) {
                distanceToBottomPipe = topPipe.height + pipeDistance;
                context.drawImage(topPipe, pipe[j].x, pipe[j].y);
                context.drawImage(
                    bottomPipe,
                    pipe[j].x,
                    pipe[j].y + distanceToBottomPipe
                );
            }
            if (score > best) {
                best = score;
                bestScoreEl.innerText = `Best score :${best}`;
            }
            return;
        }
    }
    scoreEl.innerText = `Score: ${score}`;
    bird.y += 3;
    requestAnimationFrame(run);
}

document.addEventListener("keydown", (e) => {
    if (isHold == 0) {
        if (e.key == "Enter" && losse == 1) {
            bird.x = background.width / 5;
            bird.y = background.height / 2;
            pipe = [];
            pipe[0] = {
                x: canvas.width,
                y: 0,
            };
            losse = 0;
            score = 0;
            scoreEl.innerText = `Score: 0`;
            run();
        } else if (e.code == "Space" && losse == 0) {
            x += 6;
            isHold = 1;
        }
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code == "Space") isHold = 0;
});

run();
