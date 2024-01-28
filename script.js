//board
var blockSize = 25;
var rows = 30;
var cols = 30;
var board;
var context; 

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var score = 0;
var highScore = 0;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); 

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 100); // Adjusted the interval for smoother animation
}

function update() {
    if (gameOver) {
        displayGameOver();
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        if (score > highScore) {
            highScore = score;
        }
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Game over conditions
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
        }
    }

    displayScore();
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function displayScore() {
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 30);
    context.fillText("High Score: " + highScore, 10, 60);
}

function displayGameOver() {
    context.fillStyle = "white";
    
    context.font = "40px Arial";
    var gameOverText = "Game Over";
    var gameOverTextWidth = context.measureText(gameOverText).width;
    var gameOverTextX = (board.width - gameOverTextWidth) / 2;
    var gameOverTextY = board.height / 2 - 20; 
    context.fillText(gameOverText, gameOverTextX, gameOverTextY);

    context.font = "20px Arial";
    var restartText = "Press 'R' to restart";
    var restartTextWidth = context.measureText(restartText).width;
    var restartTextX = (board.width - restartTextWidth) / 2;
    var restartTextY = board.height / 2 + 30; 
    context.fillText(restartText, restartTextX, restartTextY);
}


document.addEventListener("keyup", function(e) {
    if (gameOver && e.code === "KeyR") {
        restartGame();
    }
});

function restartGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    placeFood();
    score = 0;
    gameOver = false;
}
