let ballX = 75;
let ballY = 75;
let ballSpeedX = 5;
let ballSpeedY = 7;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;

let canvas, canvasContext;

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    // var mouseY = evt.clientY - rect.Top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH/2;
}


window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    let framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos);
};

function updateAll() {
    moveBall()
    drawAll()
}

function ballReset() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function moveBall() {
    // Ball Y-axis
    ballY += ballSpeedY;

    if(ballY < 0){ //top
        ballSpeedY *= -1;
    }
    if(ballY > canvas.height){ //bottom
        // ballSpeedY *= -1;
        ballReset();
    }

    // Ball X-axis
    ballX += ballSpeedX;

    if(ballX < 0){ //left
        ballSpeedX *= -1;
    }
    if(ballX > canvas.width){ //right
        ballSpeedX *= -1;
    }

    var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

    if(
        ballY > paddleTopEdgeY && //below the top of paddle
        ballY < paddleBottomEdgeY && //above bottom of paddle
        ballX > paddleLeftEdgeX && //right of the left side of paddle
        ballX < paddleRightEdgeX //right of the left side of paddle
    ) {
        ballSpeedY *= -1;
    }

}


function drawAll(){
    colorRect(0,0, canvas.width,canvas.height, 'black');

    colorCircle(ballX,ballY, 10, 'red');

    colorRect(paddleX,canvas.height - PADDLE_DIST_FROM_EDGE, 
                PADDLE_WIDTH,PADDLE_THICKNESS, 'white');
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor){
    // Fill Canvas Rectangle
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor){
    // Fill Canvas ball
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
    canvasContext.fill();
}