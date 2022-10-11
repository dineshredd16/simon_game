var classArray = ["#green", "#red", "#yellow", "#blue"];
var autoArray = [];
var userArray = [];
var level = 0;
var started = false;

function random(){
    var rand = Math.floor((Math.random()*4));
    var className = classArray[rand];
    autoClick(className);
    new Audio("sounds/auto.mp3").play();
    autoArray.push(className);
}

function autoClick(name){
    $(name).fadeOut(100).fadeIn(100);
}

$(document).keydown(function () { 
    if (!started) {
        autoArray = [];
        level ++
        $("h1").html("level " + level);
        random();
        started = true;
    }
});

$(".btn").click(function () { 
    var  userClass = "#"+$(this).attr("id")
    $(userClass).addClass("pressed");
    new Audio("sounds/user.mp3").play();
    setTimeout(function (){
        $(userClass).removeClass("pressed");
    }, 250)
    userArray.push(userClass);
    console.log(userClass)
    console.log(userArray)
    verify();
});

function verify(){
    for (i=0; i< (userArray.length) ; i++){
        if (autoArray[i] != userArray[i]) {
                $("h1").html("dead!!!");
                new Audio("sounds/wrong.mp3").play();
                level = 0;
                started = false;
                autoArray = [];
                userArray = [];
                $("body").addClass("game-over");
                setTimeout(function (){
                    $("body").removeClass("game-over");
                    $("h1").html("Game-Over, Press Any Key To Re-Start");
                }, 1050)

        } 
    }   
    if(JSON.stringify(userArray) === JSON.stringify(autoArray ) && started == true){
        userArray = [];
        level++;
        $("h1").html("level "+ level);
        random();
    }
}
