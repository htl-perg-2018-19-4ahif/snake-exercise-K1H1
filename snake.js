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
process.stdin.setRawMode(true);


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


var gameOver = false;

var cursor = ansi(process.stdout);
process.stdin.on("keypress", handleInput);


//------------------GAME-----------------------


process.stdout.write('\x1Bc'); //clears screen

/*drawField(fieldHeight, fieldWidth);

placeSnake();
drawApple();*/


while (gameOver == true) {
    //<- calling function, after every snake- move call 'gameOver' function to check if snake ran into the fieldborder ->
    
    moveSnake();
    gameOver();

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

    drawAppleSnake(snakeX,snakeY);

}


function drawAppleSnake(x, y) {
    cursor.goto(x, y).write(" ");
}


//---------- APPLE ----------

function drawApple() {
    appleX = Math.floor((Math.random() * (fieldWidth-1) ) + 1);
    appleY = Math.floor((Math.random() * (fieldHeight-1) ) + 1);

    cursor.bg.red();
    drawAppleSnake(appleX,appleY);
    cursor.bg.reset();

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

function handleInput(ch, key) {
    // up:
    if (key.name == 'up') {
        process.stdout.write("up");
        dirY =  1;
        

        //down:
    } else if (key.name == "down") {
        process.stdout.write("down");
        dirY =  -1;
        

        //right:
    } else if (key.name == "right") {
        process.stdout.write("right");
        dirX =  1;
        

    } else {
        //left:
        process.stdout.write("left");
        dirX =-1;
  

    }

}

