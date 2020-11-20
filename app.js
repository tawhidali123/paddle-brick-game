let ballX = 75;
let ballY = 75;
let ballSpeedX = 5;
let ballSpeedY = 7;

let canvas, canvasContext;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    let framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);


};

function updateAll() {
    moveBall()
    drawAll()
}

function moveBall() {
    // Ball Y-axis
    ballY += ballSpeedY;

    if(ballY < 0){
        ballSpeedY *= -1;
    }
    if(ballY > canvas.height){
        ballSpeedY *= -1;
    }

    // Ball X-axis
    ballX += ballSpeedX;

    if(ballX < 0){
        ballSpeedX *= -1;
    }
    if(ballX > canvas.width){
        ballSpeedX *= -1;
    }
}


function drawAll(){
    colorRect(0,0, canvas.width,canvas.height, 'black');

    colorCircle(ballX,ballY, 10, 'red');
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