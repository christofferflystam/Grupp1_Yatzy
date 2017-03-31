$( document ).ready(function() {

	
	//To match the heights of protocol and scores:
	$('.scores').height($('.protocol').height());
	
	$('#myModal').modal('show');

	$('#startGame').on('click', function(){
		checkInputFields();
	});

	$('#numOfPlayers').change(function(){
		let optionValue = $(this).val();
		provideInputFields(optionValue); 
	});

	let listOfBonusScores = ['1', '2', '3', '4', '5',
		'6', 'sum', 'onePair', 'twoPair', 'threeOfAKind', 
		'fourOfAKind', 'smallStraight', 'largeStraight', 
		'fullHouse', 'chance', 'yahtzee', 'totalSum'];

	for (var i = 0; i < listOfBonusScores.length; i++) {
			for(var j = 0; j < 4; j++){
				var elementFound = document.getElementById(j + '-' +  listOfBonusScores[i]);
				elementFound.style.cursor = "pointer";
				elementFound.setAttribute('disabled',false);
			}

		}


	$('#roll-dices').on('click', function(){
		currentGame.testRoll();
	});

	$('.dice-container').on('click', function(){
		let splittedId = this.id.split('-');
		if(!$('#checkbox-' + splittedId[2]).prop('checked')){
			$('#checkbox-' + splittedId[2]).prop('checked', true);
		} else {
			$('#checkbox-' + splittedId[2]).prop('checked', false);
		}
	});





});

function provideInputFields(numOfPlayers){
	$('.playerValues').empty();
	for(let i = 1; i <= numOfPlayers; i++){
		$('.playerValues').append(`
			 <input type="text" placeholder='Namn spelare ${i}'> 
		`);
	}
}

function createScoreboards(){
	this.scoreBoards = [];
	let inputFields = $('.playerValues').children();
	for(let i = 0; i < inputFields.length; i++){
		let scoreBoard = new ScoreBoard(inputFields[i].value);
		scoreBoards.push(scoreBoard);
	}
	
	$('#myModal').modal('hide');
		this.currentGame = new Game(this.scoreBoards);
		this.currentGame.testRoll();
}

function checkInputFields(numOfPlayers){
	var correctInput = true;
	$('.playerValues').children().each(function(){
		if($.trim($(this).val()).length == 0){
			$('#errorMessage').html('Ange ett namn för inputfält, eller minska antalet spelare.');
			correctInput = false;
		}
	
	});

	if(correctInput){
		createScoreboards();
	}
}

function createEventForElement(){
		for (let i = 0; i < this.listOfBonusScores.length; i++) {			
			
			let elementFound = document.getElementById(this.currentPlayer + '-' +  this.listOfBonusScores[i]);

			
			let activeGame = this; // to make savedTotalScore a reference to this Scoreboard object

			if(!(i===6 || i===this.listOfBonusScores.length-1)){
				elementFound.addEventListener("click", function(){

					let currentElement = document.getElementById($(this).attr('id'));
					if(currentElement.getAttribute('disabled') === 'false'){

						activeGame.scoreBoards[activeGame.currentPlayer].totalRolls = 1;
						activeGame.gameLogic();

						activeGame.calcTotalScore(parseInt($(this).text()));
						let splittedId = $(this).attr('id').split('-');
						if (splittedId[1]<7) {

							activeGame.calcBonusScore(parseInt($(this).text()));
						}
					}

					currentElement.style.color = "black";

					currentElement.setAttribute('disabled','true');

				});

			}
		}

	}




