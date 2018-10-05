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
var points=0;
var appleX;     
var appleY;   

var snakeX;
var snakeY;

var fieldWidth;
var fieldHeight;

var posX;
var posY;

var gameOver=false;

var  cursor = ansi(process.stdout);

//Game:
while(gameOver != false){
    //<- calling function, after every snake- move call 'gameOver' function to check if snake ran into the fieldborder ->

    moveSnake();
    gameOver();
}

drawField(fieldHeight,fieldWidth);
drawSnake();



//Functions:
function drawField(fieldHeight, fieldWidth){
    cursor.bg.blue();
    process.stdout.write("Color-test");
    cursor.bg.black();


}
function drawSnake(){

    //put to the middle of the field:
    snakeX=fieldWidth/2;
    snakeY= fieldHeight/2;
    
    cursor.bg.green();

    cursor.bg.black();

}

function moveSnake(){

}

function removeSnake(){

}

function drawApple(){

}


function removeApple(){

}



function gameOver(){
    if(snakeX == fieldWidth || snakeY == fieldHeight){
        process.stdout.write("GAME OVER");
        return true;
    }else{
        return false;
    }
}

function readInput(){

}
