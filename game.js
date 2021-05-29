
var btnColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userPattern = [];
var gameStarted = false;
var level=0;

$(".btn").click(function() {

  var userColor = $(this).attr("id");
  userPattern.push(userColor);
  checkAnswer(userPattern.length-1);
  playSound(userColor);
  animatePress(userColor);
});

$(document).keydown(function() {
  if (!gameStarted) {

    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel] === userPattern[currentLevel]){
    if(userPattern.length === gamePattern.length)
    {
      setTimeout(function(){nextSequence();},1000)
    }
}
 else {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart")
  setTimeout(function()
  {
    $("body").removeClass("game-over");
  },200);
  startOver();
}
}
function nextSequence() {
userPattern=[];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = btnColors[randomNumber];
  gamePattern.push(randomColor);

  $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn();

  playSound(randomColor);
  
}
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor)
{
$("#"+currentColor).addClass("pressed");
setTimeout(function(){$("#"+currentColor).removeClass("pressed")},100)
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

