// when the start button is clicked the start function is activated
$("#start").click(start);

var currentQuestion = 0;
var score = 0;
var tries = 0;

//randomizes the question order
function fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
fisherYatesShuffle(questions);

//this function is called when the start button from the index page is clicked
function start() {

    
    $('#welcome').hide();
    $('#start').hide();
    $('#opening_pic').hide();
    $('#score').text('Your score: ' + score + '/' + tries );
    generate();

    //calls the validate function using the choice for the answer the user has selected
    $('#choices_ul').on('click', 'li', function() {
        validate($(this).text());

    });
}

//populates/generates our questions
function generate() {
    $('#next').hide();
    $('body').append('<img>');
    $('img').attr('src', questions[currentQuestion].image_url);
    $('#question').text(questions[currentQuestion].question);
    $('#category').text(questions[currentQuestion].category);

    for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
        $('#choices_ul').append('<li>' + '<input type="radio">' + questions[currentQuestion].choices[i]);
    }
    tries+=1;
}

//checks whether the user has selected the correct or wrong choice and also checks if currentQuestion is the last question 
function validate(input) {
    if (currentQuestion === (questions.length - 1)) {
        if(questions[currentQuestion].correctAnswer === input) {
        $('#gameover_message').text('Game Over');
        correctAnswer();
        $('#next').hide();
        return;
    } else {
        incorrectAnswer();
        $('#gameover_message').text('Game Over');
        $('#next').hide();
        return;
    }
}

    if (questions[currentQuestion].correctAnswer === input) {
            correctAnswer();
        } 
    else {
            incorrectAnswer();
        }

}

//if the user selects the correct choice the funciton below is called
function correctAnswer() {
    score += 1;
    $('#score').text('Your score: ' + score + '/' + tries );
    $('#verdict').css({'color': 'green', 'text-align': 'center'});
    $('#verdict').text("Correct!");
    $('#explanation').text(questions[currentQuestion].explanation);
    $('#next_question').html('<button id="next">Next Question</button>');
    $('#restart_game').html('<button id="restart">Restart Game</button>');
    $('#question').empty();
    $('#choices_ul').empty();
    $('img').remove();
    $('body').append('<img>');
    $('img').attr('src', questions[currentQuestion].image_url_2);
}

//if the user selects the wrong choice the function below is called
function incorrectAnswer() {

    $('#verdict').css({'color': 'red', 'text-align': 'center'});
    $('#verdict').text("Incorrect!");
    $('#explanation').text(questions[currentQuestion].explanation);
    $('#score').text('Your score: ' + score + '/' + tries );
    $('#next_question').html('<button id="next">Next Question</button>');
    $('#restart_game').html('<button id="restart">Restart Game</button>');
    $('#question').empty();
    $('#choices_ul').empty();
    $('img').remove();
    $('body').append('<img>');
    $('img').attr('src', questions[currentQuestion].image_url_2);     
}


//when next question button is clicked
$('#next_question').click(function() {
    currentQuestion += 1;
    $('#verdict').empty();
    $('#explanation').empty();
    $('img').remove();
    generate();

});

//when restart game button is clicked
$('#restart_game').click(function() {
    location.replace("index.html");


});




