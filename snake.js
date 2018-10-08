/* ANSI Escape Codes:
clear screen: process.stdout.write('\x1Bc');
hide cursor: process.stdout.write('\x1B[?25l');
show cursor: process.stdout.write('\x1B[?25h');
*/
process.stdout.write("+x+x+x+SNAKE+x+x+x+");
process.stdout.write("\n");

//npm packages:
var ansi = require("ansi");

var keypress = require("keypress");
keypress(process.stdin);
process.stdin.setRawMode(true);         //You don't have to press enter after the key-input


//variables
var score = 0;
var appleX;
var appleY;

var snakeX;     //direction X
var snakeY;     //direction Y

var dirX;
var dirY;

var fieldWidth = 40;
var fieldHeight = 20;


var gameOver = true;

var cursor = ansi(process.stdout);



//------------------GAME-----------------------


process.stdout.write('\x1Bc'); //clears screen

drawField(fieldHeight, fieldWidth);

placeSnake();
drawApple();



while (gameOver == true) {

    moveSnake();


    if (snakeX == fieldWidth || snakeX == fieldHeight|| snakeY == fieldWidth || snakeY == fieldHeight) {
        process.stdout.write("YOU DIED!");
        gameOver = true;
    } else {
        gameOver = false;


        //Apple is eaten:
        if (snakeX == appleX && snakeY == snakeY) {
            score++;
            drawApple();
        }

    }

}


//----------GAME FIELD----------
function drawField(fieldHeight, fieldWidth) {

    //Breite:
    cursor.bg.white();
    drawWidth(1, 1, fieldWidth);
    drawWidth(1, fieldHeight, fieldWidth);

    //Höhe:
    cursor.bg.blue();
    drawHeight(fieldWidth, 1, fieldHeight);
    drawHeight(1, 1, fieldHeight);
    cursor.bg.black();

    process.stdout.write("\n");
    process.stdout.write("Score: " + score);

}

function drawWidth(column, row, length) {
    for (var i = 0; i < length; i++) {
        cursor.goto(column + i, row).write(" ");
    }
}

function drawHeight(column, row, length) {
    for (var i = 0; i < length; i++) {
        cursor.goto(column, row + i).write("x");
    }
}



//---------- SNAKE ----------
function placeSnake() {
    //put to the middle of the field:
    snakeX = fieldWidth / 2;
    snakeY = fieldHeight / 2;

    cursor.bg.green();
    cursor.goto(snakeX, snakeY).write(" ");
    cursor.bg.reset();
}

function moveSnake() {

    snakeX = snakeX + dirX;
    snakeY = snakeY + dirY;

    process.stdin.on("keypress", handleInput);
    drawAppleSnake(snakeX, snakeY);

}


function drawAppleSnake(x, y) {
    cursor.goto(x, y).write(" ");
}


//---------- APPLE ----------

function drawApple() {
    appleX = Math.floor((Math.random() * (fieldWidth - 1)) + 2);
    appleY = Math.floor((Math.random() * (fieldHeight - 1)) + 2);

    cursor.bg.red();
    drawAppleSnake(appleX, appleY);
    cursor.bg.reset();

}



//---------- ETC  ----------

function gameOver() {
    if (snakeX == fieldWidth || snakeX == fieldWidth || snakeY == fieldWidth || snakeY == fieldHeight) {
        process.stdout.write("GAME OVER");
        return true;
    } else {
        return false;
    }
}

function handleInput(ch, key) {

    switch (key) {
        case "up": dirY = 1;  break;
        case "down": dirY = -1; break;
        case "left": dirX = -1; break;
        default: dirX = 1;            //right

    }

}

