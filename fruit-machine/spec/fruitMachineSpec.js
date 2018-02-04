const FruitMachine = require("../app/fruitMachine");

describe("FruitMachine", function() {
	describe("play", function() {
		it("should return winnings of 0 or greater", function() {
			let fm = new FruitMachine();
			expect(fm.play().winnings >= 0).toEqual(true);
		});
		it("should return four slots", function() {
			let fm = new FruitMachine();
			expect(fm.play().slots.length).toEqual(4);
		});
		it("should return one of four colours within each slot", function() {
			let fm = new FruitMachine();
			let colours = FruitMachine.colours();
			let slots = fm.play().slots;
			for (i = 0; i < slots.length; i++) {
				expect(colours).toContain(slots[i]);
			}
		});
		it("returns the jackpot each time its called", function() {
			let fm = new FruitMachine();
			let initialJackpot = fm.getJackpot();
			fm.play().currentJackpot;
			expect(fm.play().currentJackpot).toBeGreaterThan(initialJackpot);
		});
		it("should return jackpot as winnings if slots are all the same", function() {
			let fm = new FruitMachine();

			FruitMachine.spin = jasmine
				.createSpy("spin() spy")
				.andCallFake(function() {
					return ["black", "black", "black", "black"];
				});

			expect(fm.play().winnings).toEqual(10);
		});
	});
	describe("areAllElementsTheSame", function() {
		it("returns true if all elements are the same", function() {
			let actual = FruitMachine.areAllElementsTheSame([
				"black",
				"black",
				"black",
				"black"
			]);

			expect(actual).toEqual(true);
		});
		it("returns false if all elements are not the same", function() {
			let actual = FruitMachine.areAllElementsTheSame([
				"black",
				"black",
				"black",
				"white"
			]);

			expect(actual).toEqual(false);
		});
	});

	describe("jackpot", function() {
		it("gets created with FruitMachine and starts with a value of 0", function() {
			let fm = new FruitMachine();

			expect(fm.getJackpot()).toEqual(0);
		});
	});
});
