const FruitMachine = require('./FruitMachine')

class Person {
	constructor(Machine=FruitMachine, balance=100) {
		this.Machine = Machine;
		this.fm = new Machine();
		this.balance = balance;
	}

	play() {
		let pricePerPlay = this.Machine.pricePerPlay()
		if (this.balance < pricePerPlay) { return 'you don\'t have enough money!' }
		this.deductFromBalance(pricePerPlay)
		let results = this.fm.play()
		if (results.winnings > 0) this.addToBalance(results.winnings)
		return results
	}
	deductFromBalance(amount){
		this.balance -= amount;
	}
	addToBalance(amount){
		this.balance += amount;
	}
}

module.exports = Person