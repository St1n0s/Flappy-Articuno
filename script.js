var cvs = document.getElementById("canvas");

var ctx = cvs.getContext("2d");

// Load images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// Game variables
var gap = 110;
var constant;
var bX = 10;
var bY = 150;
var gravity = 1.5;
var score = 0;

// Audio files
var fly = new Audio();
var scor = new Audio();
var death = new Audio();
fly.src = "sounds/sounds_fly.mp3";
scor.src = "sounds/sounds_score.mp3";
death.src = "sounds/sounds_death.mp3";
// on key down
document.addEventListener("keydown",moveUp);
function moveUp(){
    bY -= 50;
    fly.play();
}

// Pipe coordinates
var pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
};

// Draw images
function draw(){
    ctx.drawImage(bg,0,0);

    for(var i = 0; i < pipe.length; i++){
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        pipe[i].x--;

        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        // Collision detection
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload(); // Page reload
            death.play();
        }

        if(pipe[i].x == 5){
            score++;
            scor.play();
        }

    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    ctx.drawImage(bird,bX,bY);

    bY += gravity;

    ctx.fillStyle = "black";
    ctx.font = "20px Trebuchet MS";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    requestAnimationFrame(draw);

}

draw();
