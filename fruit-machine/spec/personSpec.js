const FruitMachine = require("../app/fruitMachine");
const Person = require("../app/person")

describe("Person", function() {
	describe("play", function() {
		it("should call FruitMachine.prototype.play", function() {
            FruitMachine.prototype.play = jasmine
			.createSpy("play() spy")
			.andCallFake(function() {
				return {winnings: 50}
            });
            let person = new Person(FruitMachine)

            person.play()

			expect(FruitMachine.prototype.play).toHaveBeenCalled();
        });
        it("increases balances when it is a winner", function() {
            let winnings = 50;
            let pricePerPlay = 10;
            FruitMachine.prototype.play = jasmine
			.createSpy("play() spy")
			.andCallFake(function() {
				return {winnings: winnings}
            });
            FruitMachine.pricePerPlay = jasmine
            .createSpy("pricePerPlay() spy")
            .andCallFake(function() {
                return pricePerPlay;
            })
            let person = new Person(FruitMachine)  
            let initialBalance = 100; 

            person.play()
            
            expect(person.balance).toBe(initialBalance - pricePerPlay + winnings)   
        })
        it("deducts the balance by an amount each time by price Per play when there are no winnings", function() {
            let winnings = 0;
            let pricePerPlay = 20;
            FruitMachine.prototype.play = jasmine
			.createSpy("play() spy")
			.andCallFake(function() {
				return {winnings: winnings}
            });
            FruitMachine.pricePerPlay = jasmine
            .createSpy("pricePerPlay() spy")
            .andCallFake(function() {
                return pricePerPlay;
            })

            let person = new Person(FruitMachine);
            let initialBalance = person.balance;

            person.play()

            expect(person.balance).toBe(initialBalance - pricePerPlay)
        });
        it("throws an error if you don't have enough money", function() {
            let pricePerPlay = 50;
            let winnings = 0;

            FruitMachine.prototype.play = jasmine
			.createSpy("play() spy")
			.andCallFake(function() {
				return {winnings: winnings}
            });
            
            FruitMachine.pricePerPlay = jasmine
            .createSpy("pricePerPlay() spy")
            .andCallFake(function() {
                return pricePerPlay;
            })

            let person = new Person(FruitMachine, 40);
            
            expect(person.play()).toEqual('you don\'t have enough money!')
        })
    });
});