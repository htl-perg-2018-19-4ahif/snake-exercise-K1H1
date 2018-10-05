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



//variables
var score = 0;
var appleX;
var appleY;

var snakeX;
var snakeY;

var fieldWidth=20;
var fieldHeight=20;

var posX;
var posY;

var gameOver = false;

var cursor = ansi(process.stdout);
process.stdin.on('keypress', readInput);

//------------------GAME-----------------------

placeSnake();
drawField(fieldHeight,fieldWidth);

while (gameOver != false) {
    //<- calling function, after every snake- move call 'gameOver' function to check if snake ran into the fieldborder ->

    moveSnake();
    gameOver();




    

}

//----------GAME FIELD----------
    function drawField(fieldHeight, fieldWidth) {
        cursor.bg.blue();
        process.stdout.write("Color-test");
        cursor.bg.white();

        drawWidth(1, 1, fieldWidth);

        drawHeight(1, 2, fieldHeight);


    }

function drawWidth(col, row, length) {
    for (var i = 0; i < length; i++) {
        cursor.goto(col + i, row).write(' ');
    }
}

function drawHeight(col, row, length) {
    for (var i = 0; i < length; i++) {
        cursor.goto(col, row + i).write(' ');
    }
}






//---------- SNAKE ----------
function placeSnake() {

    //put to the middle of the field:
    snakeX = fieldWidth / 2;
    snakeY = fieldHeight / 2;

    cursor.bg.green();

    cursor.bg.black();

}

function moveSnake() {
    snakeX = snakeX + posX;
    snakeY = snakeY + posY;

}

function removeSnake() {

}





//---------- APPLE ----------

function drawApple() {

}


function removeApple() {

}



//---------- ETC  ----------

function gameOver() {
    if (snakeX == fieldWidth || snakeY == fieldHeight) {
        process.stdout.write("GAME OVER");
        return true;
    } else {
        return false;
    }
}

function readInput(ch, key) {
    // up:
    if (key.name == "up") {
        posY = posY + 1;
        process.stdout.write("up");

        //down:
    } else if (key.name == "down") {
        posY = posY - 1;
        process.stdout.write("down");

        //right:
    } else if (key.name == "right") {
        posX = posX + 1;
        process.stdout.write("right");

    } else {
        //left:
        posX = posX - 1;
        process.stdout.write("left");

    }


}

