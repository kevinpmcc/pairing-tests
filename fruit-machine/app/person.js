const FruitMachine = require('./FruitMachine')

class Person {
	constructor(machine=FruitMachine) {
		this.fm = new machine()
		this.balance = 100
	}

	play() {
		if (this.balance < 10) { throw 'you don\'t have enough money!' }
		let play = 10
		this.balance -= play
		let results = this.fm.play()
		this.balance += results.winnings
		console.log(results)
		console.log(this.balance) 
	}
}

module.exports = Person