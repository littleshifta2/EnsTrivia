$("#start").click(start);

var currentQuestion = 0;
var score = 0;
var tries = 0;

function fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  fisherYatesShuffle(questions);
  
function generate() {
    $('#next').hide();
    $('body').append('<img>');
    $('img').attr('src', questions[currentQuestion].imageUrl);
    $('#question').text(questions[currentQuestion].question);
    $('#category').text(questions[currentQuestion].category);

    for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
        $('#questions_ul').append('<li>' + '<input type="radio">' + questions[currentQuestion].choices[i]);
    }
    tries+=1;
}

function correctAnswer() {
    score += 1;
    $('#score').text('Your score: ' + score + '/' + tries );
    $('#answer_view').css({'color': 'green', 'text-align': 'center'});
    $('#answer_view').text("Correct!");
    $('#answer').text(questions[currentQuestion].answer);
    $('#next_question').html('<button id="next">Next Question</button>');
    $('#restart_game').html('<button id="restart">Restart Game</button>');
    $('#question').empty();
    $('#questions_ul').empty();
    $('img').remove();
    $('body').append('<img>');
    $('img').attr('src', questions[currentQuestion].correctUrl);
}

$('#next_question').click(function() {
    currentQuestion += 1;
    $('#answer_view').empty();
    $('#answer').empty();
    $('img').remove();
    generate();

});

$('#restart_game').click(function() {
    location.replace("index.html");


});

function incorrectAnswer() {

    $('#answer_view').css({'color': 'red', 'text-align': 'center'});
    $('#answer_view').text("Incorrect!");
    $('#answer').text(questions[currentQuestion].answer);
    $('#score').text('Your score: ' + score + '/' + tries );
    $('#next_question').html('<button id="next">Next Question</button>');
    $('#restart_game').html('<button id="restart">Restart Game</button>');
    $('#question').empty();
    $('#questions_ul').empty();
    $('img').remove();
    $('body').append('<img>');
    $('img').attr('src', questions[currentQuestion].correctUrl);     
}

function validate(input) {
    console.log(currentQuestion + " > " + (questions.length - 1));
    if (currentQuestion === (questions.length - 1)) {
        if(questions[currentQuestion].correctAnswer === input) {
        $('#score_view').text('Game Over');
        correctAnswer();
        $('#next').hide();
        return;
    } else {
        incorrectAnswer();
        $('#score_view').text('Game Over');
        $('#next').hide();
        return;
    }
}

    questions[currentQuestion].correctAnswer === input ? (correctAnswer()) : (incorrectAnswer());

}

function start() {

    
    $('#welcome').hide();
    $('#start').hide();
    $('#opening_pic').hide();
    $('#score').text('Your score: ' + score + '/' + tries );
    generate();

    $('#questions_ul').on('click', 'li', function() {
        validate($(this).text());

    });
}





