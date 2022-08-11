const gridSize = 15;
const board = document.getElementById("snake");
var snake = [];
const HEIGHT = (gridSize*25)-2;
const WIDTH = (gridSize*50)-2;
var piece = document.createElement('div');
var timer;
var appleY; // top position of apple
var appleX; // left position of apple
var amtToGrow = 0;

// Set Board size
board.style.width = WIDTH+'px';
board.style.height = HEIGHT+'px';

// intialize game
newGame();
// listen for arrow key press
document.onkeydown = changeDirection;

// runs for every frame of game
function frame (direction) {
    const pos = move(direction);
    render();

    if (amtToGrow > 0) {
        amtToGrow -= 1;
    }

    if (checkCollision(pos[0],pos[1])){
        gameOver();
    } else if (gotApple(pos)) {
        amtToGrow = 3;
        document.getElementById('apple').remove();
        newApple();
    }
}

// update move direction on arrow key press
function changeDirection(e) {
    var direction;
    switch (e.keyCode) {
        case 38:
            direction = 'up';
            break;
        case 40:
            direction = 'down';
            break;
        case 37:
            direction = 'left';
            break;
        case 39:
            direction = 'right';
            break;
    }
    clearInterval(timer);
    timer = setInterval(function () {frame(direction)},200);
    frame(direction);
}

// renders the sake at current position
function render() {
    for (let i=0;i<snake.length;i++) {
        board.appendChild(snake[i]);
    }
}

// move the snake in current direction
function move(direction) {
    var newTop;
    var newLeft;
    var top = snake[snake.length-1].offsetTop;
    var left = snake[snake.length-1].offsetLeft;
    
    switch (direction) {
        case 'up':
            newTop = (top-gridSize);
            newLeft = left;
            break;
        case 'down':
            newTop = (top+gridSize);
            newLeft = left;
            break;
        case 'right':
            newTop = top;
            newLeft = (left+gridSize);
            break;
        case 'left':
            newTop = top;
            newLeft = (left-gridSize);
            break;
    }
    // Update snake position
    piece = document.createElement('div');
    piece.className = "body-piece";
    piece.style.left = newLeft+'px';
    piece.style.top = newTop+'px';
    if (amtToGrow == 0) {
        snake[0].remove();
        snake.splice(0,1);
    }
    snake.push(piece);
    
    return [newLeft,newTop];
}

// Create a new apple
function newApple () {
    appleX = Math.floor(Math.random()*WIDTH / gridSize) * gridSize;
    appleY = Math.floor(Math.random()*HEIGHT / gridSize) * gridSize;
    const apple = document.createElement('div');

    apple.id = 'apple';
    apple.style.top = appleY+'px';
    apple.style.left = appleX+'px';
    board.appendChild(apple);
}

// check if snake hits itself or walls
function checkCollision(left,top) {
    var collision = false;
    if (top < 0 || top >= HEIGHT || left < 0 || left >= WIDTH) {
        collision = true;
    }
    for (var i=0;i<snake.length-1;i++) {
        var segmentTop = snake[i].offsetTop;
        var segmentLeft = snake[i].offsetLeft;
        if (segmentTop == top && segmentLeft == left){
            collision = true;
        }
    }
    return collision;
}

// display game over message
function gameOver() {
    const modal = document.getElementById('game-over');
    modal.style.display = 'flex';
    clearInterval(timer);
}

// check if snake collides with apple
function gotApple (pos) {
    if (pos[0] == appleX && pos[1] == appleY) {
        return true;
    } else {
        return false;
    }
}

function newGame () {
    // clear borad
    board.innerHTML = '';
    // clear modal
    document.getElementById('game-over').style.display = 'none';
    // Initialze snake
    snake = [];
    piece.className = "body-piece";
    piece.style.top = "0px";
    piece.style.left = "0px";
    snake.push(piece)
    // create new apple
    newApple();
    // render initial snake
    render();
}