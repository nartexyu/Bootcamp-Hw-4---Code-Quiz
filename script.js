var highScoreEl = document.querySelector(".high-score");
var timerEl = document.querySelector(".timer");
var secondsLeft = 60;
var startEl = document.querySelector(".start");
var startButtonEl = document.querySelector(".start-btn");
var quizEl = document.querySelector(".quiz"); 
var quizQ = document.querySelector(".quizQ")
var q = document.querySelectorAll(".q")
var choice1 = document.querySelector(".choice1")
var choice2 = document.querySelector(".choice2")
var choice3 = document.querySelector(".choice3")
var choice4 = document.querySelector(".choice4")
var submitEl = document.querySelector(".submit");
var submitButtonEl = document.querySelector(".submit-btn");
var scoresEl = document.querySelector(".scores");
var inputEl = document.querySelector(".input")
var goBackel = document.querySelector(".go-back");
var clearEl = document.querySelector(".clear");
var resultEl = document.querySelector(".result")
var binaryEl = document.querySelector(".binary")
var finalScoreEl = document.querySelector(".finalScore")

quizEl.style.display = "none";
submitEl.style.display = "none";
scoresEl.style.display = "none";
resultEl.style.display = "none";

questions = [
    ["What is 1 + 1?", "9", "5", "2", "3"],
    ["What is 12 x 12?", "12", "144", "169", "24"],
    ["What is 5 % 1?", "0", "8", "6", "3"],
    ["What is 1 - 5?", "3", "-1", "4", "-4"],
    ["What is 0 ** 0?", "10", "1", "-1", "4"]
];

answers = ["2", "144", "0", "-4", "1"];

var scoresArr = JSON.parse(localStorage.getItem("storedScore"));
if(scoresArr === null){
    scoresArr = [];
}

//starts the quiz upon clicking start button
function start() {
    startButtonEl.addEventListener("click", function() {
        startEl.style.display = "none"
        timer();
        quiz();
    });  
}; 

// 60 second timer
function timer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft;
        
        if(secondsLeft === 0 || submitEl.style.display === "block") {
            clearInterval(timerInterval);
        };
    }, 1000);
};

//randomly displays array from questions and then removes it after question is answered
function quiz() {
    quizEl.style.display = "block";
    var i = Math.floor(Math.random()* questions.length);
    quizQ.textContent = questions[i][0];
    choice1.textContent = questions[i][1];
    choice2.textContent = questions[i][2];
    choice3.textContent = questions[i][3];
    choice4.textContent = questions[i][4];
    questions.splice(i,1);
};

//event listener for question choice buttons
function qofq() {
    for(const qs of q){
        qs.addEventListener("click", function(event){
            var target = event.target.textContent;
            if(questions.length == 0 || submitEl.style.display === "block"){
                if(resultEl === "block"){
                    resultEl.style.display = "none";
                };
                if(answers.includes(target)){
                    correct();
                } else {
                    
                };
                endQuiz();
            } else{
                if(resultEl.style.display ==="block"){
                    resultEl.style.display = "none";
                };
                if(answers.includes(target)){
                    correct();
                } else {
                    incorrect();
                };
                quiz();
            }
        }); 
    };
};

//shows text if answer is correct for 0.5s
function correct() {
    resultEl.style.display = "block"
    binaryEl.textContent = "Correct!"
    function disappear() {
        binaryEl.textContent = "";
        resultEl.style.display = "none";
    }
    setTimeout(disappear, 500)
};

//shows text if answer is incorrect for 0.5s
function incorrect() {
    resultEl.style.display = "block"
    binaryEl.textContent = "Incorrect!"
    if (secondsLeft > 0) {
        secondsLeft -= 10;
    };
    function disappear() {
        binaryEl.textContent = "";
        resultEl.style.display = "none";
    };
    setTimeout(disappear, 500)
};

//ends the quiz and displays final score
function endQuiz(){
    var timeOut = function(){
        quizEl.style.display = "none";
        resultEl.style.display = "none";
        submitEl.style.display = "block"; 
        finalScoreEl.textContent = "Score: " + (secondsLeft-1).toString();
    }
    setTimeout(timeOut,1000);  
};

//allows user to input their name and stores their name and score
function submit() {
    submitEl.addEventListener("click", function(event) {
        event.preventDefault();
        scoresArr.push({name: inputEl.value, value: secondsLeft});
        scoresArr.sort(function(a,b) {
            return b.value - a.value;
        });
        localStorage.setItem("storedScore", JSON.stringify(scoresArr));
    });
};

//displays high scores list and go back and clear buttons
function scores(){
    
};

function highScores() {

};

function clearScores(){
    if (confirm("Clear high scores?")===true){
        var ol = document.querySelector(".list")
        scoresArr = [];
        //scoresEl.style.display = "none";
        ol.remove();
        localStorage.clear()
    };
};



start();
qofq();
submit();
scores();
