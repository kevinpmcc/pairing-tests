const snackShack = require('./snackShack')

test('it returns the correct schedule when one order is place', () => {
  let shack = new snackShack()

  shack.placeOrder()
  
  expect(shack.getSchedule()).toBe('1. 0:00 1 sandwich orders placed, start making sandwich 1\n2. 0:60 serve sandwich 1\n3. 1:30 take a well earned break!')
})

test('it returns the correct schedule when two orders are placed', () => {
  let shack = new snackShack()

  shack.placeOrder()
  shack.placeOrder()
  
  expect(shack.getSchedule()).toBe('1. 0:00 2 sandwich orders placed, start making sandwich 1\n2. 0:60 serve sandwich 1\n3. 1:30 start making sandwich 2\n4. 2:30 serve sandwich 2\n5. 3:00 take a well earned break!')
})

test('turnSecondsToMinutesAndSeconds when given 90 returns 1:30', () => {
  expect(snackShack.turnSecondsToMinutesAndSeconds(90)).toBe('1:30')
})

test('turnsecondstominutesandseconds when given 250 returns 4:10', () => {
  expect(snackShack.turnSecondsToMinutesAndSeconds(250)).toBe('4:10')
})

test('turnsecondstominutesandseconds when given 240 returns 4:00', () => {
  expect(snackShack.turnSecondsToMinutesAndSeconds(240)).toBe('4:00')
})
