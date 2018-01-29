

var questions = [
  ["What is Earth's largest continent?", "Asia","Africa","Europe","Antartica", 1, "Asia", "assets/images/asia.png"],
  ["What country has the most natural lakes?", "India","United States","Canada","Australia", 3, "Canada", "assets/images/canada.png"],
  ["In what country can you visit Machu Picchu?", "Peru","Chile","Bolivia","Colombia", 1, "Peru", "assets/images/peru.png"],
  ["Which African nation has the most pyramids?", "Libya","Egypt","Algeria","Sudan", 4, "Sudan", "assets/images/sudan.png"],
  ["What African country served as the setting for Tatooine in Star Wars?", "Gabon","Ghana","Tunisia","Ethiopia", 3, "Tunisia", "assets/images/tunisia.png"],
  ["What is the largest country in South America?", "Argentina","Brazil","Peru","Colombia", 2, "Brazil", "assets/images/brazil.png"],
  ["What is the highest waterfall in Europe?", "Krimml","Triberg","Kjelfossen","Rhine", 1,"Krimml", "assets/images/waterfall.jpg"],
  ["Montevideo is the capital of what South American country?", "Suriname","Peru","Paraguay","Uruguay", 4, "Uruguay", "assets/images/uruguay.png"],
  ["What is the oldest city in Texas?", "El Paso","Nacogdoches","San Antonio","De Kalb", 2, "Nacogdoches", "assets/images/nacogdoches.jpg"],
  ["What is the best country in the world", "South Korea","Ecuador","Spain","United States", 2, "Ecuador", "assets/images/ecuador.png"]
]

var answersCorrect = 0;
var answersWrong = 0;
var unanswered = 0;
var countDown = 10;
var intervalId;
var secondIntervalId;
var questionCounter = 0;


// start game when user clicks game start
$("#start").on("click", function() {
  $("#start").hide();
  $(".answer").removeAttr("hidden");
  $("#image").removeAttr("hidden");
  askQuestion();
  

})


// reset game to start over
$("#playAgain").on("click", function() {
  clearInterval(intervalId);
  clearInterval(secondIntervalId);
  shuffle(questions);
  $("#playAgain").hide();
  $("#results").empty();
  $("#results").hide();
  answersCorrect = 0;
  answersWrong = 0;
  unanswered = 0;
  countDown = 10;
  questionCounter = 0;
  askQuestion();

});


// ask question

function askQuestion() { 
  $("#image").hide();
  clearInterval(secondIntervalId);
  $(".answer").show();
  var currentQuestion = questions[questionCounter][0];
  var firstAns = questions[questionCounter][1];
  var secondAns = questions[questionCounter][2];
  var thirdAns = questions[questionCounter][3];
  var fourthAns = questions[questionCounter][4];
  startClock();
  $("#clock").text("Time remaining " + countDown + " seconds!");
  $("#question").text(questions[questionCounter][0]);
  $("#answer1").text(firstAns);
  $("#answer2").text(secondAns);
  $("#answer3").text(thirdAns);
  $("#answer4").text(fourthAns);


}



// check answer if correct
$(".answer").on("click", function(){
  clearInterval(intervalId);
  var correctAns = questions[questionCounter][5];
  var correctAnsText = questions[questionCounter][6];
  var userPick = $(this).val();
  //console.log(userPick);
  if (parseInt(userPick) === correctAns) {
    $("#question").text("Correct!");
    $(".answer").hide();
    $("#image").attr("src", questions[questionCounter][7]);
    $("#image").show();
    answersCorrect++;
    //console.log("correct " + answersCorrect);
    countDown = 10;
    questionCounter++;
    //console.log("question " + questionCounter);
    nextQuestion();

  }
  else {
    $("#question").text("Wrong! The correct answer is " + correctAnsText + "!");
    $(".answer").hide();
    $("#image").attr("src", questions[questionCounter][7]);
    $("#image").show();
    answersWrong++;
    //console.log("wrong " +  answersWrong);
    countDown = 10;
    questionCounter++;
    nextQuestion();
  }

});



// updates seconds remaining and checks if user is out of time
function clock() {
  countDown--;
  $("#clock").text("Time remaining " + countDown + " seconds!");
  if (countDown === 0) {
    $(".answer").hide();
    clearInterval(intervalId);
    var correctAnsText = questions[questionCounter][6];
    $("#question").text("Times up! The correct answer is " + correctAnsText + "!");
    $("#image").attr("src", questions[questionCounter][7]);
    $("#image").show();
    countDown = 10;
    unanswered++;
    //console.log("unanswered " + unanswered);
    questionCounter++;
    nextQuestion();
  }
}

// start the countdown 
function startClock() {
  intervalId = setInterval(clock, 1000);
}

// 3 second delay before program moves to next question
// also checks if all questions have been shown and shows results
function nextQuestion() {
  clearInterval(intervalId);
  if(questionCounter < questions.length ) {
    secondIntervalId = setInterval(askQuestion, 3000);
  }
  else {
    secondIntervalId = setInterval(showResult, 3000);
  }

}

function showResult() {
  clearInterval(secondIntervalId);
  $("#image").hide();
  var playAgain = $("#playAgain");
  var questionDiv = $("#question");
  if (answersCorrect < 5) {
    questionDiv.text("Your geography knowledge needs improvement!")
  }
  else if (answersCorrect < 8) {
    questionDiv.text("with some studying you could be a geography guru!")
  }
  else if(answersCorrect < 10){
    questionDiv.text("You have achieved expert level!")
  }
  else {
    questionDiv.text("You are a guru!")
  }
  $("#results").append("<br>" + "Correct answers: " + answersCorrect + "<br>");
  $("#results").append("Incorrect answers: " + answersWrong + "<br>");
  $("#results").append("Unanswered: " + unanswered);
  $("#results").show();
  playAgain.removeAttr("hidden");
  playAgain.show();
}

// shuffles the questions array, so the questions
// aren't shown in the same order when you play again 
// I got this algorithm from https://www.frankmitchell.org/2015/01/fisher-yates/
function shuffle (questions) {
  var i = 0
    , j = 0
    , temp = null

  for (i = questions.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = questions[i]
    questions[i] = questions[j]
    questions[j] = temp
  }
}





