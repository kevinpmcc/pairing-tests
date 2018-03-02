const snackShack = require('./snackShack')

test('it returns the correct schedule when one order is place', () => {
  let shack = new snackShack()

  shack.placeOrder()
  
  expect(shack.getSchedule()).toBe('1. 0:00 1 sandwich orders placed, start making sandwich 1\n2. 0:60 serve sandwich 1')
})

test('it returns the correct schedule when two orders are placed', () => {
  let shack = new snackShack()

  shack.placeOrder()
  shack.placeOrder()
  
  expect(shack.getSchedule()).toBe('1. 0:00 2 sandwich orders placed, start making sandwich 1\n2. 0:60 serve sandwich 1\n3. 1:30 start make sandwich 2\n4. 2:30 serve sandwich 2')
})


