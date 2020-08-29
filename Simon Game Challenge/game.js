
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(event) {

  if (started == false) {
    started = true;
    nextSequence();
  }

})


function nextSequence() {

  level++;
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  $("h1").text("Level " + level);


}


$(".btn").click(function() {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

})


function playSound(name) {

  let audio = new Audio("sounds/"+name+".mp3");
  audio.play();

}


function animatePress(currentColour) {

  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){ $("#"+currentColour).removeClass("pressed"); }, 100);

}


function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {$("body").removeClass("game-over")}, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();

  } else if (currentLevel == gamePattern.length - 1) {
    setTimeout(nextSequence, 1000);
  }

}


function startOver() {

  level = 0;
  gamePattern = [];
  started = false;

}
