class Game{
	
	constructor(scoreBoards){
		this.scoreBoards = scoreBoards;
		this.currentPlayer = 0;
		this.turnActive = true;
		this.timer = 300;
		

		//array used to loop through Ids
		this.listOfBonusScores = ['1', '2', '3', '4', '5',
		'6', 'sum', 'bonus', 'onePair', 'twoPair', 'threeOfAKind', 
		'fourOfAKind', 'smallStraight', 'largeStraight', 
		'fullHouse', 'chance', 'yahtzee', 'totalSum'];

		//loop that sets scores the first round since the elements start off being disabled
		//and therefor will not get a value before the first assigning of a value
		for(let i = 0; i < this.scoreBoards.length; i++){
			$('#'+ i + '-sum').append(this.scoreBoards[i].bonusScore);
			$('#'+ i + '-totalSum').append(this.scoreBoards[i].bonusScore);
		}

	}

	countNumberOfDiceSideOccurences(){ 
		let numbersOfEachOccurences = []; 
		let amountOfOnes = 0; 
		let amountOfTwos = 0; 
		let amountOfThrees = 0; 
		let amountOfFours = 0; 
		let amountOfFives = 0; 
		let amountOfSixes = 0; 

		for(let dice of this.scoreBoards[this.currentPlayer].dices){ 
			
			switch(dice.currentValue){ 
				case 1: 
				amountOfOnes += 1;
				break;
				case 2:
				amountOfTwos += 1;
				break;
				case 3:
				amountOfThrees += 1;
				break;
				case 4:
				amountOfFours += 1;
				break;
				case 5:
				amountOfFives += 1;
				break;
				case 6:
				amountOfSixes += 1;
				break;
			}
		}

		numbersOfEachOccurences.push(amountOfOnes); 
		numbersOfEachOccurences.push(amountOfTwos);
		numbersOfEachOccurences.push(amountOfThrees);
		numbersOfEachOccurences.push(amountOfFours);
		numbersOfEachOccurences.push(amountOfFives);
		numbersOfEachOccurences.push(amountOfSixes);

		return numbersOfEachOccurences; 
	}		

