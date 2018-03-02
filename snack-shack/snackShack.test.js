const app = require('./snackShack')

test('it returns the correct schedule when one order is place', () => {
  let shack = new app.snackShack()

  shack.placeOrder()
  
  expect(shack.getSchedule()).toBe('1. 0:00 1 sandwich orders placed, start making sandwich 1\n2. 0:60 serve sandwich 1\n3. 1:30 take a well earned break!')
})

test('it returns the correct schedule when two orders are placed', () => {
  let shack = new app.snackShack()

  shack.placeOrder()
  shack.placeOrder()
  
  expect(shack.getSchedule()).toBe('1. 0:00 2 sandwich orders placed, start making sandwich 1\n2. 0:60 serve sandwich 1\n3. 1:30 make sandwich 2\n4. 2:30 serve sandwich 2\n5. 3:00 take a well earned break!')
})

test('it returns the correct schedule when four orders are placed', () => {
  let shack = new app.snackShack()

  shack.placeOrder()
  shack.placeOrder()
  shack.placeOrder()
  shack.placeOrder()
  
  expect(shack.getSchedule()).toBe('1. 0:00 4 sandwich orders placed, start making sandwich 1\n2. 0:60 serve sandwich 1\n3. 1:30 make sandwich 2\n4. 2:30 serve sandwich 2\n5. 3:00 make sandwich 3\n6. 4:00 serve sandwich 3\n7. 4:30 make sandwich 4\n8. 5:30 serve sandwich 4\n9. 6:00 take a well earned break!')
})

test('placeOrder returns expected wait time for first order', () => {
  let shack = new app.snackShack()

  expect(shack.placeOrder()).toBe('estimated wait: 1:30')
})

test('placeOrder returns expected for second order', () => {
  let shack = new app.snackShack()
  shack.placeOrder()

  expect(shack.placeOrder()).toBe('estimated wait: 3:00')
})

test('placeOrder returns expected for second order', () => {
  let shack = new app.snackShack()
  shack.placeOrder()
  shack.placeOrder()
  shack.placeOrder()

  expect(shack.placeOrder()).toBe('estimated wait: 6:00')
})

test('turnSecondsToMinutesAndSeconds when given 90 returns 1:30', () => {
  expect(app.turnSecondsToMinutesAndSeconds(90)).toBe('1:30')
})

test('turnsecondstominutesandseconds when given 250 returns 4:10', () => {
  expect(app.turnSecondsToMinutesAndSeconds(250)).toBe('4:10')
})

test('turnsecondstominutesandseconds when given 240 returns 4:00', () => {
  expect(app.turnSecondsToMinutesAndSeconds(240)).toBe('4:00')
})
