/* Program Name: PONG Game
   Author Name: SeungChan Kim
   Created on : 22-Apr-2018, 2:35:44 PM
   Updated on : 27-Apr-2018, 10:55:00 AM
   Desccription: Simple PONG Game implemented with HTML Canvas and JavaScript
 */

// Coordination of a ball and two paddles
var ballX = 78, ballY = 200;             // X, Y coordination of a Ball
var paddle1X = 50, paddle1Y = 150;     // X, Y coordination of a Paddle1
var paddle2X = 1130, paddle2Y = 150;   // X, Y coordination of a Paddle2

var timerId;                           // var to contain setInterval function

// Direction value in X-axis and Y-axis
var directionX = "right";
var directionY = "down";

// var to contain the score of each players
var score1 = "0";  // score of player1
var score2 = "0";  // score of player2

// Draw canvas on the HTML and invoke
function drawFrame() {

  ballMove(); // change the direction and coordination of the ball based on its present position

  var c = document.getElementById("canvas"); // retrieve the canvas element from the DOM
  var ctx = c.getContext("2d");              // retrieve a drawing context
  ctx.fillStyle="black";                     // Background Color
  ctx.fillRect(50,0,1100,400);               // Create a panel

  ctx.font = "100px Arial";                  // set font for Scores
  ctx.fillStyle= "white";                    // set font color
  ctx.fillText(score1, 300, 230);            // write a score of player1
  ctx.fillText(score2, 850, 230);            // write a score of player2

  // draw a center line
  ctx.beginPath();                           // begin drawing a line
  ctx.moveTo(600, 0);
  ctx.lineTo(600,400);
  ctx.lineWidth = 2;
  ctx.setLineDash([1,3]);
  ctx.strokeStyle="white";
  ctx.stroke();

  // draw a ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, 2*Math.PI);
  ctx.fillStyle="white";
  ctx.fill();

  // draw two paddles
  ctx.fillRect(paddle1X, paddle1Y, 20, 100);
  ctx.fillRect(paddle2X, paddle2Y, 20, 100);
}

// start animation to call drawFrame function every 16 milliseconds
function startAnimation() {
  timerId = setInterval(drawFrame, 16);
}

// stop animation
function stopAnimation() {
  clearTimeout(timerId);
}

// change the direction and coordination of the ball based on its present position
function ballMove() {
  // change the direction and coordination of the ball on X-axis
  if(directionX == "left") {  // when direction changes
    // when the ball approached to paddle1 on X-axis, located between the paddle1 in Y-axis
    if(ballX < 78 && ballY >= paddle1Y && ballY <= paddle1Y + 100)
      directionX = "right";   // change to right direction
    else
      ballX = ballX - 8;      // move the ball left side

  // change the direction and coordination of the ball on Y-axis
  } else {
    // when the ball approached to paddle2 on X-axis, located between the paddle2 in Y-axis
    if(ballX > 1121 && ballY >= paddle2Y && ballY <= paddle2Y + 100)
      directionX = "left";    // change to left direction
    else
      ballX = ballX + 8;      // move the ball right side
  }

  // change the direction and coordination of the ball on Y-axis
  if(directionY == "up") {
    // when the ball approached to ceiling on Y-axis
    if(ballY <= 10)
      directionY = "down";    // change to down direction
    else
      ballY = ballY - 1;      // move the ball upper side
  } else {
    // when the ball apporoached to bootom on Y-axis
    if(ballY >= 390)
      directionY = "up";      // change to up direction
    else
      ballY = ballY + 1;      // move the ball down side
  }

  // if the ball move behind the paddles,
  // stop animation, update the scores, and reset the position of the paddles and the ball
  if(ballX < -20) {
      stopAnimation();
      updateScore2();
      ballX = 1120; ballY = 200;
      paddle1X = 50; paddle1Y = 150;
      paddle2X = 1130; paddle2Y = 150;
  } else if(ballX > 1170) {
      stopAnimation();
      updateScore1();
      ballX = 78; ballY = 200;
      paddle1X = 50; paddle1Y = 150;
      paddle2X = 1130; paddle2Y = 150;
  }
}

window.addEventListener("keydown", paddleMove, false); // register the keydown event

// move paddle with keyboard
function paddleMove(e) {
  switch (e.keyCode) {
    case 87:               // up key for player1 (w)
      if(paddle1Y > 0)
        paddle1Y -= 20;
      break;
    case 83:               // down key for player1 (s)
      if(paddle1Y < 300)
        paddle1Y += 20;
      break;
    case 38:               // up key for player2 (↑)
      if(paddle2Y > 0)
        paddle2Y -= 20;
      break;
    case 40:               // down key for player2 (↓)
      if(paddle2Y < 300)
        paddle2Y += 20;
      break;
  }
}

// update the score when the ball move behind the paddles
function updateScore1() {
  score1 = parseInt(score1) + 1;
}
function updateScore2() {
  score2 = parseInt(score2) + 1;
}
