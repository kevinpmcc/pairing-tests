class FruitMachine {

	constructor() {
		this.jackpot = 0;
	}

	play() {
		this.increaseJackpot(10);
		let slots = FruitMachine.spin()
		return { winnings: this.calculateWinnings(slots, this.jackpot),
				slots: slots, currentJackpot: this.jackpot }
	}

	getJackpot() {
		return this.jackpot;
	}

	increaseJackpot(amount) {
		this.jackpot += 10;
	}

	static colours() {
		return ['black', 'white', 'yellow', 'green']
	}

	static spin() {
		return [FruitMachine.randomColour(),FruitMachine.randomColour(),FruitMachine.randomColour(),FruitMachine.randomColour()]
	}

	static randomColour() {
		let randomNumberBetween0and4 = Math.floor((Math.random()) * 4)
		return FruitMachine.colours()[randomNumberBetween0and4]
	}

	static areAllElementsTheSame(array) {
		let first = array[0]
		return array.every(function(element) {
        	return element === first;
    	});
	}

	calculateWinnings(slots, jackpot){
		if (FruitMachine.areAllElementsTheSame(slots)) {
			let outputWinnings = this.jackpot;
			this.jackpot = 0;
			return outputWinnings;
		} 
		return 0;
	}
}

module.exports = FruitMachine;