	filterOnes(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[0] * 1);
	}

	filterTwos(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[1] * 2);
	}

	filterThrees(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[2] * 3);
	}

	filterFours(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[3] * 4);
	}

	filterFives(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[4] * 5);
	}

	filterSixes(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[5] * 6);
	}
	
	filterOnePair(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences(); 
		let points = 0; 

		for(let i = 0; i < numbersOfEachOccurences.length; i++) {
			if(numbersOfEachOccurences[i] >= 2) {
				points = (i+1) * 2;
			}
		}

		return points;  
	}

	filterTwoPairs(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		let points = 0;
		let pairs = 0; 

		for(let i = 0; i < numbersOfEachOccurences.length; i++){
			if(numbersOfEachOccurences[i] >= 2) {
				points += (i+1) * 2;
				pairs += 1;
			}
		}

		if(pairs > 1){ 
			return points; 
		}else{ 
			return 0;
		}
	}

	filterThreeOfAKind(){
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences(); 
		let points = 0;	

		for(let i = 0; i < numbersOfEachOccurences.length; i++) {
			if(numbersOfEachOccurences[i] >= 3) {
				points = (i+1) * 3;
			}
		}

		return points;
	}

	filterFourOfAKind(){
		let  numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		let points = 0;

		for (let i = 0; i < numbersOfEachOccurences.length; i++) {
			if (numbersOfEachOccurences[i] >=4){
				points += (i + 1) * 4;
			}
		}

		return points;
	}

	filterSmallStraight(){
		let points = 0;
		let found1 = false;
		let found2 = false;
		let found3 = false;
		let found4 = false;
		let found5 = false;

		for(let i = 0; i < this.scoreBoards[this.currentPlayer].dices.length; i++){
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 1){
				found1 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 2){
				found2 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 3){
				found3 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 4){
				found4 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 5){
				found5 = true;
			}
		}

		if(found1 && found2 && found3 && found4 && found5){
			points = 15;
		}

		return points;
	}

	filterLargeStraight(){
		let points = 0;
		let found2 = false;
		let found3 = false;
		let found4 = false;
		let found5 = false;
		let found6 = false;

		for(let i = 0; i < this.scoreBoards[this.currentPlayer].dices.length; i++){
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 2){
				found2 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 3){
				found3 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 4){
				found4 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 5){
				found5 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 6){
				found6 = true;
			}
		}

		if(found2 && found3 && found4 && found5 && found6){
			points = 20;
		}

		return points;
	}

	filterFullHouse(){
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		let hasPair = false;
		let hasThreeOfAKind = false;
		let pointsFromPair = 0;
		let pointsFromThreeOfAKind = 0;
		let points = 0;

		//Cant reuse one-pair-filter, need the only side-occurence === 2 not >=2
		for(let i = 0; i < numbersOfEachOccurences.length; i++) {
			if(numbersOfEachOccurences[i] === 2) {
				pointsFromPair = (i+1) * 2;
			}
		}

		//However three-of-a-kind-filter can be reused because you can only have one three-of-a-kind
		pointsFromThreeOfAKind = this.filterThreeOfAKind();
		
		if (pointsFromPair != 0 && pointsFromThreeOfAKind != 0) {
			points = pointsFromPair + pointsFromThreeOfAKind;
		}

		return points;
	}

	filterChance(){
		let numbers = this.countNumberOfDiceSideOccurences();
		let points = 0;
		for(let i = 0; i < numbers.length; i++){
			points = points + (numbers[i] * (i+1)); 
		}

		return points;
	}


	filterYatzy(){
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		let points = 0;
		let pairs = 0;

		for(let i = 0; i < numbersOfEachOccurences.length; i++){
			if(numbersOfEachOccurences[i] === 5){
				return 50;
			}

		}

		return 0;
	}

	checkBonus(){
		if(this.scoreBoards[this.currentPlayer].bonusScore >= 63 && 
			this.scoreBoards[this.currentPlayer].bonusUsed === 'false'){
		
			this.scoreBoards[this.currentPlayer].totalScore += 50;	
			this.scoreBoards[this.currentPlayer].bonusUsed = true;

			$('#'+ this.currentPlayer + '-bonus').append(this.scoreBoards[this.currentPlayer].bonus);
		}
	}

	//function empties and reappends the value in order to update the score before
	//the currentPlayer is updated, otherwise the previous score is added to the next player
	calcTotalScore(numToAdd){
		this.scoreBoards[this.currentPlayer].totalScore += numToAdd;
		this.checkBonus();
		$('#'+ this.currentPlayer + '-totalSum').empty();
		$('#'+ this.currentPlayer + '-totalSum').append(this.scoreBoards[this.currentPlayer].totalScore)
	}

	//function empties and reappends the value in order to update the score before
	//the currentPlayer is updated, otherwise the previous score is added to the next player
	calcBonusScore(numToAdd){
		this.scoreBoards[this.currentPlayer].bonusScore += numToAdd;
		this.checkBonus();
		$('#'+ this.currentPlayer + '-sum').empty();
		$('#'+ this.currentPlayer + '-sum').append(this.scoreBoards[this.currentPlayer].bonusScore)
		
	}

	//adds an event for each function that assigns the correct value to the element when clicked
	createEventForElement(){
		for (let i = 0; i < this.listOfBonusScores.length; i++) {			
			
			let elementFound = document.getElementById(this.currentPlayer + '-' +  this.listOfBonusScores[i]);

			//to make activeGame a reference to the current Game object since we need to use the 
			//"this" argument when retrieving info from the element
			let activeGame = this;

			if(!(i===6 || i===this.listOfBonusScores.length-1 || i===7)){
				elementFound.addEventListener("click", function(){

					let splittedId = $(this).attr('id').split('-');
					if(splittedId[0] == activeGame.currentPlayer){
						let currentElement = document.getElementById($(this).attr('id'));

						if(currentElement.getAttribute('disabled') === 'false'){
							currentElement.setAttribute('disabled','true');
							currentElement.style.color = "black";

							//sets totalRolls to 0 since the turn is over after choosing
							//a points option
							activeGame.scoreBoards[activeGame.currentPlayer].totalRolls = 0;

							if (splittedId[1]<7) {

								activeGame.calcBonusScore(parseInt($(this).text()));
							}

							activeGame.calcTotalScore(parseInt($(this).text()));

							//unchecks dices and prepares for the next player
							activeGame.uncheckDices();
							activeGame.endTurn	();
						}
					}
				});

			}
		}

	}

	//prints possible outcomes, ignoring the elements that have previously
	//been disabled
	possibleOutcomes(){
		this.emptyScoreBoard();
		this.createEventForElement();

		//array of all methods to be applied when calculating a score
		//to be displayed
		let filterMethods = [
		this.filterOnes(), this.filterTwos(), this.filterThrees(),
		this.filterFours(), this.filterFives(), 
		this.filterSixes(), this.scoreBoards[this.currentPlayer].bonusScore, 
		this.scoreBoards[this.currentPlayer].bonus,
		this.filterOnePair(), this.filterTwoPairs(), 
		this.filterThreeOfAKind(), this.filterFourOfAKind(),
		this.filterSmallStraight(), this.filterLargeStraight(),
		this.filterFullHouse(), this.filterChance(), this.filterYatzy(),
		this.scoreBoards[this.currentPlayer].totalScore
		];


		for (let i = 0; i < this.listOfBonusScores.length; i++) {
			let elementFound = document.getElementById(this.currentPlayer + '-' +  this.listOfBonusScores[i]);
			let currentMethod = filterMethods[i];

			//if check that excludes the score boxes
			if(!(i===6 || i===this.listOfBonusScores.length-1 || i ===7)){

				if(elementFound.getAttribute('disabled') === 'false'){
					$('#'+ this.currentPlayer + '-' +  this.listOfBonusScores[i]).append(currentMethod);
					elementFound.style.color="lightgrey";
				}
			}
		}
	}

	emptyScoreBoard(){

		for (let i = 0; i < this.listOfBonusScores.length; i++) {
			for(let j = 0; j < this.scoreBoards.length; j++){
				let elementFound = document.getElementById(j + '-' +  this.listOfBonusScores[i]);

				if(elementFound.getAttribute('disabled') === 'false'){
					$('#'+ j + '-' +  this.listOfBonusScores[i]).empty();
				}
			}
		}

	}

	testRoll() {

		if(this.scoreBoards[this.currentPlayer].totalRolls > 0){
			this.scoreBoards[this.currentPlayer].totalRolls--;
			this.lockCheckedDices();
			for(let dice of this.scoreBoards[this.currentPlayer].dices) {
				dice.clearDicesInDOM();
				dice.roll();
				dice.writeDiceToDOM();
			}

			this.possibleOutcomes();
		}else{
			console.log('Player ' + (this.currentPlayer+1) +', you are out of rolls, choose an option!');
		}


	}

	lockCheckedDices() {
		var checkBoxes = $('.check-container').children();
		for(let checkBox of checkBoxes) {
			var idToLockOrUnLock = this.parseCheckBoxIdToIndexOfDice(checkBox.id);

			if($('#' + checkBox.id).is(":checked")) {
				this.scoreBoards[this.currentPlayer].dices[idToLockOrUnLock].lockDice();
			} else {
				scoreBoards[this.currentPlayer].dices[idToLockOrUnLock].unLockDice();
			}
		}
	}

	uncheckDices(){
		var checkBoxes = $('.check-container').children();
		for(let checkBox of checkBoxes) {
			var idToLockOrUnLock = this.parseCheckBoxIdToIndexOfDice(checkBox.id);
			if($('#' + checkBox.id).is(":checked")) {
				$('#' + checkBox.id).prop('checked', false);
			}

		}
	}

	parseCheckBoxIdToIndexOfDice(checkBoxId) {
		var idSplits = checkBoxId.split('-');
		var indexOfDice = parseInt(idSplits[1]);
		return indexOfDice;
	}

	endTurn(){

		if(this.scoreBoards[this.currentPlayer].totalRolls === 0){
			this.scoreBoards[this.currentPlayer].totalRolls = 3;
			this.currentPlayer++;
			this.uncheckDices();
			if(this.currentPlayer === this.scoreBoards.length){
			this.currentPlayer = 0;
			}
			this.testRoll();
		}
	}	

	HouseSwitch(target){ //Assign the numeric id of who your enemy is
		let enemyBox = document.getElementById(target + '-' +  "fullHouse"); //Retrieve value of enemy box
		let yourBox = document.getElementById(this.currentPlayer + '-' + "fullHouse"); //get value of your box
		if(yourBox.text > 0){ //check to see that your box value is greater than 0
			//Do the switch
			let valueOfTargetBox = enemyBox.text; //Get value of enemy box
			let valueOfYourBox = yourBox.text; //Get value of your box

			enemyBox.empty(); //Empty the enemy box
			enemyBox.append(valueOfYourBox); //Fill enemy box with your value
			yourBox.empty(); //Empty your own box
			yourBox.append(valueOfTargetBox); //Fill your own box with enemy box value
			
			for(let e of this.scoreBoards[this.currentPlayer].powerUps){ //Go through the powerups of current player
				if(e.getPower() == 3 && e.getName() == "HouseSwitch" && e.getCharges() > 0){ //Aquire values to qualify if its the powerup we want to remove
					index = this.scoreBoards[this.currentPlayer].powerUps.indexOf(e); //assign the index of the element in the array
					this.scoreBoards[this.currentPlayer].powerUps.splice(index, 1); //Remove at the given index, with a width of 1
				}
			}

		}
		else{ //You did not have >= 1 point
			console.log("You must have at least 1 point to do a switch!");
		}

	}

	removePowerUp(targetPlayer, powerUpToRemove){
		for (let i = 0; i < this.scoreBoards.length; i++) {
			if(i === targetPlayer){ //if index of iterating through the scoreBoards is the same as the
				//id of the target player we are targeting against

				player = this.scoreBoards[i]; //Assign who the player is
				for(let e = 0; e < player.powerUps.length ; e++){ //loop through powerups length to access index
					if(player.powerUps[e].getName() === powerUpToRemove){ //Is the name the same as the poweruptoremove?
						player.powerUps[e].splice(e, 1); //Remove the powerup that is at that given index
						//assuming that it shares name with the one that we wish to remove
					}
				} 
			}
		}
	}

	putTargetScoreToZero(targetPlayer, scoreToZero){
		if(scoreToZero !== "sum" && scoreToZero !== "bonus" && !== "yahtzee" && scoreToZero !== "totalSum"){
			if(this.currentPlayer !== targetPlayer){
				let enemyBox = document.getElementById(targetPlayer + '-' +  scoreToZero);
				enemyBox.empty();
				enemyBox.append(0);

			}
			else{
				console.log("You can only target enemy players with this power-up!");
			}
		}
		else{
			console.log("You cannot target Total Sum, Bonus, Yahtzee or their Upper Sum!");
		}
	}

}

