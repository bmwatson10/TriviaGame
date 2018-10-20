var triviaQuestions = [{
	question: "What is the Princess Brides' real name",
	answerList: ["Buttercup", "Orchid", "Daisy", "Zelda"],
	answer: 0
},{
	question: "Which pirate kidnapped Wesley",
	answerList: ["Dread Pirate Roberts", "Dread Pirate Stevens", "Really Bad Pirate Jones", "Very Bad Pirate Samuels"],
	answer: 0
},{
	question: "Who did not help kidnap Princess Buttercup?",
	answerList: ["Fezzeik", "Vincini", "Rugen", "Inigo"],
	answer: 3
},{
	question: "What phrase does Westley use to prove his identity to the Princess",
	answerList: ["No Problem", "Anytime, sweetheart", "As you wish", "Certainly, your highness"],
	answer: 2
},{
	question: "Finish this sentence, 'My name is Inigo Montoya......'",
	answerList: ["You killed my father, prepare to die", "I dont like you very much", "You killed my father, prepare to get smacked", "How do you like those apples"],
	answer: 0
},{
	question: "WHat did Prince Humperndink promise to send to find Wesley?",
	answerList: ["His four fastest riders", "His four white steeds", "His four fastest ships", "His four best runners"],
	answer: 2
},{
	question: "The Princess married Prince Humperndink",
	answerList: ["True", "False"],
	answer: 1
},{
	question: "What was Miracle Max's favorite food?",
	answerList: ["A nice BLT", "A nice pastrami sandwich", "A nice MLT", "A nice meatball special, when the sauce is good and hot"],
	answer: 2
},{
	question: "What is the name of the poison that Westley uses to match wits with Vincini?",
	answerList: ["Cyanide", "Iokane", "Iodine", "Strychnine"],
	answer: 1
},{
	question: "Wesley is left handed",
	answerList: ["True", "False"],
	answer: 3
},{
	question: "Which body part did Westley tell Prince Humperdink he would spare?",
	answerList: ["His eyes", "His ears", "His nose", "His tongue"],
	answer: 1
},{
	question: "How long did Miracle Max say the Miracle Pill would take to work?",
	answerList: ["2 hours", "1 hour", "30 minutes", "15 minutes"],
	answer: 0
},{
	question: "How did Inigo recognize the man who killed his father?",
	answerList: ["He had 11 toes", "He had 2 scars on his cheeks", "He had 6 fingers", "He had 4 fingers"],
	answer: 3
},{
	question: "What is an ROUS?",
	answerList: ["Rodents Of Ugly Snouts", "Rats Of Usual Shape", "Rodents Of Unusual Size", "Rabbits Of Unusual Smell"],
	answer: 2
},{
	question: "What does Miracle Max tell them to do as they are leaving?",
	answerList: ["Go get em!", "You can do it!", "Have fun storming the castle!", "Go, team, go!"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "As you wish!",
	incorrect: "Inconceivable!",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}