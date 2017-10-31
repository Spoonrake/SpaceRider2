window.onload = init;    // функц., запускающаяся в начале

/*
В массив добавляются x,y по правило чётные числа - x; нечётные - y -> var i=1,100,i+=2 - нечётные (y)
*/

var canvas;
var screen;
var x = 380;    //x,y игрока
var y = 300;
var health = 10;      //hp
var up,down,left,right, shoot;   //flags for control
var gameFlag = true;              // новый костыль (для выхода с уровня)

var player;
var unit;

//массив врагов пустой, потому что будут добавляться в функции рандом
var units = [];

function init(){
  canvas = document.getElementById("canvas"); //конвенция
  screen = canvas.getContext("2d");
  player = new Player();
  unit = new Unit();
  units[0] = unit();
  units[0].x = 25; units[0].y = 25;

  if(units[0] == null){console.log("you are eblan");}
  randCoord();  //задаём рандомные координаты противникам и заносим в массив
  tick();       //игровой цикл
}


//чекает флаги и изменяет x,y
function moveRect(e){
  //условие с y уберёшь, дебил
  if(up == true & y>0){
    player.y -= 10;
  }
  if(down == true & y<550){
    player.y += 10;
  }
  if(left == true & x>0){
    player.x -= 10;
  }
  if(right == true & x<750){
    player.x += 10;
  }
}

//слушает нажатия клавиш
function keyListener(){
  window.onkeydown = function(e){
    switch(e.keyCode){
      case 37:
        left = true;
      break;
      case 38:
        up = true;
      break;
      case 39:
        right = true;
      break;
      case 40:
        down = true;
      break;
      case 32:
        shoot = true;
      break;
    }
  }

  window.onkeyup = function(e){
    switch(e.keyCode){
      case 37:
        left = false;
      break;
      case 38:
        up = false;
      break;
      case 39:
        right = false;
      break;
      case 40:
        down = false;
      break;
      case 32:
        shoot = false;
      break;
    }
  }
}

//игровой цикл
function tick(){
  screen.clearRect(0, 0, canvas.width, canvas.height);  //очищение экрана

  moveRect("keydown");
  keyListener();

  if (gameFlag == true)
  {
  units[0].draw();
  player.draw();

  }
  else{gameOver();}
  requestAnimationFrame(tick);  //ограничивает fps
}

//уровень первый и единственный
/*function step1(){
  for (var i = 1; i < 100; i+=2){
                                                                            //ечли Ex = 200, x = 210
    if((units[i - 1] <= (x + 50) & units[i - 1] >= x-10)
     &                                                           //проверка на столкновение
     (units[i] <= (y + 50) & units[i] >= y-10))
     {
       delete units[i]; delete units[i - 1];
       health -= 1;
       console.log("Столкновение");
     }

    if(units[i] > 600) {delete units[i]; delete units[i - 1]; health -= 1;}    //проверка на исчезновение

    if (shoot == true){                                                           //пока пробел зажат, мы отрисовываем и проверяем на то, столкнулся ли луч.
      screen.fillStyle = "#E4E4E4"; screen.fillRect(x+20, 0, 10, y);
      if(units[i-1] > x & units[i-1] < x+50 & units[i] > 0) {delete units[i]; delete units[i-1];}
    }

    units[i] += 10;    //движение точек
    drawRect(units[i - 1], units[i], 20,20);    //отрисовка

    if (health == 0) {gameFlag = false};
  }
}*/

function randCoord(){
  // add units with random coordinates to massive
  for (var i = 0; i < 100; i++){
    if (i % 2 == 0){units[i] = Math.floor(Math.random() * 800);}  // округление рандома от 0,1*800
    else {units[i] = Math.floor(Math.random() * -20000)}
  }
}

function gameOver(){
  screen.font = "50px Verdana";  //стиль
  screen.fillText("Game Over", 260, 400);
}

function Unit(){
  this.x;
  this.y;
}

Unit.prototype.draw = function(){
  screen.fillStyle = "#E4E5E4";
  screen.fillRect(this.x,this.y,25,25);
}

function Player(){
  this.x = 380;
  this.y = 300;
}

Player.prototype.draw = function(){
  screen.fillStyle = "#E4E4E4";
  screen.fillRect(this.x,this.y,50,50);
}
