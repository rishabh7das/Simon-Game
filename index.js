var buttonColors=["green","red","yellow","blue"];

var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber=Math.random()*4;
    randomNumber=Math.floor(randomNumber);
    var randomChosenColor= buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});


$(".key").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animate(userChosenColour);
    playSound(userChosenColour);
    
    check(userClickedPattern.length-1);


});

function check(idx){
    if(gamePattern[idx]===userClickedPattern[idx]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }

    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, press any key to restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}
function animate(num){
    // var num=nextSequence();
    flash(num);
    playSound(num);
}

function flash(color){
    $("#"+color).fadeOut(150).fadeIn(150);
}

function playSound(color){
    var audio = new Audio('sounds/'+color+'.mp3');
    audio.play();
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}